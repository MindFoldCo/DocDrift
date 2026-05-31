"use client"

import { useRef, useState, useTransition } from "react"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { connectRepo } from "@/app/app/actions"

export function ConnectRepoForm() {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  function onSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res = await connectRepo(formData)
      if (res?.error) setError(res.error)
      else formRef.current?.reset()
    })
  }

  return (
    <form
      ref={formRef}
      action={onSubmit}
      className="rounded-2xl border border-border bg-card p-5"
    >
      <h2 className="font-display text-base font-semibold">Connect a repository</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_140px]">
        <input
          name="name"
          placeholder="owner/repo"
          required
          className="w-full rounded-xl border border-border bg-input/60 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
        />
        <select
          name="provider"
          defaultValue="github"
          className="w-full rounded-xl border border-border bg-input/60 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
        >
          <option value="github">GitHub</option>
          <option value="gitlab">GitLab</option>
        </select>
      </div>
      <input
        name="doc_source"
        placeholder="Doc source (optional) — e.g. Notion · Eng Wiki"
        className="mt-3 w-full rounded-xl border border-border bg-input/60 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
      />
      <div className="mt-4 flex items-center gap-3">
        <Button
          type="submit"
          disabled={pending}
          className="gap-1.5 bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Connect
        </Button>
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    </form>
  )
}
