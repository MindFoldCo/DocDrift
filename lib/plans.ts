// Single source of truth for plans, shared by the pricing page and checkout.
// Price IDs come from env so the same code works across test/live modes.

export type PlanId = "starter" | "team" | "enterprise"

export type Plan = {
  id: PlanId
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  highlighted: boolean
  badge?: string
  // The env var holding this plan's Stripe Price ID. Enterprise has none (contact sales).
  priceEnvKey?: "NEXT_PUBLIC_STRIPE_PRICE_STARTER" | "NEXT_PUBLIC_STRIPE_PRICE_TEAM"
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$15",
    period: "/user/mo",
    description: "For small teams getting their docs under control.",
    features: ["Up to 10 users", "GitHub integration", "Slack alerts", "Weekly stale-doc digest"],
    cta: "Start free trial",
    highlighted: false,
    priceEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_STARTER",
  },
  {
    id: "team",
    name: "Team",
    price: "$25",
    period: "/user/mo",
    description: "For growing orgs that live in their docs.",
    features: [
      "Everything in Starter",
      "Notion + Confluence",
      "AI-drafted updates",
      "Dependency mapping",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
    badge: "Most popular",
    priceEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_TEAM",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For larger orgs with advanced needs.",
    features: [
      "Everything in Team",
      "SSO & SCIM",
      "Audit logs",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
]

// Resolve the Stripe Price ID for a plan from the public env vars.
export function priceIdForPlan(plan: Plan): string | undefined {
  if (!plan.priceEnvKey) return undefined
  return process.env[plan.priceEnvKey]
}
