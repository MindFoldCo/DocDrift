import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Pricing } from "@/components/pricing"

export const metadata: Metadata = {
  title: "Pricing — DocDrift",
  description: "Simple, per-seat pricing. 14-day free trial.",
}

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Pricing heading="Pricing that scales with your team." />
      </div>

      {/* FAQ */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-12 divide-y divide-border">
            {[
              {
                q: "How does the free trial work?",
                a: "Every paid plan starts with a 14-day free trial. You won't be charged until the trial ends, and you can cancel anytime before then at no cost.",
              },
              {
                q: "What counts as a user?",
                a: "Anyone on your team with a DocDrift seat who can review and approve doc updates. Read-only viewers are free.",
              },
              {
                q: "Can I change plans later?",
                a: "Yes — upgrade or downgrade at any time. Changes are prorated automatically on your next invoice.",
              },
              {
                q: "Do you offer annual billing?",
                a: "Yes. Annual plans save two months versus monthly. Reach out and we'll set it up for your team.",
              },
            ].map((item) => (
              <div key={item.q} className="py-6">
                <h3 className="font-display text-lg font-medium text-foreground">{item.q}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
