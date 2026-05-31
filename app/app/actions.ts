"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

async function requireUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")
  return { supabase, user }
}

export async function resolveAlert(alertId: string, decision: "approved" | "rejected") {
  const { supabase, user } = await requireUser()
  const { error } = await supabase
    .from("alerts")
    .update({ status: decision, resolved_at: new Date().toISOString() })
    .eq("id", alertId)
    .eq("owner_id", user.id) // belt-and-suspenders; RLS also enforces this
  if (error) return { error: error.message }
  revalidatePath("/app")
  return { ok: true }
}

export async function connectRepo(formData: FormData) {
  const { supabase, user } = await requireUser()
  const name = String(formData.get("name") ?? "").trim()
  const provider = String(formData.get("provider") ?? "github")
  const docSource = String(formData.get("doc_source") ?? "").trim() || null

  if (!name) return { error: "Repository name is required." }

  const { error } = await supabase.from("repos").insert({
    owner_id: user.id,
    name,
    provider: provider === "gitlab" ? "gitlab" : "github",
    doc_source: docSource,
  })
  if (error) return { error: error.message }
  revalidatePath("/app/repos")
  return { ok: true }
}

export async function removeRepo(repoId: string) {
  const { supabase, user } = await requireUser()
  const { error } = await supabase.from("repos").delete().eq("id", repoId).eq("owner_id", user.id)
  if (error) return { error: error.message }
  revalidatePath("/app/repos")
  return { ok: true }
}

export async function updateProfile(formData: FormData) {
  const { supabase, user } = await requireUser()
  const fullName = String(formData.get("full_name") ?? "").trim()
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", user.id)
  if (error) return { error: error.message }
  revalidatePath("/app/settings")
  return { ok: true }
}
