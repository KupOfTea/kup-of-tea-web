import { createClient } from '@supabase/supabase-js'

import { Database } from '../types/supabase'

const client = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

export default client
