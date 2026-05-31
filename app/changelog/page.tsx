import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Changelog — DocDrift",
  description: "What's new in DocDrift.",
}

const entries = [
  {
    date: "May 2026",
    version: "v1.0",
    items: [
      "Public launch of DocDrift.",
      "GitHub and GitLab source monitoring.",
      "AI-drafted fixes with human-in-the-loop approval.",
      "Slack, Notion, and Confluence integrations.",
    ],
  },
  {
    date: "April 2026",
    version: "Beta",
    items: [
      "Private beta with early engineering teams.",
      "Dependency mapping between docs and source.",
      "False-positive filtering to cut alert noise.",
    ],
  },
]

export default function ChangelogPage() {
  return (
    <PageShell
      eyebrow="Changelog"
      title="What's new."
      subtitle="Product updates, improvements, and fixes."
    >
      <div className="space-y-10">
        {entries.map((e) => (
          <div key={e.version} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-semibold text-foreground">{e.date}</span>
              <span className="rounded-full bg-primary/15 px-2.5 py-0.5 font-mono text-xs text-primary ring-1 ring-primary/20">
                {e.version}
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {e.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
