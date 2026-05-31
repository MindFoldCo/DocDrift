-- ============================================================
-- DocDrift schema
-- Paste this into the Supabase SQL editor and run it once.
-- ============================================================

-- ----- profiles -------------------------------------------------
-- One row per auth user. Auto-created by a trigger on signup.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now()
);

-- ----- repos ----------------------------------------------------
-- Connected source repositories owned by a user.
create table if not exists public.repos (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null,                 -- e.g. "acme/api"
  provider text not null default 'github' check (provider in ('github','gitlab')),
  doc_source text,                    -- e.g. "Notion · Eng Wiki"
  connected_at timestamptz not null default now()
);

-- ----- alerts ---------------------------------------------------
-- A detected stale-doc alert with an AI-drafted fix.
create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  repo_id uuid references public.repos (id) on delete set null,
  doc_title text not null,            -- e.g. "Auth Setup Guide"
  summary text not null,              -- short human-readable description
  source_ref text,                    -- e.g. "PR #2841"
  diff_before text,                   -- the stale line(s)
  diff_after text,                    -- the proposed line(s)
  confidence int not null default 90 check (confidence between 0 and 100),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists alerts_owner_status_idx on public.alerts (owner_id, status);
create index if not exists repos_owner_idx on public.repos (owner_id);

-- ============================================================
-- Row Level Security: each user sees and mutates only their rows.
-- ============================================================
alter table public.profiles enable row level security;
alter table public.repos    enable row level security;
alter table public.alerts   enable row level security;

-- profiles
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- repos
drop policy if exists "repos_all_own" on public.repos;
create policy "repos_all_own" on public.repos
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

-- alerts
drop policy if exists "alerts_all_own" on public.alerts;
create policy "alerts_all_own" on public.alerts
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

-- ============================================================
-- Auto-create a profile row whenever a new auth user signs up.
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
