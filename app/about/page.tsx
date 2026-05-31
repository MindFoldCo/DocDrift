import type { Metadata } from "next"
import { PageShell, Prose } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "About — DocDrift",
  description: "Why we're building DocDrift.",
}

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Documentation should keep up with the code."
      subtitle="We're on a mission to end doc rot for engineering teams."
    >
      <Prose>
        <p>
          Every engineering team has felt it: a runbook that sends you to the wrong cluster, an
          onboarding guide that references a tool nobody uses anymore, an API doc that quietly went
          stale three releases ago. Documentation decays the moment code ships, and keeping it
          current is nobody&apos;s full-time job.
        </p>
        <p>
          DocDrift exists to fix that. By watching the same sources that make docs go stale — pull
          requests, config changes, the decisions that happen in chat — we catch drift early and
          draft the fix, so your docs stay trustworthy without anyone babysitting them.
        </p>
        <h2>What we believe</h2>
        <p>
          <strong>Docs are infrastructure.</strong> When they&apos;re wrong, everything slows down —
          onboarding, incident response, shipping. They deserve the same care as the code they
          describe.
        </p>
        <p>
          <strong>Humans stay in control.</strong> We draft, you decide. Every change is a
          suggestion until a person approves it.
        </p>
        <p>
          Want to get in touch?{" "}
          <a href="/contact">We&apos;d love to hear from you</a>.
        </p>
      </Prose>
    </PageShell>
  )
}
