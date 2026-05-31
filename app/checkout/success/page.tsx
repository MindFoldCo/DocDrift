import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "You're all set — DocDrift",
}

// In Next 15/16, searchParams is a Promise in server components.
export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-50" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent)]" />

      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight">
          Your trial is live.
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Thanks for starting with DocDrift. Your 14-day free trial has begun — connect your first
          repo and we&apos;ll start watching for stale docs right away.
        </p>

        {session_id && (
          <p className="mt-6 break-all rounded-lg border border-border bg-card/60 px-4 py-3 font-mono text-xs text-muted-foreground">
            Checkout session: {session_id}
          </p>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="w-full bg-primary py-5 font-semibold text-primary-foreground shadow-[0_0_28px_-8px] shadow-primary/60 hover:bg-primary/90 sm:w-auto sm:px-8">
            <Link href="/docs">Read the quickstart</Link>
          </Button>
          <Button asChild variant="outline" className="w-full border-border py-5 font-medium sm:w-auto sm:px-8">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
