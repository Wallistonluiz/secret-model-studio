import { createClient } from '@supabase/supabase-js';

// Supabase credentials (anon key is public/publishable - safe to include in code)
const supabaseUrl = 'https://exluhngzdhrmsjfheucn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4bHVobmd6ZGhybXNqZmhldWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzMjg5NDIsImV4cCI6MjA4NDkwNDk0Mn0.7TNHtLhR0JHy7eld4muJfbvLJZkDBflaMSmni6KPuGA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const isSupabaseConfigured = true;
