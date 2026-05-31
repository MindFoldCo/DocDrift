import { FileWarning, ShieldAlert, TrendingDown } from "lucide-react"
import { Reveal } from "@/components/reveal"

const problems = [
  {
    num: "01",
    icon: FileWarning,
    title: "Docs go stale.",
    description:
      "Code ships, configs change, decisions happen in Slack. Nobody circles back to update the wiki.",
  },
  {
    num: "02",
    icon: ShieldAlert,
    title: "Trust erodes.",
    description:
      "Once a doc burns someone with wrong info, they stop believing any of them.",
  },
  {
    num: "03",
    icon: TrendingDown,
    title: "Everything decays.",
    description:
      "People stop reading the docs, so they stop maintaining them. Onboarding takes weeks and the same questions get asked forever.",
  },
]

export function ProblemSection() {
  return (
    <section id="product" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-end gap-x-12 gap-y-6 lg:grid-cols-2">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              The problem
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Good docs don&apos;t stay good.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg leading-relaxed text-muted-foreground lg:pb-2">
              Every engineering org runs the same death spiral. It starts quietly — one outdated
              line — and ends with a wiki nobody trusts.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-3">
          {problems.map((problem, i) => (
            <Reveal
              key={problem.title}
              delay={i * 120}
              className="group relative bg-card p-8 transition-colors duration-300 hover:bg-secondary/40 lg:p-10"
            >
              <span className="font-mono text-sm font-medium text-muted-foreground/50">
                {problem.num}
              </span>
              <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary ring-1 ring-border transition-all duration-300 group-hover:ring-primary/40">
                <problem.icon className="h-5 w-5 text-primary" strokeWidth={2} />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                {problem.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{problem.description}</p>
              {i < problems.length - 1 && (
                <span className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 text-2xl text-border lg:block">
                  →
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
