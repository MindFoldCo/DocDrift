import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "API — DocDrift",
  description: "Build on top of DocDrift with the REST API.",
}

export default function ApiPage() {
  return (
    <PageShell
      eyebrow="API"
      title="Build on DocDrift."
      subtitle="A REST API for managing repos, alerts, and approvals programmatically."
    >
      <div className="space-y-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border/70 bg-secondary/40 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">example request</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-muted-foreground">
            <code>{`curl https://api.docdrift.example/v1/alerts \\
  -H "Authorization: Bearer YOUR_API_KEY"

{
  "data": [
    {
      "id": "alert_1a2b3c",
      "doc_title": "Auth Setup Guide",
      "status": "pending",
      "confidence": 96
    }
  ]
}`}</code>
          </pre>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          The full API reference is on its way. It will cover authentication, listing and resolving
          alerts, managing connected repositories, and subscribing to webhook events. In the
          meantime, if you want early access or have a specific use case,{" "}
          <a href="/contact" className="text-primary hover:underline">
            get in touch
          </a>
          .
        </p>
      </div>
    </PageShell>
  )
}
