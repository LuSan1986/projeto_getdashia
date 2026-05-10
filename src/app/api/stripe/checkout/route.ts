import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { lookupKey } = await request.json();

    if (!lookupKey) {
      return Response.json({ error: "lookupKey é obrigatório" }, { status: 400 });
    }

    const prices = await stripe.prices.list({
      lookup_keys: [lookupKey],
    });

    if (!prices.data.length) {
      return Response.json({ error: "Plano não encontrado" }, { status: 404 });
    }

    const origin = request.headers.get("origin") ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: prices.data[0].id, quantity: 1 }],
      subscription_data: { trial_period_days: 7 },
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/precos`,
    });

    return Response.json({ url: session.url });
  } catch {
    return Response.json({ error: "Erro ao criar sessão de pagamento" }, { status: 500 });
  }
}
