import type { Metadata } from "next"
import { PageShell, Prose } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Privacy Policy — DocDrift",
  description: "How DocDrift collects, uses, and protects your information.",
}

export default function PrivacyPage() {
  return (
    <PageShell eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: May 2026">
      <Prose>
        <p>
          This Privacy Policy explains how DocDrift collects, uses, and protects your information.
          This is a starting template — review it with a legal professional before relying on it for
          your business.
        </p>
        <h2>Information we collect</h2>
        <p>
          We collect the information you provide when you create an account (such as your name and
          email), and the data needed to operate the service, such as the repositories you connect
          and the documentation alerts generated for your account.
        </p>
        <h2>How we use it</h2>
        <p>
          We use your information to provide and improve the service, detect stale documentation,
          and communicate with you about your account.
        </p>
        <h2>Data sharing</h2>
        <p>
          We don&apos;t sell your data. We share information only with the service providers needed
          to run DocDrift (such as our hosting and database providers), and only as required to
          operate the product.
        </p>
        <h2>Your choices</h2>
        <p>
          You can access, update, or delete your account information at any time from your settings,
          or by <a href="/contact">contacting us</a>.
        </p>
      </Prose>
    </PageShell>
  )
}
