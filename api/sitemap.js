/**
 * /sitemap.xml: arama motorlarına sitedeki sayfaları ve yayındaki Sigorta Aktüel
 * yazılarını bildirir. Yazılar Supabase'ten okunur, yeni yazı eklenince listeye
 * kendiliğinden girer (en geç 1 saat içinde).
 *
 * vercel.json içindeki rewrite, /sitemap.xml isteğini buraya yönlendirir.
 * Vercel > Settings > Environment Variables:
 *   VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY (sitenin zaten kullandığı değişkenler)
 */

const SITE = 'https://www.adamarmarasigorta.com.tr';

const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/sigorta-aktuel', changefreq: 'weekly', priority: '0.8' },
  { path: '/kvkk', changefreq: 'yearly', priority: '0.3' },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
}

async function loadPosts() {
  const baseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  if (!baseUrl || !anonKey) return [];

  const endpoint =
    `${baseUrl.replace(/\/$/, '')}/rest/v1/posts` +
    `?select=slug,updated_at,created_at&published=eq.true&order=created_at.desc&limit=1000`;

  try {
    const response = await fetch(endpoint, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return [];
    const rows = await response.json();
    return Array.isArray(rows) ? rows.filter((row) => typeof row.slug === 'string' && row.slug) : [];
  } catch {
    return [];
  }
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const posts = await loadPosts();

  const entries = [
    ...STATIC_PAGES.map((page) =>
      urlEntry({ loc: `${SITE}${page.path}`, changefreq: page.changefreq, priority: page.priority }),
    ),
    ...posts.map((post) =>
      urlEntry({
        loc: `${SITE}/sigorta-aktuel/${post.slug}`,
        lastmod: toDate(post.updated_at || post.created_at),
        changefreq: 'monthly',
        priority: '0.7',
      }),
    ),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(xml);
}
