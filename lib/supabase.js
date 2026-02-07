// Supabase client configuration
// This file creates a single Supabase client instance used throughout the app
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Lazy initialization - only create client when env vars are available
// Why: Allows builds to succeed without env vars (they're only needed at runtime)
let supabaseInstance = null

export const supabase = {
    from: (...args) => getClient().from(...args),
}

function getClient() {
    if (!supabaseInstance) {
        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('Supabase environment variables are not configured')
        }
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    }
    return supabaseInstance
}
