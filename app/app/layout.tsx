import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/dashboard/sidebar"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Middleware already gates this, but double-check for safety.
  if (!user) redirect("/login")

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar email={user.email ?? ""} />
      </div>

      <div className="flex flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3 lg:hidden">
          <span className="font-display text-lg font-semibold">
            Doc<span className="text-primary">Drift</span>
          </span>
          <span className="truncate text-xs text-muted-foreground">{user.email}</span>
        </div>

        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  )
}
