import { createBrowserClient } from "@supabase/ssr"

// Browser client — safe to use in client components. RLS enforces access.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
