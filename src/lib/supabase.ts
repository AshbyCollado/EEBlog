import { createClient } from '@supabase/supabase-js';

// VITE_ is a special prefix that Astro uses to expose environment variables to the browser.
// We'll also use these on the server.
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


