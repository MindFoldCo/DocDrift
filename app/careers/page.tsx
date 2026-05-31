import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Careers — DocDrift",
  description: "Help us end doc rot for engineering teams everywhere.",
}

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Careers"
      title="Build the future of documentation with us."
      subtitle="We're a small team with a big mission. If that sounds like your kind of thing, say hello."
    >
      <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
        <Heart className="mx-auto h-8 w-8 text-primary" />
        <p className="mt-4 font-medium text-foreground">No open roles right now.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;re not actively hiring at the moment, but we&apos;re always glad to meet sharp
          people. If you&apos;re excited about what we&apos;re building,{" "}
          <a href="/contact" className="text-primary hover:underline">
            introduce yourself
          </a>
          .
        </p>
      </div>
    </PageShell>
  )
}
