import { createClient } from "@/lib/supabase/server"
import { AlertCard } from "@/components/dashboard/alert-card"
import { FileCheck2, AlertTriangle, GitBranch } from "lucide-react"
import type { Alert } from "@/lib/types"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  const [{ data: alerts }, { count: repoCount }] = await Promise.all([
    supabase.from("alerts").select("*").order("created_at", { ascending: false }),
    supabase.from("repos").select("*", { count: "exact", head: true }),
  ])

  const all = (alerts ?? []) as Alert[]
  const pending = all.filter((a) => a.status === "pending")
  const resolved = all.filter((a) => a.status !== "pending")
  const approved = all.filter((a) => a.status === "approved").length

  const stats = [
    { label: "Pending review", value: pending.length, icon: AlertTriangle, accent: "text-signal" },
    { label: "Fixes approved", value: approved, icon: FileCheck2, accent: "text-primary" },
    { label: "Repos connected", value: repoCount ?? 0, icon: GitBranch, accent: "text-foreground" },
  ]

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Alerts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Stale docs we&apos;ve caught, with drafted fixes ready to review.
          </p>
        </div>
      </div>

      {/* stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.accent}`} />
            </div>
            <div className="mt-2 font-display text-3xl font-semibold">{s.value}</div>
          </div>
        ))}
      </div>

      {/* pending feed */}
      <section className="mt-10">
        <h2 className="font-display text-lg font-semibold">Needs review</h2>
        <div className="mt-4 space-y-4">
          {pending.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
              <FileCheck2 className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-3 font-medium text-foreground">You&apos;re all caught up.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                No stale docs right now. New alerts will appear here.{" "}
                {(repoCount ?? 0) === 0 && (
                  <>
                    Start by{" "}
                    <Link href="/app/repos" className="text-primary hover:underline">
                      connecting a repo
                    </Link>
                    .
                  </>
                )}
              </p>
            </div>
          ) : (
            pending.map((a) => <AlertCard key={a.id} alert={a} />)
          )}
        </div>
      </section>

      {/* resolved history */}
      {resolved.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-muted-foreground">History</h2>
          <div className="mt-4 space-y-4 opacity-80">
            {resolved.map((a) => (
              <AlertCard key={a.id} alert={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
