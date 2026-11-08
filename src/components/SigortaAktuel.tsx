import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Loader2, Newspaper } from 'lucide-react';
import { supabase, formatDateTr, type Post } from '@/lib/supabase';

/** Yazı içeriğini paragraf / başlık olarak gösterir. "## " ile başlayan satır ara başlık olur. */
function PostBody({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="space-y-5 text-lg leading-relaxed text-gray-700">
      {blocks.map((block, i) =>
        block.startsWith('## ') ? (
          <h2 key={i} className="pt-4 text-2xl font-bold text-gray-900">
            {block.slice(3)}
          </h2>
        ) : (
          <p key={i} className="whitespace-pre-line">
            {block}
          </p>
        ),
      )}
    </div>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-gray-50 min-h-[70vh]">
      <section className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex items-center gap-2 text-accent-400 text-sm font-semibold uppercase tracking-wide">
            <Newspaper className="h-4 w-4" />
            Haftalık Bülten
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Sigorta Aktüel
          </h1>
          <p className="mt-3 max-w-2xl text-gray-200">
            Sigorta dünyasındaki güncel gelişmeler, mevzuat değişiklikleri ve bilmeniz gerekenler.
            Her hafta yenilenir.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">{children}</div>
    </main>
  );
}

export default function SigortaAktuel({ slug }: { slug?: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!supabase) {
        setError('İçerik şu anda yüklenemiyor.');
        setLoading(false);
        return;
      }
      setLoading(true);
      const query = supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      const { data, error: err } = slug ? await query.eq('slug', slug).limit(1) : await query;
      if (cancelled) return;
      if (err) setError('İçerik şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.');
      else setPosts((data as Post[]) ?? []);
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (slug && posts[0]) document.title = `${posts[0].title} | Sigorta Aktüel - Ada Marmara Sigorta`;
    else document.title = 'Sigorta Aktüel | Ada Marmara Sigorta';
  }, [slug, posts]);

  if (loading) {
    return (
      <PageShell>
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        </div>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <p className="text-center text-gray-600 py-16">{error}</p>
      </PageShell>
    );
  }

  // Tekil yazı
  if (slug) {
    const post = posts[0];
    if (!post) {
      return (
        <PageShell>
          <div className="text-center py-16 space-y-4">
            <p className="text-gray-600">Aradığınız yazı bulunamadı.</p>
            <a href="/sigorta-aktuel" className="btn-secondary">
              Tüm yazılar
            </a>
          </div>
        </PageShell>
      );
    }
    return (
      <PageShell>
        <article className="mx-auto max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {post.cover_image && (
            <img src={post.cover_image} alt="" className="w-full max-h-96 object-cover" />
          )}
          <div className="p-6 sm:p-10">
            <a
              href="/sigorta-aktuel"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Tüm yazılar
            </a>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {post.title}
            </h1>
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays className="h-4 w-4" />
              {formatDateTr(post.created_at)}
            </div>
            {post.excerpt && (
              <p className="mt-6 text-xl text-gray-600 border-l-4 border-accent-500 pl-4">
                {post.excerpt}
              </p>
            )}
            <div className="mt-8">
              <PostBody content={post.content} />
            </div>
            <div className="mt-12 rounded-xl bg-brand-50 p-6 text-center">
              <p className="font-semibold text-gray-900">Size en uygun teklifi hazırlayalım</p>
              <a href="/#teklif-formu" className="btn-primary mt-4">
                Hemen Teklif Al
              </a>
            </div>
          </div>
        </article>
      </PageShell>
    );
  }

  // Liste
  if (posts.length === 0) {
    return (
      <PageShell>
        <p className="text-center text-gray-600 py-16">Yakında ilk yazımız burada olacak.</p>
      </PageShell>
    );
  }

  const [latest, ...rest] = posts;

  return (
    <PageShell>
      <a
        href={`/sigorta-aktuel/${latest.slug}`}
        className="group block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div className={latest.cover_image ? 'grid md:grid-cols-2' : ''}>
          {latest.cover_image && (
            <img src={latest.cover_image} alt="" className="h-64 md:h-full w-full object-cover" />
          )}
          <div className="p-6 sm:p-8">
            <span className="inline-block rounded-full bg-accent-100 px-3 py-1 text-xs font-bold text-accent-700">
              Bu haftanın yazısı
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900 group-hover:text-brand-700 transition-colors">
              {latest.title}
            </h2>
            <div className="mt-2 text-sm text-gray-500">{formatDateTr(latest.created_at)}</div>
            {latest.excerpt && <p className="mt-4 text-gray-600">{latest.excerpt}</p>}
            <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-brand-700">
              Devamını oku <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </a>

      {rest.length > 0 && (
        <>
          <h3 className="mt-12 mb-5 text-xl font-bold text-gray-900">Önceki yazılar</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {rest.map((post) => (
              <a
                key={post.id}
                href={`/sigorta-aktuel/${post.slug}`}
                className="group bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-xs text-gray-500">{formatDateTr(post.created_at)}</div>
                <h4 className="mt-1 text-lg font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
                  {post.title}
                </h4>
                {post.excerpt && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>}
              </a>
            ))}
          </div>
        </>
      )}
    </PageShell>
  );
}
