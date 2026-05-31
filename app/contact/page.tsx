import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact — DocDrift",
  description: "Talk to the DocDrift team about Enterprise, demos, or anything else.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32">
        <div className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent)]" />
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Contact
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Let&apos;s talk.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Whether you want a demo, have questions about Enterprise, or need help getting set up —
              we usually reply within a few hours.
            </p>
            <dl className="mt-10 space-y-6">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Sales
                </dt>
                <dd className="mt-1 text-foreground">sales@docdrift.example</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Support
                </dt>
                <dd className="mt-1 text-foreground">support@docdrift.example</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-6 backdrop-blur ring-hairline sm:p-8">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first" className="mb-1.5 block text-sm font-medium">First name</label>
                  <input id="first" className="w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25" />
                </div>
                <div>
                  <label htmlFor="last" className="mb-1.5 block text-sm font-medium">Last name</label>
                  <input id="last" className="w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25" />
                </div>
              </div>
              <div>
                <label htmlFor="cemail" className="mb-1.5 block text-sm font-medium">Work email</label>
                <input id="cemail" type="email" placeholder="you@company.com" className="w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25" />
              </div>
              <div>
                <label htmlFor="msg" className="mb-1.5 block text-sm font-medium">How can we help?</label>
                <textarea id="msg" rows={4} className="w-full resize-none rounded-xl border border-border bg-input/60 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25" />
              </div>
              <Button className="w-full bg-primary py-5 font-semibold text-primary-foreground shadow-[0_0_28px_-8px] shadow-primary/60 hover:bg-primary/90">
                Send message
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                This is a demo form — wire it to your CRM or email provider to go live.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
