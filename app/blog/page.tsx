import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { PenLine } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog — DocDrift",
  description: "Notes on documentation, engineering, and keeping knowledge current.",
}

export default function BlogPage() {
  return (
    <PageShell
      eyebrow="Blog"
      title="The DocDrift blog."
      subtitle="Notes on documentation, engineering workflows, and keeping team knowledge current."
    >
      <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
        <PenLine className="mx-auto h-8 w-8 text-primary" />
        <p className="mt-4 font-medium text-foreground">No posts yet — but they&apos;re coming.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;re heads-down building. Check back soon, or{" "}
          <a href="/contact" className="text-primary hover:underline">
            reach out
          </a>{" "}
          if there&apos;s something you&apos;d like us to write about.
        </p>
      </div>
    </PageShell>
  )
}
