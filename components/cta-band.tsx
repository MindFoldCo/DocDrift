import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function CTABand() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-16 sm:px-12 lg:px-20 lg:py-20">
          <div className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_70%_90%_at_50%_50%,#000,transparent)]" />
          <div className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Stop shipping stale docs.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join the teams that trust their documentation again.
            </p>

            <form className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-3 sm:flex-row">
              <div className="w-full flex-1">
                <label htmlFor="cta-email" className="sr-only">
                  Work email
                </label>
                <input
                  id="cta-email"
                  type="email"
                  name="email"
                  placeholder="Enter your work email"
                  className="w-full rounded-xl border border-border bg-input/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                />
              </div>
              <Button
                size="lg"
                className="group w-full shrink-0 bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-[0_0_30px_-8px] shadow-primary/60 hover:bg-primary/90 sm:w-auto"
              >
                Start free trial
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </form>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              Set up in 2 minutes
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
