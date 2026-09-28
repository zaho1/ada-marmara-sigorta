import { Handshake } from 'lucide-react';

type Partner = {
  name: string;
  short: string;
  bg: string;
  text: string;
  accent: string;
};

const PARTNERS: Partner[] = [
  { name: 'Allianz', short: 'A', bg: 'bg-[#003781]', text: 'text-white', accent: 'ring-[#003781]/20' },
  { name: 'Aksigorta', short: 'AKS', bg: 'bg-[#0066b3]', text: 'text-white', accent: 'ring-[#0066b3]/20' },
  { name: 'Anadolu Sigorta', short: 'AS', bg: 'bg-[#e31937]', text: 'text-white', accent: 'ring-[#e31937]/20' },
  { name: 'AXA', short: 'AXA', bg: 'bg-[#00008f]', text: 'text-white', accent: 'ring-[#00008f]/20' },
  { name: 'Türkiye Sigorta', short: 'TS', bg: 'bg-[#d40e1c]', text: 'text-white', accent: 'ring-[#d40e1c]/20' },
  { name: 'Zurich', short: 'Z', bg: 'bg-[#0a7d2f]', text: 'text-white', accent: 'ring-[#0a7d2f]/20' },
  { name: 'Mapfre', short: 'M', bg: 'bg-[#c8102e]', text: 'text-white', accent: 'ring-[#c8102e]/20' },
  { name: 'Sompo', short: 'SOM', bg: 'bg-[#e60012]', text: 'text-white', accent: 'ring-[#e60012]/20' },
  { name: 'Quick Sigorta', short: 'Q!', bg: 'bg-[#ff6600]', text: 'text-white', accent: 'ring-[#ff6600]/20' },
  { name: 'Ray Sigorta', short: 'RAY', bg: 'bg-[#1a1a1a]', text: 'text-white', accent: 'ring-[#1a1a1a]/20' },
  { name: 'HDI', short: 'HDI', bg: 'bg-[#00953f]', text: 'text-white', accent: 'ring-[#00953f]/20' },
  { name: 'Eureko', short: 'E', bg: 'bg-[#005baa]', text: 'text-white', accent: 'ring-[#005baa]/20' },
  { name: 'Güven Sigorta', short: 'GÜV', bg: 'bg-[#004a98]', text: 'text-white', accent: 'ring-[#004a98]/20' },
  { name: 'Türkiye Hayat', short: 'TH', bg: 'bg-[#d40e1c]', text: 'text-white', accent: 'ring-[#d40e1c]/20' },
  { name: 'Bereket Sigorta', short: 'B', bg: 'bg-[#1b7583]', text: 'text-white', accent: 'ring-[#1b7583]/20' },
  { name: 'Doğa Sigorta', short: 'D', bg: 'bg-[#2e8b57]', text: 'text-white', accent: 'ring-[#2e8b57]/20' },
];

const PARTNER_ROW = [...PARTNERS, ...PARTNERS];

export default function Partners() {
  return (
    <section id="anlasmali-firmalar" className="bg-gradient-to-b from-gray-50 to-white section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700 mb-3">
            Anlaşmalı Firmalar
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
            20+ Sigorta Şirketiyle Çalışıyoruz
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Türkiye'nin önde gelen sigorta şirketlerinden karşılaştırmalı teklif sunarak size en uygun fiyatı buluyoruz.
          </p>
        </div>
      </div>

      {/* Marquee row */}
      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />

        <div className="flex w-max animate-marquee">
          {PARTNER_ROW.map((partner, i) => (
            <div key={i} className="mx-3 shrink-0">
              <div className={`group flex h-24 w-52 items-center gap-4 rounded-2xl border border-gray-100 bg-white px-5 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-brand-200 hover:ring-2 ${partner.accent}`}>
                {/* Logo mark */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${partner.bg} ${partner.text} shrink-0 shadow-md transition-transform group-hover:scale-105`}>
                  <span className="text-xl font-extrabold tracking-tight">{partner.short}</span>
                </div>
                {/* Name */}
                <div className="flex flex-col">
                  <span className="text-base font-bold text-gray-800 leading-tight">{partner.name}</span>
                  <span className="text-xs text-gray-400 mt-0.5">Sigorta</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom note */}
      <div className="mx-auto max-w-7xl mt-10">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Handshake className="h-5 w-5 text-brand-600" />
          <span>Yetkili acente olarak tüm bu şirketlerden karşılaştırmalı teklif sunuyoruz.</span>
        </div>
      </div>
    </section>
  );
}
