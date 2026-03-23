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
    const missing = []
    if (!supabaseUrl)
      missing.push('NEXT_PUBLIC_SUPABASE_URL is missing or empty')
    if (!supabaseKey) {
      missing.push(
        'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or empty',
      )
    }

    const errorMsg =
      'Supabase Configuration Error:\n' +
      missing.join('\n') +
      '\n\nMake sure these environment variables are set in:\n' +
      '1. Local: .env.local file\n' +
      '2. Vercel: Settings > Environment Variables\n' +
      '3. After adding to Vercel, redeploy your project\n\n' +
      'Check: https://supabase.com/dashboard/project/_/settings/api'

    console.error(errorMsg)
    return null
  }

  try {
    console.log('Initializing Supabase with URL:', supabaseUrl)
    supabaseInstance = createClient(supabaseUrl, supabaseKey)
    return supabaseInstance
  } catch (error) {
    console.error('Failed to initialize Supabase:', error)
    return null
  }
}

// Initialize on module load
initSupabase()
