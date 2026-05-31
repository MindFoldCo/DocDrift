import { NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { PLANS, priceIdForPlan, type PlanId } from "@/lib/plans"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local." },
        { status: 500 },
      )
    }

    const body = (await req.json()) as { planId?: PlanId }
    const plan = PLANS.find((p) => p.id === body.planId)

    if (!plan) {
      return NextResponse.json({ error: "Unknown plan." }, { status: 400 })
    }
    if (plan.id === "enterprise") {
      return NextResponse.json(
        { error: "Enterprise is sales-assisted; no self-serve checkout." },
        { status: 400 },
      )
    }

    const priceId = priceIdForPlan(plan)
    if (!priceId) {
      return NextResponse.json(
        { error: `Missing price ID for ${plan.name}. Set ${plan.priceEnvKey} in .env.local.` },
        { status: 500 },
      )
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      // 14-day free trial to match the marketing copy.
      subscription_data: { trial_period_days: 14 },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing?canceled=1`,
      metadata: { planId: plan.id },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error creating checkout."
    console.error("[checkout]", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
