"use client"

import { useTransition } from "react"
import { Github, Trash2, Loader2 } from "lucide-react"
import { removeRepo } from "@/app/app/actions"
import type { Repo } from "@/lib/types"

export function RepoRow({ repo }: { repo: Repo }) {
  const [pending, startTransition] = useTransition()

  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary ring-1 ring-border">
          <Github className="h-4 w-4 text-foreground" />
        </div>
        <div>
          <div className="font-mono text-sm font-medium text-foreground">{repo.name}</div>
          <div className="text-xs text-muted-foreground">
            {repo.provider}
            {repo.doc_source ? ` · ${repo.doc_source}` : ""}
          </div>
        </div>
      </div>
      <button
        onClick={() => startTransition(() => removeRepo(repo.id))}
        disabled={pending}
        className="text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
        aria-label={`Remove ${repo.name}`}
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </button>
    </div>
  )
}
