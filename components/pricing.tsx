import { Check } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { CheckoutButton } from "@/components/checkout-button"
import { PLANS } from "@/lib/plans"

export function Pricing({
  heading = "Simple, per-seat pricing.",
  showEyebrow = true,
}: {
  heading?: string
  showEyebrow?: boolean
}) {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-[400px] bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          {showEyebrow && (
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Pricing</span>
          )}
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            14-day free trial.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {PLANS.map((tier, i) => (
            <Reveal
              key={tier.id}
              delay={i * 100}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.highlighted
                  ? "border-primary/50 bg-card accent-glow lg:-mt-4 lg:pb-12"
                  : "border-border bg-card/70"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-3.5 py-1 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30">
                    {tier.badge}
                  </span>
                </div>
              )}

              <h3 className="font-display text-lg font-semibold text-foreground">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold tracking-tight text-foreground">
                  {tier.price}
                </span>
                {tier.period && <span className="text-sm text-muted-foreground">{tier.period}</span>}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tier.description}</p>

              <div className="my-6 h-px bg-border" />

              <ul className="flex-1 space-y-3.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-secondary-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <CheckoutButton
                  planId={tier.id}
                  className={`w-full py-5 font-semibold ${
                    tier.highlighted
                      ? "bg-primary text-primary-foreground shadow-[0_0_28px_-8px] shadow-primary/60 hover:bg-primary/90"
                      : "border border-border bg-secondary text-secondary-foreground hover:bg-secondary/70"
                  }`}
                >
                  {tier.cta}
                </CheckoutButton>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Prices in USD. Cancel anytime. Questions?{" "}
          <a href="/contact" className="text-primary hover:underline">
            Talk to us
          </a>
          .
        </p>
      </div>
    </section>
  )
}
