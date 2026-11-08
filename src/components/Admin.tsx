import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  Eye,
  EyeOff,
  FileText,
  Inbox,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import { supabase, slugify, formatDateTr, type Lead, type Post } from '@/lib/supabase';

const INSURANCE_LABELS: Record<string, string> = {
  trafik: 'Trafik',
  kasko: 'Kasko',
  dask: 'DASK',
  saglik: 'Sağlık',
  konut: 'Konut',
};

type Draft = {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published: boolean;
};

const EMPTY_DRAFT: Draft = { title: '', excerpt: '', content: '', cover_image: '', published: true };

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (err) setError('E-posta veya şifre hatalı.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-5">
        <div className="text-center">
          <img src="/logo.png" alt="Ada Marmara Sigorta" className="h-20 w-20 mx-auto" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Yönetim Paneli</h1>
          <p className="text-sm text-gray-500 mt-1">Devam etmek için giriş yapın</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">E-posta</label>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Şifre</label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>
        {error && (
          <div className="rounded-lg bg-accent-50 border border-accent-200 px-4 py-3 text-sm text-accent-700">
            {error}
          </div>
        )}
        <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Giriş Yap'}
        </button>
        <a href="/" className="block text-center text-sm text-gray-500 hover:text-brand-700">
          Siteye dön
        </a>
      </form>
    </div>
  );
}

function PostEditor({
  draft,
  onCancel,
  onSaved,
}: {
  draft: Draft;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Draft>(draft);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabase) return;
    if (!form.title.trim() || !form.content.trim()) {
      setError('Başlık ve yazı içeriği zorunludur.');
      return;
    }
    setBusy(true);
    setError(null);
    const row = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim() || null,
      content: form.content.trim(),
      cover_image: form.cover_image.trim() || null,
      published: form.published,
      updated_at: new Date().toISOString(),
    };
    const { error: err } = form.id
      ? await supabase.from('posts').update(row).eq('id', form.id)
      : await supabase
          .from('posts')
          .insert({ ...row, slug: `${slugify(row.title) || 'yazi'}-${Date.now().toString(36)}` });
    setBusy(false);
    if (err) {
      setError('Kaydedilemedi: ' + err.message);
      return;
    }
    onSaved();
  };

  return (
    <form onSubmit={save} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{form.id ? 'Yazıyı Düzenle' : 'Yeni Yazı'}</h2>
        <button type="button" onClick={onCancel} className="p-2 text-gray-500 hover:text-gray-900" aria-label="Kapat">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Başlık *</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="input-field"
          placeholder="Örn: Trafik sigortası primlerinde yeni dönem"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Kısa özet</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          className="input-field min-h-[80px]"
          placeholder="Listede görünecek 1-2 cümlelik özet"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Yazı içeriği *</label>
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="input-field min-h-[320px] font-normal leading-relaxed"
          placeholder={'Paragraflar arasında bir boş satır bırakın.\n\n## ile başlayan satır ara başlık olur.'}
        />
        <p className="mt-1.5 text-xs text-gray-500">
          İpucu: Paragrafları boş satırla ayırın. Ara başlık için satırın başına <b>## </b> yazın.
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Kapak görseli bağlantısı (isteğe bağlı)</label>
        <input
          value={form.cover_image}
          onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
          className="input-field"
          placeholder="https://..."
        />
      </div>
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.checked })}
          className="h-5 w-5 rounded border-gray-300 text-brand-600"
        />
        <span className="text-sm font-medium text-gray-700">Sitede yayınla (işaretli değilse taslak olarak kalır)</span>
      </label>
      {error && (
        <div className="rounded-lg bg-accent-50 border border-accent-200 px-4 py-3 text-sm text-accent-700">{error}</div>
      )}
      <div className="flex gap-3">
        <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          Kaydet
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Vazgeç
        </button>
      </div>
    </form>
  );
}

