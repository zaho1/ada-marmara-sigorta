import { Handshake, ClipboardCheck, BadgePercent } from 'lucide-react';

const REASONS = [
  {
    icon: Handshake,
    title: 'Uzun Yıllar Beraber',
    text: 'Son derece dinamik bir sektörde hizmet veriyor olmamızın bilinciyle hareket ediyoruz. Hizmet ve fiyatta rekabetçi yapımızla iş ortağımız olarak gördüğümüz sizlerle uzun yıllar birlikte olmak istiyoruz.',
  },
  {
    icon: ClipboardCheck,
    title: 'İşinizi Takip Ediyoruz',
    text: 'Sigortacı olarak işimizin sorumluluğunun poliçe kesmekten çok geniş olduğunu biliyoruz. Bu nedenle her türlü danışmanlık ve hasar süreçlerinde yanınızda olmayı mesleğimizin bir gereği olarak görüyoruz.',
  },
  {
    icon: BadgePercent,
    title: 'En Uygun Poliçe',
    text: 'Sigorta ihtiyaçlarınızı belirlerken adeta bir terzi titizliğiyle çalışarak size en uygun ürünü en uygun fiyata buluyoruz.',
  },
];

export default function WhyAdaMarmara() {
  return (
    <section id="neden-ada-marmara" className="bg-white section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700 mb-3">
            Neden Biz?
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
            Neden Ada Marmara Sigorta?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REASONS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-gradient-to-b from-brand-50/60 to-white p-7 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-md">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold text-brand-900 uppercase tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
