import type { Metadata } from "next"
import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Create your account — DocDrift",
  description: "Start your 14-day DocDrift trial.",
}

export default function SignupPage() {
  return <AuthForm mode="signup" />
}
