
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/supabase';

const SUPABASE_URL = "https://jyqekseqbbpgupuotuin.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cWVrc2VxYmJwZ3VwdW90dWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NDI0NTksImV4cCI6MjA2MTQxODQ1OX0.NTaNilqKyq2xjNXh0P6VdMJgGfvwtWzP0CgQEE1moYY";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
