import { IS_SUPABASE_CONFIGURED, SUPABASE_URL, SUPABASE_ANON } from '../config.js';

let supabase = null;

async function getClient() {
  if (supabase) return supabase;
  if (!IS_SUPABASE_CONFIGURED) return null;

  const { createClient } = await import(
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
  );
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
  return supabase;
}

export async function trackClick(program) {
  const client = await getClient();
  if (!client) return;

  await client.from('clicks').insert({
    program_id:   program.id,
    program_name: program.name,
    category:     program.category,
    referrer:     document.referrer || 'direct',
    page:         location.pathname,
  });
}
