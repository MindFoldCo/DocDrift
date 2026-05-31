import { createClient } from "@/lib/supabase/server"
import { updateProfile } from "@/app/app/actions"
import { Button } from "@/components/ui/button"
import type { Profile } from "@/lib/types"

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).single()
  const profile = data as Profile | null

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your account and profile.</p>

      <form action={updateProfile} className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-base font-semibold">Profile</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="full_name" className="mb-1.5 block text-sm font-medium">
              Full name
            </label>
            <input
              id="full_name"
              name="full_name"
              defaultValue={profile?.full_name ?? ""}
              placeholder="Your name"
              className="w-full rounded-xl border border-border bg-input/60 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              value={user?.email ?? ""}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-border bg-secondary/40 px-4 py-2.5 text-sm text-muted-foreground"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Email changes are managed through your authentication provider.
            </p>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-5 bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Save changes
        </Button>
      </form>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-base font-semibold">Plan</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          You&apos;re on the <span className="font-medium text-foreground">Team trial</span>. Manage
          billing from the pricing page.
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-4 border-border"
        >
          <a href="/pricing">Manage plan</a>
        </Button>
      </div>
    </div>
  )
}