function PostsTab() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error: err } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (err) setError('Yazılar yüklenemedi: ' + err.message);
    else setPosts((data as Post[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (post: Post) => {
    if (!supabase) return;
    if (!window.confirm(`"${post.title}" yazısı silinsin mi?`)) return;
    const { error: err } = await supabase.from('posts').delete().eq('id', post.id);
    if (err) setError('Silinemedi: ' + err.message);
    else load();
  };

  const togglePublish = async (post: Post) => {
    if (!supabase) return;
    const { error: err } = await supabase
      .from('posts')
      .update({ published: !post.published, updated_at: new Date().toISOString() })
      .eq('id', post.id);
    if (err) setError('Güncellenemedi: ' + err.message);
    else load();
  };

  if (editing) {
    return (
      <PostEditor
        draft={editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          load();
        }}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          Buraya eklediğiniz yazılar sitede <b>Sigorta Aktüel</b> sayfasında görünür. En yeni yazı en üstte çıkar.
        </p>
        <button onClick={() => setEditing({ ...EMPTY_DRAFT })} className="btn-primary py-2.5">
          <Plus className="h-5 w-5" />
          Yeni Yazı
        </button>
      </div>
      {error && (
        <div className="rounded-lg bg-accent-50 border border-accent-200 px-4 py-3 text-sm text-accent-700">{error}</div>
      )}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
          Henüz yazı yok. “Yeni Yazı” ile ilk yazınızı ekleyin.
        </div>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center gap-3"
            >
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {post.published ? 'Yayında' : 'Taslak'}
                  </span>
                  <span className="text-xs text-gray-500">{formatDateTr(post.created_at)}</span>
                </div>
                <div className="mt-1 font-semibold text-gray-900">{post.title}</div>
              </div>
              <div className="flex items-center gap-1">
                {post.published && (
                  <a
                    href={`/sigorta-aktuel/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-brand-700"
                    title="Sitede gör"
                  >
                    <FileText className="h-5 w-5" />
                  </a>
                )}
                <button
                  onClick={() => togglePublish(post)}
                  className="p-2 text-gray-500 hover:text-brand-700"
                  title={post.published ? 'Yayından kaldır' : 'Yayınla'}
                >
                  {post.published ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <button
                  onClick={() =>
                    setEditing({
                      id: post.id,
                      title: post.title,
                      excerpt: post.excerpt ?? '',
                      content: post.content,
                      cover_image: post.cover_image ?? '',
                      published: post.published,
                    })
                  }
                  className="p-2 text-gray-500 hover:text-brand-700"
                  title="Düzenle"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button onClick={() => remove(post)} className="p-2 text-gray-500 hover:text-accent-600" title="Sil">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const LEAD_STATUSES: { id: string; label: string; cls: string }[] = [
  { id: 'yeni', label: 'Yeni', cls: 'bg-blue-100 text-blue-700' },
  { id: 'arandi', label: 'Arandı', cls: 'bg-amber-100 text-amber-700' },
  { id: 'teklif', label: 'Teklif verildi', cls: 'bg-purple-100 text-purple-700' },
  { id: 'police', label: 'Poliçe kesildi', cls: 'bg-green-100 text-green-700' },
  { id: 'olumsuz', label: 'Olumsuz', cls: 'bg-gray-200 text-gray-600' },
];

function statusInfo(id: string) {
  return LEAD_STATUSES.find((s) => s.id === id) ?? LEAD_STATUSES[0];
}

type LeadDraft = {
  id: string;
  insurance_type: string;
  first_name: string;
  last_name: string;
  phone: string;
  tc_kimlik_no: string;
  plaka: string;
  il: string;
  ilce: string;
  mahalle: string;
  status: string;
};

function LeadEditor({ lead, onCancel, onSaved }: { lead: Lead; onCancel: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<LeadDraft>({
    id: lead.id,
    insurance_type: lead.insurance_type,
    first_name: lead.first_name,
    last_name: lead.last_name,
    phone: lead.phone,
    tc_kimlik_no: lead.tc_kimlik_no ?? '',
    plaka: lead.plaka ?? '',
    il: lead.il ?? '',
    ilce: lead.ilce ?? '',
    mahalle: lead.mahalle ?? '',
    status: lead.status || 'yeni',
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const field = (key: keyof LeadDraft, label: string) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="input-field" />
    </div>
  );

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabase) return;
    if (!form.first_name.trim() || !form.last_name.trim() || !form.phone.trim()) {
      setError('Ad, soyad ve telefon boş olamaz.');
      return;
    }
    setBusy(true);
    setError(null);
    const opt = (v: string) => v.trim() || null;
    const { error: err } = await supabase
      .from('leads')
      .update({
        insurance_type: form.insurance_type,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        phone: form.phone.trim(),
        tc_kimlik_no: opt(form.tc_kimlik_no),
        plaka: opt(form.plaka),
        il: opt(form.il),
        ilce: opt(form.ilce),
        mahalle: opt(form.mahalle),
        status: form.status,
      })
      .eq('id', form.id);
    setBusy(false);
    if (err) {
      setError('Kaydedilemedi: ' + err.message);
      return;
    }
    onSaved();
  };

  return (
    <form onSubmit={save} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Talebi Düzenle</h2>
        <button type="button" onClick={onCancel} className="p-2 text-gray-500 hover:text-gray-900" aria-label="Kapat">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Durum</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
            {LEAD_STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Sigorta türü</label>
          <select
            value={form.insurance_type}
            onChange={(e) => setForm({ ...form, insurance_type: e.target.value })}
            className="input-field"
          >
            {Object.entries(INSURANCE_LABELS).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </div>
        {field('first_name', 'Ad')}
        {field('last_name', 'Soyad')}
        {field('phone', 'Telefon')}
        {field('tc_kimlik_no', 'TC Kimlik No')}
        {field('plaka', 'Plaka')}
        {field('il', 'İl')}
        {field('ilce', 'İlçe')}
        {field('mahalle', 'Mahalle')}
      </div>
      {error && (
        <div className="rounded-lg bg-accent-50 border border-accent-200 px-4 py-3 text-sm text-accent-700">{error}</div>
      )}
      <div className="flex gap-3">
        <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          Kaydet
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Vazgeç
        </button>
      </div>
    </form>
  );
}

function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('hepsi');
  const [editing, setEditing] = useState<Lead | null>(null);

  const load = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error: err } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);
    if (err) setError('Talepler yüklenemedi: ' + err.message);
    else setLeads((data as Lead[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (lead: Lead, status: string) => {
    if (!supabase) return;
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    const { error: err } = await supabase.from('leads').update({ status }).eq('id', lead.id);
    if (err) {
      setError('Durum güncellenemedi: ' + err.message);
      load();
    }
  };

  const remove = async (lead: Lead) => {
    if (!supabase) return;
    if (!window.confirm(`${lead.first_name} ${lead.last_name} talebi kalıcı olarak silinsin mi?`)) return;
    const { error: err } = await supabase.from('leads').delete().eq('id', lead.id);
    if (err) setError('Silinemedi: ' + err.message);
    else setLeads((prev) => prev.filter((l) => l.id !== lead.id));
  };

  if (editing) {
    return (
      <LeadEditor
        lead={editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          load();
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
      </div>
    );
  }

  const counts = LEAD_STATUSES.map((s) => ({ ...s, count: leads.filter((l) => (l.status || 'yeni') === s.id).length }));
  const visible = filter === 'hepsi' ? leads : leads.filter((l) => (l.status || 'yeni') === filter);

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg bg-accent-50 border border-accent-200 px-4 py-3 text-sm text-accent-700">{error}</div>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('hepsi')}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold border transition-colors ${
            filter === 'hepsi' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
          }`}
        >
          Hepsi ({leads.length})
        </button>
        {counts.map((s) => (
          <button
            key={s.id}
            onClick={() => setFilter(s.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold border transition-colors ${
              filter === s.id ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
          >
            {s.label} ({s.count})
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
          {leads.length === 0 ? 'Henüz talep yok.' : 'Bu durumda talep yok.'}
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((l) => {
            const waNumber = l.phone.replace(/\D/g, '');
            const st = statusInfo(l.status || 'yeni');
            const details = [
              l.plaka && `Plaka: ${l.plaka}`,
              l.tc_kimlik_no && `TC: ${l.tc_kimlik_no}`,
              [l.il, l.ilce, l.mahalle].filter(Boolean).join(' / '),
            ]
              .filter(Boolean)
              .join(' · ');
            return (
              <li key={l.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="flex-1 min-w-[220px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${st.cls}`}>{st.label}</span>
                      <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                        {INSURANCE_LABELS[l.insurance_type] ?? l.insurance_type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(l.created_at).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </div>
                    <div className="mt-1.5 font-semibold text-gray-900">
                      {l.first_name} {l.last_name}
                    </div>
                    <div className="mt-0.5 text-sm">
                      <a href={`tel:${l.phone}`} className="text-brand-700 font-medium">
                        {l.phone}
                      </a>
                      <a
                        href={`https://wa.me/${waNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 text-green-600 font-medium"
                      >
                        WhatsApp
                      </a>
                    </div>
                    {details && <div className="mt-1 text-sm text-gray-600">{details}</div>}
                  </div>
                  <div className="flex items-center gap-1">
                    <select
                      value={l.status || 'yeni'}
                      onChange={(e) => changeStatus(l, e.target.value)}
                      className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm text-gray-700"
                      aria-label="Durumu değiştir"
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => setEditing(l)} className="p-2 text-gray-500 hover:text-brand-700" title="Düzenle">
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button onClick={() => remove(l)} className="p-2 text-gray-500 hover:text-accent-600" title="Sil">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}


export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<'posts' | 'leads'>('posts');

  useEffect(() => {
    document.title = 'Yönetim Paneli | Ada Marmara Sigorta';
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center text-gray-600">
        Veritabanı bağlantısı yapılandırılmamış (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).
      </div>
    );
  }
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }
  if (!session) return <LoginForm />;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="h-10 w-10" />
            <div>
              <div className="font-bold text-gray-900">Yönetim Paneli</div>
              <div className="text-xs text-gray-500">{session.user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="hidden sm:inline text-sm text-gray-600 hover:text-brand-700 px-3">
              Siteyi aç
            </a>
            <button
              onClick={() => supabase?.auth.signOut()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />
              Çıkış
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex gap-1">
          {[
            { id: 'posts' as const, label: 'Sigorta Aktüel Yazıları', icon: FileText },
            { id: 'leads' as const, label: 'Teklif Talepleri', icon: Inbox },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                tab === t.id ? 'border-brand-600 text-brand-700' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8">{tab === 'posts' ? <PostsTab /> : <LeadsTab />}</main>
    </div>
  );
}
