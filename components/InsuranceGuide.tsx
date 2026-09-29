import { Car, ShieldCheck, Home, HeartPulse, Building2, Users, ArrowRight } from 'lucide-react';

const GUIDE_ITEMS = [
  {
    icon: Car,
    title: 'Araç Sahipleri',
    who: 'Tüm araç sahipleri',
    insurance: 'Trafik Sigortası (Zorunlu) + Kasko (İsteğe Bağlı)',
    text: 'Trafik sigortası yasa gereği zorunludur; karşı tarafın zararını karşılar. Kasko ise kendi aracınızı hırsızlık, yangın, kaza ve doğal afetlere karşı korur. Her araç sahibinin en az trafik sigortasını yaptırması yasal bir yükümlülüktür.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: Home,
    title: 'Ev Sahipleri ve Kiracılar',
    who: 'Konut sahipleri ve kiracılar',
    insurance: 'DASK (Zorunlu) + Konut Sigortası (İsteğe Bağlı)',
    text: 'DASK, deprem riskine karşı tüm konutlar için zorunludur. Konut sigortası ise yangın, su basması, hırsızlık ve cam kırılması gibi risklere karşı evinizi ve eşyalarınızı güvence altına alır. Kiracılar da eşyaları için konut sigortası yaptırabilir.',
    color: 'from-amber-500 to-amber-700',
  },
  {
    icon: HeartPulse,
    title: 'Aileler ve Bireyler',
    who: 'Herkes, özellikle aileler',
    insurance: 'Sağlık Sigortası / Tamamlayıcı Sağlık Sigortası',
    text: 'Sağlık sigortası, özel hastanelerde tedavi olma imkânı sunar. Aile paketleriyle tüm aile fertlarınızı tek poliçe altında güvenceye alabilirsiniz. SGK\'ya ek olarak tamamlayıcı sağlık sigortası ile kapsamınızı genişletebilirsiniz.',
    color: 'from-rose-500 to-rose-700',
  },
  {
    icon: Building2,
    title: 'İşletme Sahipleri',
    who: 'İşletme ve şirket sahipleri',
    insurance: 'İşyeri Sigortası + Konut/Yangın Sigortası',
    text: 'İşletmenizi yangın, hırsızlık, cam kırılması ve iş durması gibi risklere karşı sigortalayın. İşyeri sigortası ile maddi varlıklarınızı ve stoklarınızı koruma altına alabilir, iş sürekliliğinizi güvenceye alabilirsiniz.',
    color: 'from-teal-500 to-teal-700',
  },
  {
    icon: Users,
    title: 'Çalışanlar',
    who: 'İşverenler ve çalışanlar',
    insurance: 'İşyeri Ferdi Kaza Sigortası',
    text: 'İşveren olarak çalışanlarınızı iş kazalarına karşı güvence altına alabilirsiniz. Ferdi kaza sigortası, çalışanların geçirdiği kazalarda tazminat ve sağlık giderlerini karşılar; hem işvereni hem de çalışanı korur.',
    color: 'from-brand-600 to-brand-800',
  },
  {
    icon: ShieldCheck,
    title: 'Kiralık Araç Kullananlar',
    who: 'Araç kiralayan veya ödünç alanlar',
    insurance: 'Kasko + Ferdi Kaza Sigortası',
    text: 'Kiraladığınız veya ödünç aldığınız aracı kasko ile koruyabilirsiniz. Ayrıca ferdi kaza sigortası ile sürücü ve yolcuların kazalardaki güvencesini sağlayabilirsiniz.',
    color: 'from-accent-500 to-accent-700',
  },
];

export default function InsuranceGuide() {
  return (
    <section id="sigorta-rehberi" className="bg-gradient-to-b from-white to-gray-50 section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700 mb-3">
            Sigorta Rehberi
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
            Kim, Neden, Hangi Sigortayı Yaptırmalı?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Durumunuza ve ihtiyacınıza uygun sigorta türünü öğrenin. Rehberimizle doğru kararı verin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDE_ITEMS.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 hover:border-brand-200"
            >
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-md`}>
                <item.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs font-medium text-brand-600 mb-3">Kim: {item.who}</p>
              <div className="rounded-lg bg-brand-50 px-3 py-2 mb-3">
                <p className="text-sm font-semibold text-brand-800">{item.insurance}</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#teklif-formu" className="btn-primary">
            Size Uygun Sigortayı Bulun
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
