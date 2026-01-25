import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * IMPORTANT:
 * In Lovable, secrets added via the Secrets UI may not be exposed to the browser runtime.
 * If these values are missing at runtime, we must not initialize the client (it throws).
 */
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
