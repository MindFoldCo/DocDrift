import { createClient } from "@/lib/supabase/server"
import { ConnectRepoForm } from "@/components/dashboard/connect-repo-form"
import { RepoRow } from "@/components/dashboard/repo-row"
import { GitBranch } from "lucide-react"
import type { Repo } from "@/lib/types"

export default async function ReposPage() {
  const supabase = await createClient()
  const { data } = await supabase.from("repos").select("*").order("connected_at", { ascending: false })
  const repos = (data ?? []) as Repo[]

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Repositories</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Connect the repos whose docs you want DocDrift to watch.
      </p>

      <div className="mt-6">
        <ConnectRepoForm />
      </div>

      <div className="mt-8 space-y-3">
        {repos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
            <GitBranch className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-3 font-medium">No repositories yet.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Connect your first repo above to start catching stale docs.
            </p>
          </div>
        ) : (
          repos.map((repo) => <RepoRow key={repo.id} repo={repo} />)
        )}
      </div>
    </div>
  )
}
