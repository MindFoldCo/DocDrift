"use client"

import { useState, useTransition } from "react"
import { GitPullRequest, Check, X, Loader2 } from "lucide-react"
import { resolveAlert } from "@/app/app/actions"
import type { Alert } from "@/lib/types"

export function AlertCard({ alert }: { alert: Alert }) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<"approved" | "rejected" | null>(
    alert.status === "pending" ? null : alert.status,
  )

  function handle(decision: "approved" | "rejected") {
    setError(null)
    startTransition(async () => {
      const res = await resolveAlert(alert.id, decision)
      if (res?.error) setError(res.error)
      else setDone(decision)
    })
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-start gap-3 p-5">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-signal/15 ring-1 ring-signal/25">
          <GitPullRequest className="h-[18px] w-[18px] text-signal" strokeWidth={2} />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-signal">
              Stale doc detected
            </span>
            {alert.source_ref && (
              <span className="font-mono text-[11px] text-muted-foreground">· {alert.source_ref}</span>
            )}
            <span className="ml-auto font-mono text-[11px] text-muted-foreground">
              confidence {alert.confidence}%
            </span>
          </div>
          <h3 className="mt-1.5 font-display text-base font-semibold text-foreground">
            {alert.doc_title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{alert.summary}</p>
        </div>
      </div>

      {(alert.diff_before || alert.diff_after) && (
        <div className="mx-5 mb-4 overflow-hidden rounded-lg border border-border/70 bg-background/60 font-mono text-xs">
          {alert.diff_before && (
            <div className="flex border-b border-border/50">
              <span className="w-8 shrink-0 border-r border-border/50 bg-destructive/10 py-1.5 text-center text-muted-foreground">-</span>
              <code className="flex-1 px-3 py-1.5 text-destructive/90">{alert.diff_before}</code>
            </div>
          )}
          {alert.diff_after && (
            <div className="flex">
              <span className="w-8 shrink-0 border-r border-border/50 bg-primary/10 py-1.5 text-center text-primary">+</span>
              <code className="flex-1 px-3 py-1.5 text-primary">{alert.diff_after}</code>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-2.5 border-t border-border/70 bg-secondary/20 px-5 py-3">
        {done ? (
          <span
            className={`inline-flex items-center gap-1.5 text-sm font-medium ${
              done === "approved" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {done === "approved" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            {done === "approved" ? "Fix approved & merged" : "Dismissed"}
          </span>
        ) : (
          <>
            <button
              onClick={() => handle("approved")}
              disabled={pending}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
              Approve fix
            </button>
            <button
              onClick={() => handle("rejected")}
              disabled={pending}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-60"
            >
              <X className="h-3.5 w-3.5" />
              Dismiss
            </button>
          </>
        )}
        {error && <span className="ml-auto text-xs text-destructive">{error}</span>}
      </div>
    </div>
  )
}
