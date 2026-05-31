import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { Github, GitBranch, MessageSquare, FileText, BookOpen, Webhook } from "lucide-react"

export const metadata: Metadata = {
  title: "Integrations — DocDrift",
  description: "Connect DocDrift to the tools your team already uses.",
}

const integrations = [
  { icon: Github, name: "GitHub", desc: "Watch PRs, commits, and config changes across your repos." },
  { icon: GitBranch, name: "GitLab", desc: "Same source-aware monitoring for GitLab-hosted projects." },
  { icon: MessageSquare, name: "Slack", desc: "Get stale-doc alerts where your team already talks." },
  { icon: FileText, name: "Notion", desc: "Keep Notion wikis and runbooks in sync with your code." },
  { icon: BookOpen, name: "Confluence", desc: "Detect drift in Confluence spaces and draft fixes." },
  { icon: Webhook, name: "Webhooks & API", desc: "Build your own flows on top of DocDrift events." },
]

export default function IntegrationsPage() {
  return (
    <PageShell
      eyebrow="Integrations"
      title="Works where your team works."
      subtitle="DocDrift connects to your source, your chat, and your docs — no new tools to adopt."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {integrations.map((i) => (
          <div
            key={i.name}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 ring-1 ring-primary/20">
              <i.icon className="h-5 w-5 text-primary" strokeWidth={2} />
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold text-foreground">{i.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-muted-foreground">
        Need another integration?{" "}
        <a href="/contact" className="text-primary hover:underline">
          Let us know
        </a>
        .
      </p>
    </PageShell>
  )
}
