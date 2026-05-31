import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BookOpen, Rocket, Plug, Webhook, ShieldCheck, Terminal, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Docs — DocDrift",
  description: "Everything you need to set up DocDrift and keep your documentation current.",
}

const sections = [
  {
    icon: Rocket,
    title: "Getting started",
    desc: "Connect your first repo and ship your first stale-doc fix in under five minutes.",
    items: ["Quickstart", "Core concepts", "Mapping docs to source"],
  },
  {
    icon: Plug,
    title: "Integrations",
    desc: "Wire up GitHub, GitLab, Slack, Notion, and Confluence.",
    items: ["GitHub & GitLab", "Slack alerts", "Notion & Confluence"],
  },
  {
    icon: Terminal,
    title: "CLI & API",
    desc: "Automate DocDrift from your pipeline or build on top of the REST API.",
    items: ["CLI reference", "REST API", "Authentication"],
  },
  {
    icon: Webhook,
    title: "Webhooks",
    desc: "Receive events when docs drift, drafts are ready, or fixes are approved.",
    items: ["Event types", "Payload reference", "Verifying signatures"],
  },
  {
    icon: ShieldCheck,
    title: "Security",
    desc: "How we handle your code, data residency, and access controls.",
    items: ["Data handling", "SSO & SCIM", "Compliance"],
  },
  {
    icon: BookOpen,
    title: "Guides",
    desc: "Patterns and playbooks for keeping a large doc set healthy.",
    items: ["Onboarding runbooks", "Reducing noise", "Team workflows"],
  },
]

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44">
        <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-50" />
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            Documentation
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            DocDrift docs
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Everything you need to connect your stack and keep your documentation in sync —
            ironically, kept current by DocDrift itself.
          </p>
          <div className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-muted-foreground backdrop-blur">
            <span className="font-mono">⌘K</span>
            <span>Search the docs…</span>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 ring-1 ring-primary/20">
                  <s.icon className="h-5 w-5 text-primary" strokeWidth={2} />
                </div>
                <h2 className="mt-5 font-display text-lg font-semibold text-foreground">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <ul className="mt-4 space-y-2">
                  {s.items.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="inline-flex items-center gap-1.5 text-sm text-secondary-foreground transition-colors hover:text-primary"
                      >
                        <ArrowRight className="h-3.5 w-3.5 text-primary/60" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-card/60 p-8 text-center">
            <p className="text-muted-foreground">
              Can&apos;t find what you need?{" "}
              <Link href="/contact" className="font-medium text-primary hover:underline">
                Contact support
              </Link>{" "}
              and we&apos;ll point you in the right direction.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
