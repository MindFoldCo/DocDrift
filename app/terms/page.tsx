import type { Metadata } from "next"
import { PageShell, Prose } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Terms of Service — DocDrift",
  description: "The terms governing your use of DocDrift.",
}

export default function TermsPage() {
  return (
    <PageShell eyebrow="Legal" title="Terms of Service" subtitle="Last updated: May 2026">
      <Prose>
        <p>
          These Terms of Service govern your use of DocDrift. This is a starting template — review it
          with a legal professional before relying on it for your business.
        </p>
        <h2>Using DocDrift</h2>
        <p>
          You may use DocDrift in accordance with these terms. You&apos;re responsible for your
          account, for the data you connect, and for ensuring you have the right to connect it.
        </p>
        <h2>Subscriptions and billing</h2>
        <p>
          Paid plans are billed per seat. Trials convert to paid subscriptions unless cancelled
          before the trial ends. You can cancel at any time; access continues through the end of
          your billing period.
        </p>
        <h2>Acceptable use</h2>
        <p>
          Don&apos;t use DocDrift to violate the law, infringe others&apos; rights, or attempt to
          disrupt the service.
        </p>
        <h2>Changes</h2>
        <p>
          We may update these terms over time. We&apos;ll make reasonable efforts to notify you of
          material changes. Questions? <a href="/contact">Contact us</a>.
        </p>
      </Prose>
    </PageShell>
  )
}
