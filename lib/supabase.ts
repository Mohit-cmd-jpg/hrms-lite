// Supabase client configuration
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

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
    }
}

export function initSupabase(): SupabaseClient | null {
    if (supabaseInstance) return supabaseInstance
    
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase environment variables not configured')
        return null
    }
    
    try {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
        return supabaseInstance
    } catch (error) {
        console.error('Failed to initialize Supabase:', error)
        return null
    }
}

// Initialize on module load
initSupabase()
