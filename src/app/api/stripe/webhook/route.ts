import { createClient } from "@supabase/supabase-js";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

// Service role bypasses RLS — webhooks não têm sessão de usuário
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function planFromLookupKey(key: string | null | undefined): "starter" | "pro" | "business" {
  if (!key) return "starter";
  if (key.startsWith("pro")) return "pro";
  if (key.startsWith("business")) return "business";
  return "starter";
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return Response.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (!customerId || !subscriptionId) break;

        const [subscription, customer] = await Promise.all([
          stripe.subscriptions.retrieve(subscriptionId),
          stripe.customers.retrieve(customerId) as Promise<Stripe.Customer>,
        ]);

        if (!customer.email) break;

        const plan = planFromLookupKey(subscription.items.data[0]?.price?.lookup_key);

        const { data: userId } = await supabaseAdmin.rpc("get_user_id_by_email", {
          user_email: customer.email,
        });
        if (!userId) break;

        await supabaseAdmin
          .from("profiles")
          .update({
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            subscription_status: subscription.status,
            subscription_plan: plan,
            plan,
          })
          .eq("id", userId);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const plan = planFromLookupKey(subscription.items.data[0]?.price?.lookup_key);

        await supabaseAdmin
          .from("profiles")
          .update({
            subscription_status: subscription.status,
            subscription_plan: plan,
            plan,
          })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await supabaseAdmin
          .from("profiles")
          .update({
            subscription_status: "canceled",
            subscription_plan: null,
            plan: "starter",
          })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subRef = invoice.parent?.subscription_details?.subscription;
        const subscriptionId = typeof subRef === "string" ? subRef : subRef?.id;

        if (subscriptionId) {
          await supabaseAdmin
            .from("profiles")
            .update({ subscription_status: "active" })
            .eq("stripe_subscription_id", subscriptionId);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subRef = invoice.parent?.subscription_details?.subscription;
        const subscriptionId = typeof subRef === "string" ? subRef : subRef?.id;

        if (subscriptionId) {
          await supabaseAdmin
            .from("profiles")
            .update({ subscription_status: "past_due" })
            .eq("stripe_subscription_id", subscriptionId);
        }
        break;
      }
    }
  } catch (err) {
    console.error(`[stripe-webhook] error processing ${event.type}:`, err);
    return Response.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  return Response.json({ received: true });
}
