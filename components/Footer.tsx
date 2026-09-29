import {
  ShieldCheck,
  MapPin,
  Phone,
  Clock,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const FOOTER_LINKS = [
  {
    title: 'Sigorta Türleri',
    links: ['Trafik Sigortası', 'Kasko', 'DASK', 'Sağlık Sigortası', 'Konut Sigortası'],
  },
  {
    title: 'Kurumsal',
    links: ['Hakkımızda', 'Müşteri Yorumları', 'İletişim', 'Gizlilik Politikası', 'Kullanım Şartları'],
  },
];

const SOCIAL_ICONS = [
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer id="iletisim" className="bg-brand-950 text-gray-300">
      {/* CTA banner */}
      <div className="border-b border-brand-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-2">
                Sigorta teklifiniz hazır mı?
              </h3>
              <p className="text-gray-400">
                2 dakikada formu doldurun, en uygun teklifleri size ulaştıralım.
              </p>
            </div>
            <a href="#teklif-formu" className="btn-primary whitespace-nowrap">
              Hemen Teklif Al
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-md">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-extrabold text-white tracking-tight">ADA MARMARA</span>
                <span className="text-xs font-semibold text-accent-400 tracking-wider uppercase">Sigorta</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Sakarya'nın güvenilir sigorta acentesi. 20+ şirketten karşılaştırmalı teklif ile en uygun fiyatı bulun.
            </p>
            <div className="flex gap-3">
              {SOCIAL_ICONS.map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-800/50 text-gray-300 transition-all hover:bg-accent-600 hover:text-white hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col, i) => (
            <div key={i} className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-accent-400 shrink-0 mt-0.5" />
                <span className="text-gray-400">{COMPANY.location}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-accent-400 shrink-0" />
                <a href={`tel:${COMPANY.phoneRaw}`} className="text-gray-400 hover:text-white transition-colors">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <MessageCircle className="h-5 w-5 text-green-400 shrink-0" />
                <a href={`https://wa.me/${COMPANY.whatsappRaw.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  {COMPANY.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-accent-400 shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="text-gray-400 hover:text-white transition-colors">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Clock className="h-5 w-5 text-accent-400 shrink-0" />
                <span className="text-gray-400">{COMPANY.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-brand-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {COMPANY.name}. Tüm hakları saklıdır.
          </p>
          <p className="text-sm text-gray-500">
            Sakarya, Türkiye'de güvenle hizmetinizdeyiz.
          </p>
        </div>
      </div>
    </footer>
  );
}
