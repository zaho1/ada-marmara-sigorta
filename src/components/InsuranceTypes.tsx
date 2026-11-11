import { Car, ShieldCheck, Home, HeartPulse, Building2, ArrowRight, Briefcase, Truck, Plane, Leaf } from 'lucide-react';

const INSURANCE_TYPES = [
  {
    icon: Car,
    title: 'Trafik Sigortası',
    description: 'Zorunlu trafik sigortanız en uygun fiyatla, anında düzenlenir. 34+ şirketten karşılaştırmalı teklif.',
    color: 'from-blue-500 to-blue-700',
    features: ['Anında poliçe', 'En uygun fiyat', '34+ şirket karşılaştırması'],
  },
  {
    icon: ShieldCheck,
    title: 'Kasko',
    description: 'Aracınızı her türlü riskte koruyun. Genişletilmiş kasko seçenekleriyle tam güvence.',
    color: 'from-brand-600 to-brand-800',
    features: ['Genişletilmiş teminat', 'Mini kasko seçeneği', 'Hasarsızlık indirimi'],
  },
  {
    icon: Home,
    title: 'DASK',
    description: 'Zorunlu deprem sigortanız 2 dakikada hazır. Hızlı ve kolay işlem.',
    color: 'from-amber-500 to-amber-700',
    features: ['2 dakikada düzenleme', 'Online işlem', 'Anında poliçe'],
  },
  {
    icon: HeartPulse,
    title: 'Sağlık Sigortası',
    description: 'Sağlığınız için özel sigorta çözümleri. Aile ve bireysel paketler.',
    color: 'from-rose-500 to-rose-700',
    features: ['Aile paketi', 'Bireysel seçenekler', 'Geniş anlaşmalı ağ'],
  },
  {
    icon: Building2,
    title: 'Konut Sigortası',
    description: 'Evinizi yangın, su, hırsızlık ve depreme karşı koruyun. Kapsamlı konut sigortası.',
    color: 'from-teal-500 to-teal-700',
    features: ['Yangın ve su teminatı', 'Hırsızlık koruması', 'Cam kırılması'],
  },
  {
    icon: Leaf,
    title: 'BES Sigortası',
    description: 'Bina ve Eşya Sigortası ile mülkünüzü tam güvence altına alın.',
    color: 'from-green-500 to-green-700',
    features: ['Bina teminatı', 'Eşya teminatı', 'Kapsamlı koruma'],
  },
  {
    icon: Plane,
    title: 'Seyahat Sigortası',
    description: 'Yurt içi ve yurt dışı seyahatleriniz için güvence ve sağlık teminatı.',
    color: 'from-cyan-500 to-cyan-700',
    features: ['Yurt içi seyahat', 'Yurt dışı seyahat', 'Vize sigortası'],
  },
  {
    icon: Truck,
    title: 'Nakliyat Sigortası',
    description: 'Yük ve araç nakliyat işleriniz için kapsamlı sigorta çözümleri.',
    color: 'from-orange-500 to-orange-700',
    features: ['Yük teminatı', 'Araç teminatı', 'Sorumluluk sigortası'],
  },
  {
    icon: Briefcase,
    title: 'İşyeri Sigortası',
    description: 'İş yerinizi ve çalışanlarınızı kapsamlı sigorta ile koruyun.',
    color: 'from-purple-500 to-purple-700',
    features: ['İşyeri teminatı', 'Sorumluluk sigortası', 'Kefalet sigortası'],
  },
];

export default function InsuranceTypes() {
  return (
    <section id="sigorta-turleri" className="bg-gradient-to-b from-gray-50 to-white section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700 mb-3">
            Sigorta Türleri
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
            Sigorta Çözümlerimiz
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            İhtiyacınıza uygun sigorta türünü seçin, en uygun teklifi hemen alın.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSURANCE_TYPES.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 hover:border-brand-200"
            >
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-md`}>
                <item.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.description}</p>
              <ul className="space-y-1.5 mb-5">
                {item.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-100 shrink-0">
                      <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#teklif-formu"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors group/link"
              >
                Teklif Al
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          ))}

          {/* CTA card */}
          <div className="relative rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 p-6 flex flex-col justify-center items-center text-center shadow-lg xl:col-span-4">
            <h3 className="text-xl font-bold text-white mb-2">Hangi sigorta sizin için uygun?</h3>
            <p className="text-sm text-gray-300 mb-5 max-w-xs">
              Uzman ekibimiz ihtiyacınıza en uygun sigorta çözümünü bulmanıza yardımcı olur.
            </p>
            <a href="#teklif-formu" className="btn-primary">
              Hemen Teklif Al
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
