// Supabase client configuration
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabaseInstance: SupabaseClient | null = null

export const supabase = {
  get client() {
    if (!supabaseInstance) {
      throw new Error('Supabase not initialized')
    }
    return supabaseInstance
  },
  from(table: string) {
    if (!supabaseInstance) {
      throw new Error('Supabase not initialized')
    }
    return supabaseInstance.from(table)
  },
}

export function initSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      'Supabase environment variables not configured. Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY',
    )
    return null
  }

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseKey)
    return supabaseInstance
  } catch (error) {
    console.error('Failed to initialize Supabase:', error)
    return null
  }
}

// Initialize on module load
initSupabase()
