import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe"

// Stripe needs the raw, unparsed request body to verify the signature,
// so this route must run on the Node.js runtime (not edge) and read text().
export const runtime = "nodejs"

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not set." },
      { status: 500 },
    )
  }

  const signature = req.headers.get("stripe-signature")
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 })
  }

  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature."
    console.error("[webhook] signature verification failed:", message)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  // Handle the events you care about. This is where you'd update your database:
  // mark the customer as subscribed, set their plan, provision access, etc.
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      // TODO: look up session.customer / session.subscription and grant access.
      console.log("[webhook] checkout completed:", session.id, "plan:", session.metadata?.planId)
      break
    }
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription
      // TODO: persist sub.status (trialing/active/past_due) and current_period_end.
      console.log("[webhook] subscription", event.type, sub.id, "status:", sub.status)
      break
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription
      // TODO: revoke access for this customer.
      console.log("[webhook] subscription canceled:", sub.id)
      break
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice
      // TODO: notify the customer / flag the account.
      console.log("[webhook] payment failed for invoice:", invoice.id)
      break
    }
    default:
      // Unhandled event types are fine to ignore; acknowledge them with a 200.
      break
  }

  return NextResponse.json({ received: true })
}
