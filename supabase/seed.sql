-- ============================================================
-- DocDrift seed data (OPTIONAL)
-- Run this AFTER you have signed up at least one user in the app,
-- so there is a row in auth.users to attach data to.
--
-- It attaches 2 repos + 3 alerts to the MOST RECENTLY created user.
-- Safe to run more than once (it clears this user's demo rows first).
-- ============================================================

do $$
declare
  uid uuid;
  api_repo uuid;
begin
  -- Grab the newest auth user.
  select id into uid from auth.users order by created_at desc limit 1;

  if uid is null then
    raise notice 'No users found. Sign up in the app first, then re-run this.';
    return;
  end if;

  -- Clear any prior demo data for this user so re-running is clean.
  delete from public.alerts where owner_id = uid;
  delete from public.repos  where owner_id = uid;

  -- Repos
  insert into public.repos (owner_id, name, provider, doc_source)
  values
    (uid, 'acme/api', 'github', 'Notion · Eng Wiki'),
    (uid, 'acme/web', 'github', 'Confluence · Frontend');

  select id into api_repo from public.repos
    where owner_id = uid and name = 'acme/api' limit 1;

  -- Alerts
  insert into public.alerts
    (owner_id, repo_id, doc_title, summary, source_ref, diff_before, diff_after, confidence, status)
  values
    (uid, api_repo, 'Auth Setup Guide',
     'References a token that was renamed in a recent PR.',
     'PR #2841', 'export AUTH_TOKEN=<your-token>', 'export API_KEY=<your-key>', 96, 'pending'),
    (uid, api_repo, 'Release Runbook',
     'Deploy step still points to the old staging cluster.',
     'PR #2790', 'kubectl config use-context staging-old', 'kubectl config use-context staging-eu', 88, 'pending'),
    (uid, api_repo, 'Onboarding Checklist',
     'Node version requirement is out of date.',
     'PR #2702', 'Install Node 18', 'Install Node 22', 92, 'approved');

  raise notice 'Seeded 2 repos and 3 alerts for user %', uid;
end $$;
