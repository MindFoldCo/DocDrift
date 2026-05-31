import { Link2, Network, CheckCircle2 } from "lucide-react"
import { Reveal } from "@/components/reveal"

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Connect your stack.",
    description:
      "Link GitHub or GitLab, your Slack workspace, and your docs in Notion or Confluence. Two minutes, no config files.",
    aside: ["github.com/acme/api", "slack · #engineering", "notion · Eng Wiki"],
  },
  {
    number: "02",
    icon: Network,
    title: "We map the dependencies.",
    description:
      "DocDrift learns which docs describe which code, configs, and processes — building the connections your wiki never had.",
    aside: ["auth.ts → Auth Setup Guide", "deploy.yml → Release Runbook", "env.example → Onboarding"],
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Get fixes, not alerts.",
    description:
      "When something changes, DocDrift drafts the exact edit and routes it to a human for one-click approval. Nothing ships without your say-so.",
    aside: ["Draft ready · 96%", "Approve → merged", "Doc back in sync"],
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden border-y border-border py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-secondary/20" />
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-40" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            How it works
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Set it up once. Stay current forever.
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* vertical spine */}
          <div className="absolute left-[27px] top-4 bottom-4 hidden w-px bg-gradient-to-b from-primary/50 via-border to-transparent sm:block" />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 100} className="relative sm:pl-20">
                {/* node */}
                <div className="absolute left-0 top-0 hidden h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card shadow-lg ring-hairline sm:flex">
                  <step.icon className="h-6 w-6 text-primary" strokeWidth={1.9} />
                </div>

                <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur transition-colors duration-300 hover:border-primary/30 sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-md">
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        Step {step.number}
                      </span>
                      <h3 className="mt-2 font-display text-xl font-semibold text-foreground sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>

                    <div className="shrink-0 space-y-1.5 rounded-xl border border-border/70 bg-background/50 p-3 font-mono text-xs text-muted-foreground sm:min-w-[220px]">
                      {step.aside.map((line) => (
                        <div key={line} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-primary/60" />
                          <span className="truncate">{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
