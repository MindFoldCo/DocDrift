import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Status — DocDrift",
  description: "DocDrift system status and uptime.",
}

const systems = [
  "API",
  "Dashboard",
  "GitHub & GitLab monitoring",
  "Slack notifications",
  "Notion & Confluence sync",
]

export default function StatusPage() {
  return (
    <PageShell eyebrow="Status" title="System status.">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/25">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </span>
          <div>
            <p className="font-display font-semibold text-foreground">All systems operational</p>
            <p className="text-sm text-muted-foreground">Updated just now</p>
          </div>
        </div>
        <ul className="mt-4 space-y-3">
          {systems.map((s) => (
            <li key={s} className="flex items-center justify-between">
              <span className="text-sm text-secondary-foreground">{s}</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Operational
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Seeing a problem we&apos;re not?{" "}
        <a href="/contact" className="text-primary hover:underline">
          Report an issue
        </a>
        .
      </p>
    </PageShell>
  )
}
