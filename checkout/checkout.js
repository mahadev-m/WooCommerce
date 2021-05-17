import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

export async function initiateCheckout({ lineItems } = {}) {
  const stripe = await stripePromise;

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}/final`,
    cancelUrl: window.location.origin,
  });
}
