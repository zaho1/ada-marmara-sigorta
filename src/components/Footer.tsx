import {
  ShieldCheck,
  MapPin,
  Phone,
  Clock,
  Mail,
  Instagram,
  Lock,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer id="iletisim" className="bg-brand-950 text-white">
      {/* Main Contact Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-2">İletişim</h2>
          <p className="text-gray-400">Bize ulaşın, sorularınızı yanıtlayalım</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* Phone */}
          <div className="bg-brand-900/50 rounded-xl p-4 border border-brand-800/50 hover:border-brand-700 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                <Phone className="h-5 w-5 text-green-400" />
              </div>
              <span className="text-xs text-gray-400">Telefon</span>
            </div>
            <a href={`tel:${COMPANY.phoneRaw}`} className="text-lg font-bold hover:text-green-400 transition-colors">
              {COMPANY.phone}
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-brand-900/50 rounded-xl p-4 border border-brand-800/50 hover:border-brand-700 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                <WhatsAppIcon />
              </div>
              <span className="text-xs text-gray-400">WhatsApp</span>
            </div>
            <a href={`https://wa.me/${COMPANY.whatsappRaw.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-green-400 transition-colors">
              {COMPANY.whatsapp}
            </a>
          </div>

          {/* Email */}
          <div className="bg-brand-900/50 rounded-xl p-4 border border-brand-800/50 hover:border-brand-700 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                <Mail className="h-5 w-5 text-green-400" />
              </div>
              <span className="text-xs text-gray-400">E-posta</span>
            </div>
            <a href={`mailto:${COMPANY.email}`} className="text-base font-semibold hover:text-green-400 transition-colors">
              {COMPANY.email}
            </a>
          </div>

          {/* Address */}
          <div className="bg-brand-900/50 rounded-xl p-4 border border-brand-800/50 hover:border-brand-700 transition-colors md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                <MapPin className="h-5 w-5 text-green-400" />
              </div>
              <span className="text-xs text-gray-400">Adres</span>
            </div>
            <p className="text-base font-semibold">{COMPANY.address}</p>
          </div>

          {/* Working Hours */}
          <div className="bg-brand-900/50 rounded-xl p-4 border border-brand-800/50 hover:border-brand-700 transition-colors md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                <Clock className="h-5 w-5 text-green-400" />
              </div>
              <span className="text-xs text-gray-400">Çalışma Saatleri</span>
            </div>
            <p className="text-base font-semibold">{COMPANY.hours}</p>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center gap-4 mt-8">
          <a
            href="https://www.instagram.com/adamarmarasigorta/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-800/50 text-gray-400 hover:bg-green-500 hover:text-white transition-all hover:scale-110"
          >
            <Instagram className="h-6 w-6" />
          </a>
        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-500">
          <Lock className="h-4 w-4 text-green-400" />
          <span>Bağlantınız SSL/TLS ile şifrelenir</span>
        </div>
      </div>

      {/* Company Info */}
      <div className="border-t border-brand-800/50 bg-brand-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold text-white mb-1">{COMPANY.legalName}</p>
              <p className="text-xs text-gray-500">
                Yetkili Sigorta Acentesi · Yetki No: {COMPANY.authorizationNo} · Levha No: {COMPANY.levhaNo}
              </p>
            </div>
            <div className="text-center lg:text-right text-xs text-gray-500 space-y-1">
              <p>{COMPANY.taxOffice}: {COMPANY.taxNo}</p>
              <p>A.T.S.O. Sicil No: {COMPANY.atsoNo} · Mersis No: {COMPANY.mersisNo}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-brand-800/50 text-center">
            <p className="mb-2 text-xs">
              <a href="/kvkk" className="text-gray-400 underline hover:text-white transition-colors">
                KVKK Aydınlatma Metni
              </a>
            </p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} {COMPANY.legalName} Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 z-50 lg:hidden">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          <a
            href={`https://wa.me/${COMPANY.whatsappRaw.replace(/\+/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-green-600"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
              <WhatsAppIcon />
            </div>
            <span className="text-xs font-medium">WhatsApp</span>
          </a>
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="flex flex-col items-center gap-1 text-brand-700"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-medium">Ara</span>
          </a>
          <a
            href="/#teklif-formu"
            className="flex flex-col items-center gap-1 text-orange-600"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-medium">Teklif Al</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
