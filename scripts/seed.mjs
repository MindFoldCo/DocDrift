/**
 * Seed script — gives a user some repos and stale-doc alerts to look at.
 *
 * Usage:
 *   1. Sign up in the app first so an auth user exists.
 *   2. Run:  node --env-file=.env.local scripts/seed.mjs you@company.com
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY (bypasses RLS to insert on the user's behalf).
 */
import { createClient } from "@supabase/supabase-js"

const email = process.argv[2]
if (!email) {
  console.error("Usage: node --env-file=.env.local scripts/seed.mjs <user-email>")
  process.exit(1)
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
)

// Find the user by email via the admin API.
const { data: list, error: listErr } = await supabase.auth.admin.listUsers()
if (listErr) {
  console.error("Could not list users:", listErr.message)
  process.exit(1)
}
const user = list.users.find((u) => u.email === email)
if (!user) {
  console.error(`No user found with email ${email}. Sign up in the app first.`)
  process.exit(1)
}

console.log(`Seeding data for ${email} (${user.id})…`)

// Repos
const { data: repos, error: repoErr } = await supabase
  .from("repos")
  .insert([
    { owner_id: user.id, name: "acme/api", provider: "github", doc_source: "Notion · Eng Wiki" },
    { owner_id: user.id, name: "acme/web", provider: "github", doc_source: "Confluence · Frontend" },
  ])
  .select()
if (repoErr) {
  console.error("Repo insert failed:", repoErr.message)
  process.exit(1)
}
const apiRepo = repos.find((r) => r.name === "acme/api")

// Alerts
const { error: alertErr } = await supabase.from("alerts").insert([
  {
    owner_id: user.id,
    repo_id: apiRepo?.id ?? null,
    doc_title: "Auth Setup Guide",
    summary: "References a token that was renamed in a recent PR.",
    source_ref: "PR #2841",
    diff_before: "export AUTH_TOKEN=<your-token>",
    diff_after: "export API_KEY=<your-key>",
    confidence: 96,
    status: "pending",
  },
  {
    owner_id: user.id,
    repo_id: apiRepo?.id ?? null,
    doc_title: "Release Runbook",
    summary: "Deploy step still points to the old staging cluster.",
    source_ref: "PR #2790",
    diff_before: "kubectl config use-context staging-old",
    diff_after: "kubectl config use-context staging-eu",
    confidence: 88,
    status: "pending",
  },
  {
    owner_id: user.id,
    repo_id: apiRepo?.id ?? null,
    doc_title: "Onboarding Checklist",
    summary: "Node version requirement is out of date.",
    source_ref: "PR #2702",
    diff_before: "Install Node 18",
    diff_after: "Install Node 22",
    confidence: 92,
    status: "approved",
  },
])
if (alertErr) {
  console.error("Alert insert failed:", alertErr.message)
  process.exit(1)
}

console.log("✓ Seeded 2 repos and 3 alerts.")
process.exit(0)
