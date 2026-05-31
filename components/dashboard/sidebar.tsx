"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, GitBranch, Settings, LogOut } from "lucide-react"
import { logout } from "@/app/auth/actions"

const nav = [
  { name: "Alerts", href: "/app", icon: LayoutDashboard, exact: true },
  { name: "Repositories", href: "/app/repos", icon: GitBranch },
  { name: "Settings", href: "/app/settings", icon: Settings },
]

export function Sidebar({ email }: { email: string }) {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-full flex-col border-r border-border bg-card/40 lg:w-64">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
            <path d="M14 4v5h5" />
            <path d="M8 13.5l2.5 2.5L16 11" />
          </svg>
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">
          Doc<span className="text-primary">Drift</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {nav.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/12 text-primary ring-1 ring-primary/20"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" strokeWidth={2} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-3">
        <div className="mb-2 truncate px-3 text-xs text-muted-foreground">{email}</div>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
          >
            <LogOut className="h-[18px] w-[18px]" strokeWidth={2} />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
