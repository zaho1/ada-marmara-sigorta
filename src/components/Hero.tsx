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
} from 'lucide-react';
import { useState } from 'react';
import { supabase, type InsuranceType, type LeadInsert } from '@/lib/supabase';
import { formatTrPhone, isValidTrPhone, toE164Tr } from '@/lib/phone';
import { COMPANY } from '@/lib/constants';

// Talep e-postaları bu adrese gider (FormSubmit). İlk talepte Gmail'e gelen onay mailindeki "Activate" butonuna basılmalıdır.
const EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/adamarmarasigorta@gmail.com';
// Talep geldiğinde WhatsApp bildirimi gönderen sunucu fonksiyonu (api/talep-bildirim.js)
const WHATSAPP_NOTIFY_ENDPOINT = '/api/talep-bildirim';

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
  { id: 'trafik' as InsuranceType, label: 'Trafik Sigortası', icon: 'Car', description: 'Zorunlu araç sigortası' },
  { id: 'kasko' as InsuranceType, label: 'Kasko', icon: 'ShieldCheck', description: 'Aracınız için tam koruma' },
  { id: 'dask' as InsuranceType, label: 'DASK', icon: 'Home', description: 'Zorunlu deprem sigortası' },
  { id: 'saglik' as InsuranceType, label: 'Sağlık Sigortası', icon: 'HeartPulse', description: 'Özel ve tamamlayıcı sağlık' },
  { id: 'konut' as InsuranceType, label: 'Konut Sigortası', icon: 'Building2', description: 'Ev ve eşya güvencesi' },
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
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappText, setWhatsappText] = useState('');

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

  const step3Error = (): string | null => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      return 'Lütfen ad ve soyadınızı girin.';
    }
    if (!isValidTrPhone(formData.phone)) {
      return 'Lütfen geçerli bir Türkiye telefon numarası girin (05XX XXX XX XX).';
    }
    if (!kvkkAccepted) {
      return 'Devam etmek için KVKK Aydınlatma Metni’ni okuduğunuzu onaylayın.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const step3 = step3Error();
    if (step3) {
      setError(step3);
      return;
    }
    if (!insuranceType) return;

    setSubmitting(true);
    setError(null);

    const insuranceLabel =
      INSURANCE_OPTIONS.find((o) => o.id === insuranceType)?.label ?? insuranceType;
    const phoneE164 = toE164Tr(formData.phone);
    const phoneDisplay = formatTrPhone(formData.phone);

    const payload: Record<string, string> = {
      _subject: `Yeni teklif talebi — ${insuranceLabel}`,
      'Sigorta Türü': insuranceLabel,
      Ad: formData.firstName.trim(),
      Soyad: formData.lastName.trim(),
      Telefon: `${phoneDisplay} (${phoneE164})`,
    };

    if (needsVehicleFields) {
      payload['TC Kimlik No'] = formData.tcKimlikNo.trim();
      payload.Plaka = formData.plaka.trim();
    }
    if (needsAddressFields) {
      payload.İl = formData.il.trim();
      payload.İlçe = formData.ilce.trim();
      payload.Mahalle = formData.mahalle.trim();
    }

    // WhatsApp'a gidecek hazır mesaj
    const waLines = [
      'Merhaba, web sitenizden teklif talebi gönderdim.',
      ...Object.entries(payload)
        .filter(([key]) => key !== '_subject')
        .map(([key, value]) => `${key}: ${value}`),
    ];
    setWhatsappText(waLines.join('\n'));

    // 1) E-posta  2) WhatsApp bildirimi  3) Yönetim paneline kayıt — biri başarılıysa talep alınmış sayılır
    const sendEmail = fetch(EMAIL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...payload,
        'KVKK Onayı': `Aydınlatma metni okundu (${new Date().toLocaleString('tr-TR')})`,
        _template: 'table',
        _captcha: 'false',
      }),
    })
      .then((r) => r.ok)
      .catch(() => false);

    const notifyWhatsapp = fetch(WHATSAPP_NOTIFY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (r) => r.ok && (await r.json().catch(() => ({}))).ok === true)
      .catch(() => false);

    const lead: LeadInsert = {
      insurance_type: insuranceType,
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      phone: phoneE164,
      ...(needsVehicleFields
        ? { tc_kimlik_no: formData.tcKimlikNo.trim(), plaka: formData.plaka.trim() }
        : {}),
      ...(needsAddressFields
        ? { il: formData.il.trim(), ilce: formData.ilce.trim(), mahalle: formData.mahalle.trim() }
        : {}),
    };
    const saveLead = supabase
      ? Promise.resolve(supabase.from('leads').insert(lead))
          .then(({ error: dbError }) => !dbError)
          .catch(() => false)
      : Promise.resolve(false);

    const [emailOk, whatsappOk, leadOk] = await Promise.all([sendEmail, notifyWhatsapp, saveLead]);
    setSubmitting(false);

    if (!emailOk && !whatsappOk && !leadOk) {
      setError('Teklif gönderilemedi. Lütfen tekrar deneyin, WhatsApp’tan yazın veya bizi arayın.');
      return;
    }

    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/${COMPANY.whatsappRaw.replace(/\D/g, '')}?text=${encodeURIComponent(
    whatsappText || 'Merhaba, sigorta teklifi almak istiyorum.',
  )}`;

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
    setKvkkAccepted(false);
    setSubmitted(false);
    setError(null);
    setWhatsappText('');
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
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-green-600/30 transition-all hover:bg-green-700 active:scale-95"
                    >
                      WhatsApp’tan da İlet
                    </a>
                    <button onClick={resetForm} className="btn-secondary">
                      Yeni Teklif Al
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Daha hızlı dönüş için talebinizi tek tıkla WhatsApp’tan da gönderebilirsiniz.
                  </p>
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

                      {error && (
                        <div className="rounded-lg bg-accent-50 border border-accent-200 px-4 py-3 text-sm text-accent-700">
                          {error}
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
                              setError('Lütfen bu adımdaki alanları eksiksiz doldurun (TC 11 hane, plaka veya adres).');
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
                              autoComplete="given-name"
                              value={formData.firstName}
                              onChange={(e) => {
                                setError(null);
                                setFormData({ ...formData, firstName: e.target.value });
                              }}
                              placeholder="Adınız"
                              className="input-field pl-10"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Soyad</label>
                          <input
                            type="text"
                            autoComplete="family-name"
                            value={formData.lastName}
                            onChange={(e) => {
                              setError(null);
                              setFormData({ ...formData, lastName: e.target.value });
                            }}
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
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={(e) => {
                              setError(null);
                              setFormData({ ...formData, phone: formatTrPhone(e.target.value) });
                            }}
                            placeholder="05XX XXX XX XX"
                            className="input-field pl-10"
                          />
                        </div>
                        <p className="mt-1.5 text-xs text-gray-500">
                          11 haneli Türkiye numarası. +90 5xx veya 05xx yapıştırabilirsiniz.
                        </p>
                      </div>

                      <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={kvkkAccepted}
                          onChange={(e) => {
                            setError(null);
                            setKvkkAccepted(e.target.checked);
                          }}
                          className="mt-0.5 h-5 w-5 shrink-0 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                        />
                        <span>
                          <a
                            href="/kvkk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-brand-700 underline"
                          >
                            KVKK Aydınlatma Metni
                          </a>
                          ’ni okudum ve anladım.
                        </span>
                      </label>

                      {error && (
                        <div className="rounded-lg bg-accent-50 border border-accent-200 px-4 py-3 text-sm text-accent-700">
                          {error}
                          {whatsappText && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 block font-semibold text-green-700 underline"
                            >
                              WhatsApp’tan gönder
                            </a>
                          )}
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
