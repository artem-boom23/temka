// Supabase credentials — get them at https://supabase.com/dashboard/project/_/settings/api
// After creating a project, paste your values here:
export const SUPABASE_URL  = 'YOUR_SUPABASE_URL';   // e.g. https://xxxx.supabase.co
export const SUPABASE_ANON = 'YOUR_SUPABASE_ANON_KEY';

export const IS_SUPABASE_CONFIGURED =
  SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON !== 'YOUR_SUPABASE_ANON_KEY';
