import { createClient } from "@supabase/supabase-js"

// Admin client — uses the service role key and BYPASSES row-level security.
// Only ever import this in trusted server-side code (seed scripts, cron jobs,
// webhook handlers). Never in a client component or anything reachable by the browser.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}
