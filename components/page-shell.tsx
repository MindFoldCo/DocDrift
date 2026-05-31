import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  children?: ReactNode
}) {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44">
        <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-50" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent)]" />
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          {eyebrow && (
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {children && (
        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">{children}</div>
        </section>
      )}

      <Footer />
    </main>
  )
}

// A simple prose block for text-heavy pages (legal, about, etc.)
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-2 [&_a]:text-primary [&_a]:hover:underline [&_strong]:text-foreground">
      {children}
    </div>
  )
}
