# DocDrift

Marketing site **and** a functional Next.js application: real auth, a Postgres database
(via Supabase), and a working dashboard where users connect repos, review AI-drafted
fixes for stale docs, and approve or reject them. Plus Stripe subscription checkout.

## Stack

- Next.js 16 (App Router, Server Actions) + React 19
- Tailwind v4
- Supabase (Postgres + Auth) with row-level security
- Stripe (subscription checkout + webhooks)

## Quick start

```bash
pnpm install                 # or npm install
cp .env.example .env.local   # fill in Supabase + Stripe values
# create the database schema (see below)
pnpm dev                     # http://localhost:3000
```

## 1. Supabase setup

1. Create a free project at supabase.com.
2. **Project Settings → API**: copy the Project URL, the `anon` public key, and the
   `service_role` key into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. **SQL Editor**: open `supabase/schema.sql` from this repo, paste it in, and run it.
   That creates the `profiles`, `repos`, and `alerts` tables, the row-level-security
   policies, and a trigger that creates a profile row on signup.
4. **Authentication → Providers → Email**: for the smoothest local dev, turn **off**
   "Confirm email" so signups log in immediately. (Leave it on in production.)

### Seed some data (optional)

After signing up in the app once:

```bash
node --env-file=.env.local scripts/seed.mjs you@company.com
```

This gives that user two repos and three sample stale-doc alerts to interact with.

## 2. Stripe setup

See the same steps as before — create Starter/Team recurring prices, add your keys,
and set up the webhook. Keys live in `.env.local` (`STRIPE_*`, `NEXT_PUBLIC_STRIPE_*`).

## Routes

| Path                    | What it is                                            |
| ----------------------- | ----------------------------------------------------- |
| `/`                     | Landing page                                          |
| `/pricing` `/docs` `/contact` | Marketing pages                                 |
| `/login` `/signup`      | Real auth, wired to Supabase                          |
| `/app`                  | **Dashboard** — stale-doc alert feed, approve/reject  |
| `/app/repos`            | Connect / remove repositories                         |
| `/app/settings`         | Profile + plan                                        |
| `/api/checkout`         | Stripe Checkout Session                               |
| `/api/webhooks/stripe`  | Stripe webhook receiver                               |

Everything under `/app/*` is gated by `middleware.ts`; unauthenticated visitors are
redirected to `/login`. All dashboard reads/writes go through Supabase and are scoped
to the signed-in user by row-level security.

## How the core loop works

1. Sign up → Supabase Auth creates the user; a trigger creates their profile row.
2. Connect a repo on `/app/repos` (writes to the `repos` table).
3. Alerts appear on `/app` (seeded, or inserted by your own detection pipeline).
4. Approve or dismiss a fix → updates the alert's `status` in Postgres and the UI
   reflects it immediately.

## What's real vs. stubbed

- **Real**: auth, sessions, route protection, the database, all dashboard CRUD,
  Stripe checkout code.
- **Stubbed / for you to add**: the actual doc-monitoring engine that *generates*
  alerts (here they're seeded or inserted manually), GitHub OAuth app for true repo
  access, the contact form backend, and granting plan access from the Stripe webhook
  (marked with `// TODO`).

## Note

This code is complete and type-checked, but it was authored in an environment without
network access, so it could not be run against a live Supabase/Stripe project here.
Run `pnpm dev` locally after adding your keys; if anything errors on first run, the
message will point at the fix (usually a missing env var or an unrun SQL migration).
