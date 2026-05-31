export type AlertStatus = "pending" | "approved" | "rejected"

export type Repo = {
  id: string
  owner_id: string
  name: string
  provider: "github" | "gitlab"
  doc_source: string | null
  connected_at: string
}

export type Alert = {
  id: string
  owner_id: string
  repo_id: string | null
  doc_title: string
  summary: string
  source_ref: string | null
  diff_before: string | null
  diff_after: string | null
  confidence: number
  status: AlertStatus
  created_at: string
  resolved_at: string | null
}

export type Profile = {
  id: string
  email: string | null
  full_name: string | null
  created_at: string
}
