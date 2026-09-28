import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type InsuranceType = 'trafik' | 'kasko' | 'dask' | 'saglik' | 'konut';

export interface LeadInsert {
  insurance_type: InsuranceType;
  first_name: string;
  last_name: string;
  phone: string;
  tc_kimlik_no?: string;
  plaka?: string;
  il?: string;
  ilce?: string;
  mahalle?: string;
}
