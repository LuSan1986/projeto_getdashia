import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json();

    if (!customerId) {
      return Response.json({ error: "customerId é obrigatório" }, { status: 400 });
    }

    const origin = request.headers.get("origin") ?? "http://localhost:3000";

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard`,
    });

    return Response.json({ url: session.url });
  } catch {
    return Response.json({ error: "Erro ao abrir portal de assinatura" }, { status: 500 });
  }
}
