import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, GitPullRequest } from "lucide-react"

function StaleCard() {
  return (
    <div className="relative w-full max-w-xl">
      {/* layered glow */}
      <div className="absolute -inset-x-10 -inset-y-8 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />
      <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-b from-primary/25 to-transparent blur-md" />

      <div className="overflow-hidden rounded-2xl border border-border bg-card/90 shadow-2xl ring-hairline backdrop-blur">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border/70 bg-secondary/40 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">docdrift · alerts</span>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-2 w-2 rounded-full bg-signal" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            live
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-signal/15 ring-1 ring-signal/25">
              <GitPullRequest className="h-[18px] w-[18px] text-signal" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-signal">
                  Stale doc detected
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">· 2 min ago</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                <span className="font-medium">Auth Setup Guide</span> references a token that was
                renamed in{" "}
                <span className="font-mono text-primary">PR&nbsp;#2841</span>.
              </p>
            </div>
          </div>

          {/* mini diff */}
          <div className="mt-4 overflow-hidden rounded-lg border border-border/70 bg-background/60 font-mono text-xs">
            <div className="flex border-b border-border/50">
              <span className="w-8 shrink-0 border-r border-border/50 bg-destructive/10 py-1.5 text-center text-muted-foreground">-</span>
              <code className="flex-1 px-3 py-1.5 text-destructive/90">
                export AUTH_TOKEN=&lt;your-token&gt;
              </code>
            </div>
            <div className="flex">
              <span className="w-8 shrink-0 border-r border-border/50 bg-primary/10 py-1.5 text-center text-primary">+</span>
              <code className="flex-1 px-3 py-1.5 text-primary">
                export API_KEY=&lt;your-key&gt;
              </code>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2.5">
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Approve fix
            </button>
            <button className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
              View doc
            </button>
            <span className="ml-auto font-mono text-[11px] text-muted-foreground">
              confidence 96%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const logos = ["Vercel", "Linear", "Stripe", "Ramp", "Retool", "Notion"]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
      {/* atmosphere */}
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent)]" />
      <div className="grain" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="animate-rise mt-7 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            <span className="text-gradient">Your docs are</span>
            <br />
            <span className="relative inline-block text-primary">
              lying to you.
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 300 10" fill="none" preserveAspectRatio="none">
                <path d="M2 7C60 3 120 3 180 5s90 2 118 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
              </svg>
            </span>
          </h1>

          <p
            className="animate-rise mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            Documentation rots the moment code ships. DocDrift watches your repos, Slack, and
            tickets, catches stale docs before they mislead your team, and drafts the fix for you.
          </p>

          <div
            className="animate-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Button
              asChild
              size="lg"
              className="group w-full bg-primary px-7 py-6 text-base font-semibold text-primary-foreground shadow-[0_0_36px_-8px] shadow-primary/60 hover:bg-primary/90 sm:w-auto"
            >
              <Link href="/pricing">
                Start free trial
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-border bg-card/40 px-7 py-6 text-base font-medium text-foreground backdrop-blur hover:bg-secondary sm:w-auto"
            >
              <Link href="/contact">Book a demo</Link>
            </Button>
          </div>
        </div>

        <div className="animate-fade mt-16 flex justify-center lg:mt-20" style={{ animationDelay: "360ms" }}>
          <div className="animate-float">
            <StaleCard />
          </div>
        </div>

        {/* logo cloud */}
        <div className="animate-fade mt-20" style={{ animationDelay: "480ms" }}>
          <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Trusted by engineering teams at
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((name) => (
              <span
                key={name}
                className="font-display text-lg font-semibold text-muted-foreground/55 transition-colors hover:text-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
