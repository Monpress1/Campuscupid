// src/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vfbjwkfurleatfdrabdg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmYmp3a2Z1cmxlYXRmZHJhYmRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MjAwNDIsImV4cCI6MjA3Mjk5NjA0Mn0.hguIfyynGc19tsSm9u66qy5IeUv40_mE8-JBjqnOQBE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
