"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { login, signup, type AuthState } from "@/app/auth/actions"

function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-primary" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
          <path d="M14 4v5h5" />
          <path d="M8 13.5l2.5 2.5L16 11" />
        </svg>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">
        Doc<span className="text-primary">Drift</span>
      </span>
    </Link>
  )
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="group w-full bg-primary py-5 font-semibold text-primary-foreground shadow-[0_0_28px_-8px] shadow-primary/60 hover:bg-primary/90"
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Working…
        </span>
      ) : (
        <span className="inline-flex items-center">
          {label}
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </Button>
  )
}

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const action = mode === "login" ? login : signup
  const [state, formAction] = useActionState<AuthState, FormData>(action, null)

  const isLogin = mode === "login"

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-50" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent)]" />

      <div className="w-full max-w-sm">
        <div className="text-center">
          <Logo />
          <h1 className="mt-8 font-display text-2xl font-semibold tracking-tight">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLogin
              ? "Sign in to keep your docs in sync."
              : "Start your 14-day trial — no card required."}
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card/80 p-6 backdrop-blur ring-hairline">
          <form action={formAction} className="space-y-3">
            {!isLogin && (
              <div>
                <label htmlFor="full_name" className="mb-1.5 block text-sm font-medium text-foreground">
                  Full name
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Ada Lovelace"
                  className="w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                {isLogin && (
                  <Link href="#" className="text-xs text-primary hover:underline">
                    Forgot?
                  </Link>
                )}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
              />
            </div>

            {state?.error && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {state.error}
              </p>
            )}

            <SubmitButton label={isLogin ? "Sign in" : "Create account"} />
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              New to DocDrift?{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  )
}
