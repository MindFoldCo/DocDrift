import type { Metadata } from "next"
import { PageShell, Prose } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Security — DocDrift",
  description: "How DocDrift protects your code and data.",
}

export default function SecurityPage() {
  return (
    <PageShell
      eyebrow="Security"
      title="Your code, handled with care."
      subtitle="Security isn't an afterthought — it's built into how DocDrift works."
    >
      <Prose>
        <h2>Data handling</h2>
        <p>
          DocDrift reads the minimum it needs to detect stale documentation. We don&apos;t store
          your source code; we analyze changes and keep only the metadata required to map docs to
          their sources.
        </p>
        <h2>Access control</h2>
        <p>
          Every account&apos;s data is isolated. Within the app, row-level security ensures one
          customer can never read another&apos;s repositories, alerts, or settings.
        </p>
        <h2>Authentication</h2>
        <p>
          Accounts are protected by industry-standard authentication. Enterprise plans add SSO and
          SCIM for centralized access management.
        </p>
        <h2>Reporting a vulnerability</h2>
        <p>
          If you believe you&apos;ve found a security issue, please{" "}
          <a href="/contact">contact us</a> directly so we can investigate promptly. We appreciate
          responsible disclosure.
        </p>
      </Prose>
    </PageShell>
  )
}
