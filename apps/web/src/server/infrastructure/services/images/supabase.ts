import { createClient } from '@supabase/supabase-js'
import SupabaseClient from '@supabase/supabase-js/dist/module/SupabaseClient'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY

export class SupabaseClientFactory {
  private static client: SupabaseClient | null = null

  public static create(): SupabaseClient {
    if (this.client) return this.client

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error('Missing Supabase environment variables')
    }
    this.client = createClient(SUPABASE_URL, SUPABASE_KEY)
    return this.client
  }
}
