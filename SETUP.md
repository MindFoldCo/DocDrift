# SETUP — step by step

There are two halves and they live in two different places:

- **Supabase** holds your database + auth. You give it ONE file: `supabase/schema.sql`.
- **The app code** (everything else in this zip) runs on your computer and connects to
  Supabase using keys you paste into a file called `.env.local`.

You do NOT upload the zip to Supabase. Supabase has no place to put it. Follow the two
parts below in order.

---

## PART A — Set up Supabase (the database)

### A1. Create a project
1. Go to https://supabase.com and sign in (free tier is fine).
2. Click **New project**. Give it a name, set a database password (save it somewhere),
   pick a region, click **Create new project**. Wait ~2 minutes for it to provision.

### A2. Run the schema
1. Unzip this download on your computer. Open the file `supabase/schema.sql` in any
   text editor and **select all + copy**.
2. In the Supabase dashboard, click **SQL Editor** in the left sidebar.
3. Click **+ New query**, paste the SQL, and click **Run** (or press Cmd/Ctrl+Enter).
4. You should see "Success. No rows returned." That created your tables, security
   rules, and the signup trigger. ✅

### A3. Make local logins instant (dev only)
1. Left sidebar → **Authentication** → **Sign In / Providers** (or **Providers**).
2. Open **Email**. Turn **OFF** "Confirm email", then save.
   (This lets you log in immediately after signing up without clicking an email link.
   Turn it back ON before going to production.)

### A4. Copy your keys
1. Left sidebar → **Project Settings** (gear icon) → **API**.
2. Keep this tab open — you'll copy three values in Part B:
   - **Project URL**
   - **anon public** key
   - **service_role** key (under "Project API keys" — click reveal)

That's everything on the Supabase side.

---

## PART B — Run the app (connects to Supabase)

You need **Node.js 18+** installed. Check with `node --version`. If you don't have it,
install from https://nodejs.org first.

### B1. Open a terminal in the project folder
Unzip the download, then in your terminal:
```bash
cd docdrift
```

### B2. Install dependencies
```bash
npm install
```
(or `pnpm install` if you use pnpm.)

### B3. Create your env file
Copy the example file:
```bash
cp .env.example .env.local
```
Open `.env.local` in your editor and fill in the three Supabase values from step A4:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (the anon public key)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (the service_role key)
```
You can leave the Stripe values as placeholders for now — the app runs fine without
them; only the checkout buttons need them.

### B4. Start the app
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

### B5. Create an account and log in
1. Click **Get started** (or go to http://localhost:3000/signup).
2. Sign up with any email + a password of 8+ characters.
3. Because you turned off email confirmation, you're logged straight into the
   dashboard at `/app`.

### B6. (Optional) Load sample data
The dashboard is empty until you add a repo or seed demo data. Easiest way:
1. Back in Supabase → **SQL Editor** → **+ New query**.
2. Paste the contents of `supabase/seed.sql` and click **Run**.
3. Refresh `/app` — you'll see 2 repositories and 3 stale-doc alerts to approve/dismiss.

Or skip seeding and just click **Repositories** → connect a repo yourself.

---

## You're done
- Sign up / log in → real auth (Supabase).
- Connect repos, review fixes, approve/dismiss → all saved in your Postgres database.
- Each user only sees their own data (enforced by row-level security).

## Common hiccups
- **"Invalid API key" / auth errors** → a key in `.env.local` is wrong or has a stray
  space. Re-copy from Project Settings → API. Restart `npm run dev` after editing
  `.env.local` (env changes need a restart).
- **Signup says "check your email"** → you didn't turn off "Confirm email" in step A3,
  or you want it on. Either confirm via the email, or turn it off and sign up again.
- **Dashboard is empty** → that's expected with a new account. Run `supabase/seed.sql`
  (step B6) or connect a repo.
- **`relation "public.alerts" does not exist`** → you skipped step A2; run `schema.sql`.

## Going live later
Host the app on Vercel (or any Node host): push the code to GitHub, import it in
Vercel, and add the same `.env.local` values as Environment Variables there. Supabase
stays exactly as-is — production just points at the same project (or a separate one).
