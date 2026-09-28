/*
# Create leads table for insurance quote requests

1. New Tables
- `leads`
  - `id` (uuid, primary key, auto-generated)
  - `insurance_type` (text, not null) — the type of insurance requested (trafik, kasko, dask, saglik, konut)
  - `first_name` (text, not null) — customer's first name
  - `last_name` (text, not null) — customer's last name
  - `phone` (text, not null) — customer's phone number in Turkish format
  - `tc_kimlik_no` (text, nullable) — Turkish ID number, required for trafik/kasko
  - `plaka` (text, nullable) — license plate, required for trafik/kasko
  - `il` (text, nullable) — city, required for DASK
  - `ilce` (text, nullable) — district, required for DASK
  - `mahalle` (text, nullable) — neighborhood, required for DASK
  - `status` (text, default 'yeni') — lead status for internal tracking
  - `created_at` (timestamptz, default now()) — when the lead was submitted
2. Security
- Enable RLS on `leads`.
- This is a no-auth public lead form, so allow anon + authenticated to INSERT only.
- No SELECT/UPDATE/DELETE for anon — leads are private to the agency owner.
- INSERT is open (anyone can submit a quote request); all other operations are denied by default.
3. Notes
- The form on the website writes to this table via the anon key.
- Only the agency owner (via Supabase dashboard / authenticated admin) can read leads.
- No user accounts are needed — this is a public lead capture form.
*/

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

-- Allow anyone (anon) to insert new leads — this is a public quote form
DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads"
ON leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies for anon — leads are private
-- Authenticated users (agency admin) can read all leads
DROP POLICY IF EXISTS "auth_select_leads" ON leads;
CREATE POLICY "auth_select_leads"
ON leads FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "auth_update_leads" ON leads;
CREATE POLICY "auth_update_leads"
ON leads FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_leads" ON leads;
CREATE POLICY "auth_delete_leads"
ON leads FOR DELETE
TO authenticated
USING (true);

-- Index for sorting leads by creation date
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
