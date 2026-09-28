import {
  Car,
  ShieldCheck,
  Home,
  HeartPulse,
  Building2,
  User,
  Phone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  MapPin,
} from 'lucide-react';
import { useState } from 'react';
import type { InsuranceType } from '@/lib/supabase';

const HERO_BG =
  'https://images.pexels.com/photos/358549/pexels-photo-358549.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';

const TYPE_ICONS: Record<string, typeof Car> = {
  Car,
  ShieldCheck,
  Home,
  HeartPulse,
  Building2,
};

const INSURANCE_OPTIONS = [
  { id: 'trafik' as InsuranceType, label: 'Trafik Sigortası', icon: 'Car', description: 'Zorunlu trafik sigortası' },
  { id: 'kasko' as InsuranceType, label: 'Kasko', icon: 'ShieldCheck', description: 'Kasko sigortası' },
  { id: 'dask' as InsuranceType, label: 'DASK', icon: 'Home', description: 'Deprem sigortası' },
  { id: 'saglik' as InsuranceType, label: 'Sağlık Sigortası', icon: 'HeartPulse', description: 'Sağlık sigortası' },
  { id: 'konut' as InsuranceType, label: 'Konut Sigortası', icon: 'Building2', description: 'Konut sigortası' },
];

type Step = 1 | 2 | 3;

