/**
 * Supabase Client Configuration
 * 
 * Single instance of Supabase client for the entire application
 * Uses environment variables for configuration
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        'Supabase environment variables not configured. ' +
        'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
    );
}

/**
 * Type-safe Supabase client instance
 * 
 * Usage:
 * ```typescript
 * import { supabase } from '@/lib/supabase';
 * 
 * const { data, error } = await supabase
 *   .from('company')
 *   .select('*')
 *   .eq('company_id', id);
 * ```
 */
export const supabase = createClient<Database>(
    supabaseUrl || '',
    supabaseAnonKey || ''
);
