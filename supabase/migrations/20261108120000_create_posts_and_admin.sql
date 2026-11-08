/*
  Sigorta Aktüel yazıları + yönetici yetkisi

  - posts: Sigorta Aktüel sayfasındaki yazılar
  - admin_emails: yazı ekleyip silebilecek ve talepleri görebilecek e-postalar
  - Ziyaretçiler sadece yayındaki yazıları okuyabilir.
  - Sadece admin_emails içindeki kullanıcılar yazı ekler/düzenler/siler ve talepleri görür.

  Bu dosyanın tamamını Supabase > SQL Editor'e yapıştırıp "Run" deyin.
  En alttaki e-posta adresini yöneticinin giriş e-postasıyla değiştirin.
*/

CREATE TABLE IF NOT EXISTS admin_emails (
  email text PRIMARY KEY
);
ALTER TABLE admin_emails ENABLE ROW LEVEL SECURITY;
-- admin_emails tablosuna dışarıdan hiç erişim yok (politika tanımlanmadı).

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_emails
    WHERE lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  cover_image text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts (created_at DESC);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_posts" ON posts;
CREATE POLICY "public_read_published_posts"
ON posts FOR SELECT
TO anon, authenticated
USING (published = true OR is_admin());

DROP POLICY IF EXISTS "admin_insert_posts" ON posts;
CREATE POLICY "admin_insert_posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (is_admin());

DROP POLICY IF EXISTS "admin_update_posts" ON posts;
CREATE POLICY "admin_update_posts"
ON posts FOR UPDATE
TO authenticated
USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "admin_delete_posts" ON posts;
CREATE POLICY "admin_delete_posts"
ON posts FOR DELETE
TO authenticated
USING (is_admin());

-- Talepler (leads) tablosu (daha önce oluşturulduysa dokunmaz)
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  insurance_type text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  tc_kimlik_no text,
  plaka text,
  il text,
  ilce text,
  mahalle text,
  status text NOT NULL DEFAULT 'yeni',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads"
ON leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Talepler (leads): sadece yönetici görebilsin / düzenleyebilsin
DROP POLICY IF EXISTS "auth_select_leads" ON leads;
CREATE POLICY "auth_select_leads"
ON leads FOR SELECT
TO authenticated
USING (is_admin());

DROP POLICY IF EXISTS "auth_update_leads" ON leads;
CREATE POLICY "auth_update_leads"
ON leads FOR UPDATE
TO authenticated
USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "auth_delete_leads" ON leads;
CREATE POLICY "auth_delete_leads"
ON leads FOR DELETE
TO authenticated
USING (is_admin());

-- YÖNETİCİ E-POSTASI (gerekirse değiştirin, birden fazla satır ekleyebilirsiniz)
INSERT INTO admin_emails (email) VALUES ('adamarmarasigorta@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- Kapak görselleri için depolama alanı (admin panelinden yükleme)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('post-images', 'post-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

drop policy if exists "post_images_public_read" on storage.objects;
create policy "post_images_public_read" on storage.objects
for select to anon, authenticated using (bucket_id = 'post-images');

drop policy if exists "post_images_admin_insert" on storage.objects;
create policy "post_images_admin_insert" on storage.objects
for insert to authenticated with check (bucket_id = 'post-images' and public.is_admin());

drop policy if exists "post_images_admin_delete" on storage.objects;
create policy "post_images_admin_delete" on storage.objects
for delete to authenticated using (bucket_id = 'post-images' and public.is_admin());
