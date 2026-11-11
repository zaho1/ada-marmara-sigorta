import { ShieldCheck, Clock, Users, Award, Building, Handshake, MapPin } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const STATS = [
  { icon: Users, label: 'Mutlu Müşteri', value: '5.000+' },
  { icon: Award, label: 'Yıllık Tecrübe', value: '15+' },
  { icon: ShieldCheck, label: 'Sigorta Şirketi', value: '34+' },
  { icon: Clock, label: 'Poliçe Düzenlendi', value: '10.000+' },
];

const VALUES = [
  {
    icon: Handshake,
    title: 'Güvenilir Hizmet',
    text: 'Şeffaf ve dürüst bir şekilde çalışarak, sigorta sürecinin her adımında yanınızdayız.',
  },
  {
    icon: Building,
    title: 'Yerel Uzmanlık',
    text: 'İstanbul ve Sakarya\'da yılların deneyimiyle bölgeyi ve müşteri ihtiyaçlarını yakından tanıyoruz.',
  },
  {
    icon: ShieldCheck,
    title: 'Kapsamlı Güvence',
    text: 'Trafik, Kasko, DASK, Sağlık ve Konut sigortalarında 34+ şirketin karşılaştırmalı teklifini sunuyoruz.',
  },
];

export default function About() {
  return (
    <section id="hakkimizda" className="bg-white section-padding">
      <div className="mx-auto max-w-7xl">
        {/* Top: Content */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 text-center">
            <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
              Hakkımızda
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              İstanbul ve Sakarya'nın Güvenilir Sigorta Acentesi
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              <strong className="text-brand-800">ADA MARMARA Sigorta</strong> olarak İstanbul ve
              Sakarya'da yıllardır hizmet veriyoruz. Trafik, Kasko, DASK, Sağlık ve Konut sigortalarında
              34+ sigorta şirketinden karşılaştırmalı teklif sunarak en uygun fiyatı bulmanızı
              sağlıyoruz.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              İstanbul ve Sakarya'daki ofislerimizde müşterilerimize yüz yüze ve
              online olarak kesintisiz hizmet sunmaktayız. Deneyimli ekibimiz, sigorta
              süreçlerini baştan sona sizin yerinize takip eder; poliçenizin düzenlenmesinden
              hasar işlemlerine kadar her adımda yanınızda olur.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Müşteri memnuniyetini her zaman ön planda tutarak, hızlı ve güvenilir hizmet
              anlayışıyla çalışıyoruz. İster trafik sigortanız yenilensin, ister kasko teklifi
              alın, ister DASK poliçenizi düzenleyin — uzman ekibimiz sigorta ihtiyaçlarınıza
              en doğru çözümü bulmak için yanınızda.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center rounded-xl bg-brand-50 p-4">
                  <stat.icon className="h-6 w-6 text-brand-600 mx-auto mb-2" />
                  <div className="text-2xl font-extrabold text-brand-900">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          {VALUES.map((val, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-brand-200"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 transition-all group-hover:from-brand-600 group-hover:to-brand-800">
                <val.icon className="h-7 w-7 text-brand-700 transition-colors group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{val.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{val.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
