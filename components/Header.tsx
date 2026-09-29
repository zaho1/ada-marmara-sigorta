import { useState, useEffect } from 'react';
import { ShieldCheck, Menu, X, Phone, MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const NAV_LINKS = [
  { label: 'Ana Sayfa', href: '#hero' },
  { label: 'Sigorta Türleri', href: '#sigorta-turleri' },
  { label: 'Hakkımızda', href: '#hakkimizda' },
  { label: 'İletişim', href: '#iletisim' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 shadow-md transition-transform group-hover:scale-105">
              <ShieldCheck className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg lg:text-xl font-extrabold text-brand-900 tracking-tight">
                ADA MARMARA
              </span>
              <span className="text-xs lg:text-sm font-semibold text-accent-600 tracking-wider uppercase">
                Sigorta
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-gray-700 hover:text-brand-700 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-accent-600 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${COMPANY.whatsappRaw.replace(/\+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-brand-800 hover:text-brand-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              {COMPANY.phone}
            </a>
            <a
              href="#teklif-formu"
              className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-5"
            >
              Teklif Al
            </a>
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-brand-700 transition-colors"
              aria-label="Menü"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-1 animate-fade-in-up">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 space-y-2">
              <a
                href={`https://wa.me/${COMPANY.whatsappRaw.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-base font-semibold text-green-600"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp: {COMPANY.whatsapp}
              </a>
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="flex items-center gap-2 px-4 py-3 text-base font-semibold text-brand-800"
              >
                <Phone className="h-5 w-5" />
                {COMPANY.phone}
              </a>
              <a
                href="#teklif-formu"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full"
              >
                Teklif Al
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
