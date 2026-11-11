import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'Trafik sigortası nedir ve neden zorunludur?',
    answer: 'Trafik sigortası, bir kazada karşı tarafa verilen maddi ve bedensel zararları karşılayan zorunlu bir sigortadır. Türkiye\'de tüm kara araçlarının trafik sigortası yaptırması yasal bir yükümlülüktür. Yaptırmamanız halinde aracınız trafiğe çıkamaz ve cezai işlem uygulanır.',
  },
  {
    question: 'Kasko ile trafik sigortası arasındaki fark nedir?',
    answer: 'Trafik sigortası sadece karşı tarafın zararını karşılar; kendi aracınızın hasarı ödenmez. Kasko ise kendi aracınızı da kaza, hırsızlık, yangın, doğal afet gibi risklere karşı korur. Kasko zorunlu değildir ancak aracınızın değerini korumak için önemle tavsiye edilir.',
  },
  {
    question: 'DASK yaptırmazsam ne olur?',
    answer: 'DASK (Doğal Afet Sigortaları Kurumu) deprem kaynaklı hasarları karşılayan zorunlu bir sigortadır. DASK yaptırmayan konutlar için su, elektrik, doğalgaz gibi abonelikler bağlanamaz. Ayrıca deprem gibi bir afette evinizin hasarı karşılanmaz.',
  },
  {
    question: 'Konut sigortası ile DASK aynı şey mi?',
    answer: 'Hayır. DASK sadece deprem kaynaklı hasarları karşılar. Konut sigortası ise yangın, su basması, hırsızlık, cam kırılması, fırtına gibi çok daha geniş riskleri kapsar. İkisini birlikte yaptırmak eviniz için en kapsamlı korumayı sağlar.',
  },
  {
    question: 'Sağlık sigortası SGK\'nın yerini geçer mi?',
    answer: 'Sağlık sigortası SGK\'nın yerini almaz, onu tamamlar. Tamamlayıcı sağlık sigortası ile SGK kapsamayan özel hastane ve tedavileri kullanabilirsiniz. Özel sağlık sigortası ise bağımsız olarak özel hastanelerde tedavi olma imkânı sunar.',
  },
  {
    question: 'Sigorta primi nasıl belirlenir?',
    answer: 'Sigorta primi; araç yaşı, araç değeri, sürücünün yaş ve ehliyet geçmişi, hasarsızlık durumu, konutun metrekare değeri, sağlık sigortasında yaş ve sağlık durumu gibi faktörlere göre belirlenir. 34+ sigorta şirketinden karşılaştırmalı teklif alarak en uygun fiyatı bulabilirsiniz.',
  },
  {
    question: 'Poliçemi online alabilir miyim?',
    answer: 'Evet. Trafik, Kasko, DASK ve Konut sigortalarınızı online olarak düzenleyebiliriz. Formu doldurmanız yeterli; uzman ekibimiz sizinle iletişime geçerek işlemlerinizi tamamlar. Poliçeniz e-posta ve SMS ile size iletilir.',
  },
  {
    question: 'Hasar durumunda ne yapmam gerekir?',
    answer: 'Hasar durumunda öncelikle can güvenliğinizi sağlayın. Kaza ise polis veya kaza tespit tutanağı düzenletin. Ardından bizi arayın; hasar işlemlerinizi baştan sona takip ederiz. Sigorta şirketi hasar ekibi size ulaşarak süreci yönetir.',
  },
  {
    question: 'Sigortamı yenilemeyi unutursam ne olur?',
    answer: 'Poliçe yenileme tarihinden itibaren 15 gün içinde yenileme yaparsanız hasarsızlık indirimi korunur. Bu süreyi geçerseniz yeni poliçe gibi işlem görür ve hasarsızlık indiriminizi kaybedebilirsiniz. Yenileme tarihinde otomatik hatırlatma almak için bizimle iletişime geçebilirsiniz.',
  },
  {
    question: 'Hangi sigorta şirketleriyle çalışıyorsunuz?',
    answer: 'Allianz, Aksigorta, Anadolu Sigorta, AXA, Türkiye Sigorta, Zurich, Mapfre, Sompo, Quick Sigorta, Ray Sigorta ve daha birçok sigorta şirketiyle yetkili acente olarak çalışıyoruz. 34+ şirketten karşılaştırmalı teklif sunarak en uygun fiyatı bulmanızı sağlıyoruz.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="sss" className="bg-white section-padding">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-accent-50 px-4 py-1.5 text-sm font-semibold text-accent-700 mb-3">
            S.S.S.
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Sigorta hakkında en çok merak edilen sorular ve cevapları.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-brand-300 bg-brand-50/30 shadow-md'
                    : 'border-gray-200 bg-white hover:border-brand-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 transition-colors ${
                    isOpen ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-600'
                  }`}>
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <span className="flex-1 text-base font-semibold text-gray-900">
                    {item.question}
                  </span>
                  <ChevronDown className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-brand-600' : ''
                  }`} />
                </button>
                <div className={`grid transition-all duration-300 ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pl-[4.5rem] text-sm text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
