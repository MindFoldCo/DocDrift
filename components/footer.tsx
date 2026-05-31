import Link from "next/link"

const footerLinks = {
  Product: [
    { name: "Features", href: "/#product" },
    { name: "Pricing", href: "/pricing" },
    { name: "Integrations", href: "/integrations" },
    { name: "Changelog", href: "/changelog" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  Resources: [
    { name: "Docs", href: "/docs" },
    { name: "API", href: "/api-docs" },
    { name: "Status", href: "/status" },
    { name: "Security", href: "/security" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 xl:grid-cols-4 xl:gap-8">
          <div className="max-w-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
                  <path d="M14 4v5h5" />
                  <path d="M8 13.5l2.5 2.5L16 11" />
                </svg>
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                Doc<span className="text-primary">Drift</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Documentation that keeps up.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:col-span-3">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                  {heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">© 2026 DocDrift, Inc. All rights reserved.</p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link href="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">Terms</Link>
            <Link href="/security" className="transition-colors hover:text-foreground">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
