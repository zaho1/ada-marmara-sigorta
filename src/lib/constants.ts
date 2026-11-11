const SAKARYA_ADDRESS = 'Karaosman Mah. Ulus Cad. No 41/A Adapazarı / Sakarya';
const ISTANBUL_ADDRESS = 'Merkez Mah. Çukurçeşme Cad. No 19 İç Kapı 9 Gaziosmanpaşa / İstanbul';

export const COMPANY = {
  name: 'ADA MARMARA Sigorta',
  legalName: 'ADA MARMARA SİGORTA ARACILIK HİZMETLERİ LTD. ŞTİ.',
  phone: '+90 534 391 44 25',
  phoneRaw: '+905343914425',
  gsm: '0544 227 5783',
  gsmRaw: '+905442275783',
  whatsapp: '+90 534 391 44 25',
  whatsappRaw: '+905343914425',
  location: 'İstanbul ve Sakarya, Türkiye',
  // Yasal merkez adresi (KVKK metni vb. için)
  address: SAKARYA_ADDRESS,
  // İletişim bölümünde gösterilen ofisler: İstanbul önce, Sakarya sonra
  branches: [
    { city: 'İstanbul', address: ISTANBUL_ADDRESS },
    { city: 'Sakarya', address: SAKARYA_ADDRESS },
  ],
  hours: 'Pzt - Cum 09:00 - 18:00',
  email: 'adamarmarasigorta@gmail.com',
  taxOffice: 'Ali Fuat Cebesoy V.D.',
  taxNo: '007 154 9164',
  atsoNo: '40766',
  mersisNo: '0007-1549-1640-0001',
  authorizationNo: '2024TPYS-5801',
  levhaNo: 'T251223-8614',
  tobLevhaNo: 'T251223-8614',
};

export const TICKER_MESSAGES = [
  'Zeynep K. — Trafik Sigortası yenilendi · 15.480 ₺',
  'Mehmet A. — Kasko poliçesi kesildi · 22.750 ₺',
  'Ayşe T. — DASK + Konut paketi tamamlandı · 16.200 ₺',
  'Caner D. — Konut Sigortası düzenlendi · 18.900 ₺',
  'Fatma S. — Sağlık Sigortası poliçesi · 24.500 ₺',
  'Hüseyin Y. — Kasko poliçesi yenilendi · 31.400 ₺',
  'Elif B. — Trafik Sigortası kesildi · 19.860 ₺',
  'Murat K. — Kasko poliçesi tamamlandı · 28.900 ₺',
  'Selin A. — Sağlık Sigortası yenilendi · 32.750 ₺',
  'Osman T. — Konut Sigortası kesildi · 21.300 ₺',
  'Derya K. — Trafik Sigortası düzenlendi · 17.250 ₺',
  'Emre Y. — Kasko poliçesi kesildi · 45.800 ₺',
  'Nuray Ş. — Sağlık Sigortası poliçesi · 38.600 ₺',
  'Burak A. — Kasko poliçesi yenilendi · 52.300 ₺',
  'Sevgi M. — DASK + Konut paketi kesildi · 19.750 ₺',
  'Tolga R. — Trafik Sigortası tamamlandı · 27.900 ₺',
];

export const INSURANCE_TYPES = [
  { id: 'trafik', label: 'Trafik Sigortası', icon: 'Car', description: 'Zorunlu trafik sigortanız en uygun fiyatla' },
  { id: 'kasko', label: 'Kasko', icon: 'ShieldCheck', description: 'Aracınızı her türlü riskten koruyun' },
  { id: 'dask', label: 'DASK', icon: 'Home', description: 'Zorunlu deprem sigortanız anında' },
  { id: 'saglik', label: 'Sağlık Sigortası', icon: 'HeartPulse', description: 'Sağlığınız için özel sigorta' },
  { id: 'konut', label: 'Konut Sigortası', icon: 'Building2', description: 'Evinizi yangın, su ve hırsızlığa karşı koruyun' },
] as const;

export const TESTIMONIALS = [
  {
    name: 'İrem K.',
    text: 'Sağlık sigortam için aramıştım telefonu açan beyefendi çok ilgiliydi ismini hatırlayamadım yorum yazmak istedim. poliçemi en hızlı şekilde çözdüğü için teşekkür ederim :)',
    rating: 5,
  },
  {
    name: 'Abdullah S.',
    text: 'Titiz, dürüst ve işini seven biri. İşimi en doğru ve pratik şekilde hallettiği için de kendisine buradan da teşekkür etmek istedim.',
    rating: 5,
  },
  {
    name: 'Ömer Faruk Y.',
    text: 'İlgili yaklaşımınız, güler yüzünüz ve hızlı çözüm üretebilirliğiniz için çok teşekkür ederim. Sigorta konusunda aradığım güveni burada buldum, 5 yıldızı fazlasıyla hak ediyorlar.',
    rating: 5,
  },
  {
    name: 'Mert K.',
    text: 'İlgili ve bilgili bir acente. Sunduğunuz hizmet için teşekkürler',
    rating: 5,
  },
  {
    name: 'Barış Ç.',
    text: 'Şeffaf ve hızlı işlemler için teşekkürler.',
    rating: 5,
  },
  {
    name: 'Enes S.',
    text: 'Enes bey sürecin en başından beri çok ilgiliydi. Tüm konularda şeffaf bir şekilde bilgi verdi. Çok memnun kaldık herkese tavsiye ederim.',
    rating: 5,
  },
];

export const TRUST_BADGES = [
  { icon: 'Headphones', title: '7/24 Destek', description: 'Her an yanınızdayız, sorularınızı yanıtlamaya hazırız.' },
  { icon: 'BadgePercent', title: 'En İyi Fiyat Garantisi', description: '34+ şirketten karşılaştırmalı teklif ile en uygun fiyat.' },
  { icon: 'Zap', title: 'Hızlı ve Güvenilir İşlem', description: 'Poliçeniz dakikalar içinde hazır, güvenle teslim edilir.' },
  { icon: 'Building2', title: '34+ Sigorta Şirketi', description: 'Türkiye\'nin en büyük sigorta şirketleri tek çatı altında.' },
];
