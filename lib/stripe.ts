import Stripe from "stripe"

// Server-side Stripe client. Never import this into a client component.
//
// IMPORTANT: Stripe is initialized LAZILY (only when getStripe() is first called),
// not at module import time. This lets the app build and run without a Stripe key —
// the checkout route only needs Stripe when someone actually clicks subscribe.
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (_stripe) return _stripe

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your environment to enable checkout.",
    )
  }

  _stripe = new Stripe(secretKey, {
    apiVersion: "2024-12-18.acacia",
    appInfo: { name: "DocDrift", version: "1.0.0" },
  })
  return _stripe
}