export default function Hero() {
  const [step, setStep] = useState<Step>(1);
  const [insuranceType, setInsuranceType] = useState<InsuranceType | null>(null);
  const [formData, setFormData] = useState({
    tcKimlikNo: '',
    plaka: '',
    il: '',
    ilce: '',
    mahalle: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTypeSelect = (type: InsuranceType) => {
    setInsuranceType(type);
    setStep(2);
  };

  const needsVehicleFields = insuranceType === 'trafik' || insuranceType === 'kasko';
  const needsAddressFields = insuranceType === 'dask' || insuranceType === 'konut';

  const validateStep2 = (): boolean => {
    if (needsVehicleFields) {
      if (formData.tcKimlikNo.length !== 11 || !/^\d+$/.test(formData.tcKimlikNo)) return false;
      if (formData.plaka.trim().length < 2) return false;
    }
    if (needsAddressFields) {
      if (!formData.il.trim() || !formData.ilce.trim() || !formData.mahalle.trim()) return false;
    }
    return true;
  };

  const validateStep3 = (): boolean => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) return false;
    const phoneClean = formData.phone.replace(/\s/g, '');
    if (!/^05\d{9}$/.test(phoneClean)) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep3()) {
      setError('Lütfen tüm alanları doğru formatta doldurunuz.');
      return;
    }
    if (!insuranceType) return;

    setSubmitting(true);
    setError(null);

    const payload = {
      insurance_type: INSURANCE_OPTIONS.find((o) => o.id === insuranceType)?.label ?? insuranceType,
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      phone: formData.phone.trim(),
      tc_kimlik_no: needsVehicleFields ? formData.tcKimlikNo.trim() : '',
      plaka: needsVehicleFields ? formData.plaka.trim() : '',
      il: needsAddressFields ? formData.il.trim() : '',
      ilce: needsAddressFields ? formData.ilce.trim() : '',
      mahalle: needsAddressFields ? formData.mahalle.trim() : '',
    };

    try {
      const response = await fetch('https://formspree.io/f/xvkgvwll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      setSubmitting(false);

      if (!response.ok) {
        setError('Teklif gönderilemedi. Lütfen tekrar deneyin veya bizi arayın.');
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitting(false);
      setError('Teklif gönderilemedi. Lütfen tekrar deneyin veya bizi arayın.');
    }
  };

  const resetForm = () => {
    setStep(1);
    setInsuranceType(null);
    setFormData({
      tcKimlikNo: '',
      plaka: '',
      il: '',
      ilce: '',
      mahalle: '',
      firstName: '',
      lastName: '',
      phone: '',
    });
    setSubmitted(false);
    setError(null);
  };

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    if (digits.length <= 8) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/95 via-brand-900/85 to-brand-800/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Headline */}
          <div className="text-white space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-pulse-ring"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Sakarya'nın güvenilir sigorta acentesi
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              En Uygun Sigorta Teklifini{' '}
              <span className="text-accent-400">Hemen Alın</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-xl mx-auto lg:mx-0">
              Trafik, Kasko, DASK ve Sağlık sigortalarınız için 20+ şirketten karşılaştırmalı teklifler.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-gray-200">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                Ücretsiz teklif
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-200">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                2 dakikada tamamlayın
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-200">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                20+ sigorta şirketi
              </div>
            </div>
          </div>

          {/* Right: Quote Form Card */}
          <div id="teklif-formu" className="bg-white rounded-2xl shadow-2xl shadow-brand-950/30 overflow-hidden">
            {/* Progress bar */}
            <div className="flex items-center bg-brand-50 px-6 pt-5 pb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${
                      step >= s
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`h-1 flex-1 mx-1 rounded-full transition-all ${
                        step > s ? 'bg-brand-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 lg:p-8">
              {submitted ? (
                /* Success state */
                <div className="text-center py-8 space-y-4 animate-fade-in-up">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-700">Talebiniz başarıyla alındı, en kısa sürede dönüş yapacağız</h3>
                  <p className="text-gray-600 max-w-sm mx-auto">
                    Uzman ekibimiz en kısa sürede sizinle iletişime geçerek en uygun teklifleri sunacak.
                  </p>
                  <button onClick={resetForm} className="btn-secondary mt-4">
                    Yeni Teklif Al
                  </button>
                </div>
              ) : (
                <>
                  {/* Step 1: Select Insurance Type */}
                  {step === 1 && (
                    <div className="space-y-4 animate-fade-in-up">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Sigorta Türünü Seçin</h3>
                        <p className="text-sm text-gray-500 mt-1">Hangi sigorta için teklif almak istiyorsunuz?</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {INSURANCE_OPTIONS.map((opt) => {
                          const Icon = TYPE_ICONS[opt.icon];
                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleTypeSelect(opt.id)}
                              className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all hover:shadow-md hover:border-brand-500 ${
                                insuranceType === opt.id
                                  ? 'border-brand-600 bg-brand-50'
                                  : 'border-gray-200 bg-white'
                              }`}
                            >
                              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-100 shrink-0">
                                <Icon className="h-6 w-6 text-brand-700" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{opt.label}</div>
                                <div className="text-xs text-gray-500">{opt.description}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Type-specific fields */}
                  {step === 2 && (
                    <div className="space-y-5 animate-slide-in">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Sigorta Bilgileri</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {INSURANCE_OPTIONS.find((o) => o.id === insuranceType)?.label} için bilgilerinizi girin
                        </p>
                      </div>

                      {needsVehicleFields && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              TC Kimlik No
                            </label>
                            <input
                              type="text"
                              inputMode="numeric"
                              maxLength={11}
                              value={formData.tcKimlikNo}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  tcKimlikNo: e.target.value.replace(/\D/g, '').slice(0, 11),
                                })
                              }
                              placeholder="11 haneli TC Kimlik No"
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Plaka
                            </label>
                            <input
                              type="text"
                              value={formData.plaka}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  plaka: e.target.value.toUpperCase().slice(0, 10),
                                })
                              }
                              placeholder="Örn: 54 ABC 123"
                              className="input-field uppercase"
                            />
                          </div>
                        </div>
                      )}

                      {needsAddressFields && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">İl</label>
                            <input
                              type="text"
                              value={formData.il}
                              onChange={(e) => setFormData({ ...formData, il: e.target.value })}
                              placeholder="Örn: Sakarya"
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">İlçe</label>
                            <input
                              type="text"
                              value={formData.ilce}
                              onChange={(e) => setFormData({ ...formData, ilce: e.target.value })}
                              placeholder="Örn: Adapazarı"
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mahalle</label>
                            <input
                              type="text"
                              value={formData.mahalle}
                              onChange={(e) => setFormData({ ...formData, mahalle: e.target.value })}
                              placeholder="Örn: Cumhuriyet Mah."
                              className="input-field"
                            />
                          </div>
                        </div>
                      )}

                      {insuranceType === 'saglik' && (
                        <div className="rounded-xl bg-brand-50 border border-brand-100 p-5 text-center">
                          <HeartPulse className="h-10 w-10 text-brand-600 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            Sağlık sigortası için iletişim bilgilerinizi girin, uzmanlarımız size özel teklif hazırlayacak.
                          </p>
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => setStep(1)}
                          className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 px-5 py-3 text-base font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Geri
                        </button>
                        <button
                          onClick={() => {
                            if (validateStep2()) {
                              setError(null);
                              setStep(3);
                            } else {
                              setError('Lütfen tüm alanları doğru formatta doldurunuz.');
                            }
                          }}
                          className="btn-primary flex-1"
                        >
                          Devam Et
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact Info */}
                  {step === 3 && (
                    <form onSubmit={handleSubmit} className="space-y-5 animate-slide-in">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">İletişim Bilgileri</h3>
                        <p className="text-sm text-gray-500 mt-1">Tekliflerinizi size ulaştıralım</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Ad</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              placeholder="Adınız"
                              className="input-field pl-10"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Soyad</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Soyadınız"
                            className="input-field"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Telefon Numarası
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            inputMode="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: formatPhone(e.target.value) })
                            }
                            placeholder="05xx xxx xx xx"
                            className="input-field pl-10"
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="rounded-lg bg-accent-50 border border-accent-200 px-4 py-3 text-sm text-accent-700">
                          {error}
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 px-5 py-3 text-base font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Geri
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />
                              Gönderiliyor...
                            </>
                          ) : (
                            <>
                              Hemen Teklif Al
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="relative z-10">
        <svg className="w-full h-12 sm:h-16 text-white" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H0Z" fill="currentColor"/>
        </svg>
      </div>
    </section>
  );
}
