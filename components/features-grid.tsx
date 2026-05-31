import { Eye, Sparkles, Users, VolumeX, FileText, MessageSquare } from "lucide-react"
import { Reveal } from "@/components/reveal"

const features = [
  {
    icon: Eye,
    title: "Source-aware monitoring",
    description:
      "We watch the PRs, threads, and tickets that actually make docs stale — not just edit timestamps.",
    wide: true,
  },
  {
    icon: Sparkles,
    title: "AI-drafted updates",
    description: "Don't just get told what's wrong. Get the rewritten paragraph, ready to merge.",
  },
  {
    icon: Users,
    title: "Human-in-the-loop",
    description: "Every change is a suggestion until a person approves it. Your docs stay yours.",
  },
  {
    icon: VolumeX,
    title: "Noise control",
    description:
      "Aggressive false-positive filtering means DocDrift only pings you when it actually matters.",
  },
  {
    icon: FileText,
    title: "Works where you write",
    description: "Native support for Notion, Confluence, and Markdown-in-repo.",
  },
  {
    icon: MessageSquare,
    title: "Slack-native alerts",
    description: "Stale-doc notifications land where your team already lives.",
    wide: true,
  },
]

export function FeaturesGrid() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            Features
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Everything you need to kill doc rot.
          </h2>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal
              key={feature.title}
              delay={(i % 3) * 90}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 ${
                feature.wide ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary/20">
                <feature.icon className="h-5 w-5 text-primary" strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{feature.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
