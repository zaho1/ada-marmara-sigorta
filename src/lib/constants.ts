export const COMPANY = {
  name: 'ADA MARMARA Sigorta',
  phone: '+90 555 470 31 48',
  phoneRaw: '+905554703148',
  location: 'Sakarya, Türkiye',
  hours: 'Pzt - Cum 09:00 - 18:00',
  email: 'info@adamarmarasigorta.com',
  authorizationNo: '2024TPYS-5801',
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
    name: 'Ahmet Y.',
    text: 'Trafik sigortamı çok uygun fiyata ve anında kestiler. Teşekkürler Ada Marmara!',
    rating: 5,
  location: 'Adapazarı, Sakarya',
  },
  {
    name: 'Ayşe T.',
    text: 'Sakarya\'da güvenilir bir acente arıyordum, kasko işlemimi çok hızlı hallettiler.',
    rating: 5,
    location: 'Serdivan, Sakarya',
  },
  {
    name: 'Mehmet K.',
    text: 'DASK poliçemi 2 dakikada düzenlediler. Profesyonel ve hızlı hizmet!',
    rating: 5,
    location: 'Erenler, Sakarya',
  },
  {
    name: 'Zeynep A.',
    text: 'Sağlık sigortam için en uygun teklifi verdiler. Her aşamada bilgilendirdiler.',
    rating: 5,
    location: 'Karasu, Sakarya',
  },
  {
    name: 'Caner D.',
    text: 'Konut sigortamı yaptırdım, fiyatlar çok uygundu. Kesinlikle tavsiye ederim.',
    rating: 5,
    location: 'Söğütlü, Sakarya',
  },
  {
    name: 'Fatma S.',
    text: 'Trafik ve kasko poliçelerimi birlikte kestiler, büyük indirim sağladılar. Teşekkürler!',
    rating: 5,
    location: 'Akyazı, Sakarya',
  },
];

export const TRUST_BADGES = [
  { icon: 'Headphones', title: '7/24 Destek', description: 'Her an yanınızdayız, sorularınızı yanıtlamaya hazırız.' },
  { icon: 'BadgePercent', title: 'En İyi Fiyat Garantisi', description: '20+ şirketten karşılaştırmalı teklif ile en uygun fiyat.' },
  { icon: 'Zap', title: 'Hızlı ve Güvenilir İşlem', description: 'Poliçeniz dakikalar içinde hazır, güvenle teslim edilir.' },
  { icon: 'Building2', title: '20+ Sigorta Şirketi', description: 'Türkiye\'nin en büyük sigorta şirketleri tek çatı altında.' },
];
