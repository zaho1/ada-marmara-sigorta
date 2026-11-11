/**
 * /sigorta-aktuel/:slug linkleri için paylaşım önizlemesi (Open Graph) üretir.
 *
 * Site tek sayfa uygulaması olduğu için WhatsApp, Instagram, Google gibi bot'lar
 * JavaScript çalıştırmaz ve her linkte ana sayfanın başlığını görür. Bu fonksiyon,
 * makale linkleri açıldığında derlenmiş index.html'i alır, <head> içindeki başlık,
 * açıklama ve görsel etiketlerini yazının kendi bilgileriyle değiştirip döndürür.
 * Tarayıcıda sayfa yine aynı uygulamayla açılır.
 *
 * vercel.json içindeki rewrite, /sigorta-aktuel/:slug isteklerini buraya yönlendirir.
 * Yazı bilgisi Supabase'ten okunur. Vercel > Settings > Environment Variables:
 *   VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY (sitenin zaten kullandığı değişkenler)
 */

const SITE = 'https://www.adamarmarasigorta.com.tr';
const SITE_NAME = 'Ada Marmara Sigorta';
const DEFAULT_IMAGE = `${SITE}/logo.png`;
const DEFAULT_DESCRIPTION =
  'Sigorta dünyasındaki güncel gelişmeler, mevzuat değişiklikleri ve bilmeniz gerekenler.';

// Kabuk (index.html) sadece sitenin kendi adreslerinden alınır.
const OWN_HOST = /^(www\.)?adamarmarasigorta\.com\.tr$|^adamarmara-guncel[a-z0-9-]*\.vercel\.app$/i;
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,119}$/i;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function toDescription(post) {
  const source = (post.excerpt && post.excerpt.trim()) || post.content || '';
  const plain = source
    .replace(/^##\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!plain) return DEFAULT_DESCRIPTION;
  return plain.length > 180 ? `${plain.slice(0, 177).trimEnd()}...` : plain;
}

async function loadShell(host) {
  const origins = [];
  if (host && OWN_HOST.test(host)) origins.push(`https://${host}`);
  if (!origins.includes(SITE)) origins.push(SITE);

  for (const origin of origins) {
    try {
      const response = await fetch(`${origin}/index.html`, { signal: AbortSignal.timeout(5000) });
      if (response.ok) return await response.text();
    } catch {
      // sıradaki adresi dene
    }
  }
  return null;
}

async function loadPost(slug) {
  const baseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  if (!baseUrl || !anonKey) return null;

  const endpoint =
    `${baseUrl.replace(/\/$/, '')}/rest/v1/posts` +
    `?select=title,excerpt,content,cover_image,slug&published=eq.true` +
    `&slug=eq.${encodeURIComponent(slug)}&limit=1`;

  try {
    const response = await fetch(endpoint, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const rows = await response.json();
    return Array.isArray(rows) && rows[0] ? rows[0] : null;
  } catch {
    return null;
  }
}

function injectMeta(html, post) {
  const title = escapeHtml(post.title);
  const pageTitle = escapeHtml(`${post.title} | Sigorta Aktüel - ${SITE_NAME}`);
  const description = escapeHtml(toDescription(post));
  const url = escapeHtml(`${SITE}/sigorta-aktuel/${post.slug}`);
  const hasCover = typeof post.cover_image === 'string' && /^https?:\/\//i.test(post.cover_image);
  const image = escapeHtml(hasCover ? post.cover_image : DEFAULT_IMAGE);

  const tags = [
    `<title>${pageTitle}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="tr_TR" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="${hasCover ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join('\n    ');

  // Ana sayfanın başlık / açıklama / paylaşım etiketlerini çıkarıp yazınınkileri ekle
  const cleaned = html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+(?:name|property)="(?:description|og:[^"]*|twitter:[^"]*)"[^>]*>\s*/gi, '');

  return cleaned.replace('</head>', `    ${tags}\n  </head>`);
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '')
    .split(',')[0]
    .trim();

  let slug = '';
  try {
    const raw = Array.isArray(req.query?.slug) ? req.query.slug[0] : req.query?.slug;
    slug = decodeURIComponent(String(raw || ''));
  } catch {
    slug = '';
  }

  const shell = await loadShell(host);
  if (!shell) {
    res.status(502).send('Sayfa şu anda yüklenemiyor.');
    return;
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const post = SLUG_PATTERN.test(slug) ? await loadPost(slug) : null;
  if (!post) {
    // Yazı bulunamadı ya da veri alınamadı: uygulama kendi "yazı bulunamadı" ekranını gösterir
    res.setHeader('Cache-Control', 'public, s-maxage=60');
    res.status(200).send(shell);
    return;
  }

  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
  res.status(200).send(injectMeta(shell, post));
}
