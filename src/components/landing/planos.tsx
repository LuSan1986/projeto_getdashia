import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Plano {
  nome: string;
  preco: string;
  descricao: string;
  features: string[];
  cta: string;
  destaque: boolean;
}

const planos: Plano[] = [
  {
    nome: "Starter",
    preco: "R$ 59,90",
    descricao: "Para gestores que estão começando a profissionalizar os relatórios.",
    destaque: false,
    cta: "Começar no Starter",
    features: [
      "1 integração (Google Ads ou Meta Ads)",
      "Dashboard básico com métricas de campanha",
      "Dados dos últimos 30 dias",
      "1 organização",
      "7 dias grátis para testar",
    ],
  },
  {
    nome: "Pro",
    preco: "R$ 97,00",
    descricao: "Para gestores com carteira de clientes que precisam escalar.",
    destaque: true,
    cta: "Começar no Pro",
    features: [
      "Google Ads + Meta Ads conectados",
      "Dashboard completo com CPA e ROAS",
      "Dados dos últimos 90 dias",
      "1 organização",
      "7 dias grátis para testar",
    ],
  },
  {
    nome: "Business",
    preco: "R$ 197,00",
    descricao: "Para agências e times com múltiplos clientes e alto volume.",
    destaque: false,
    cta: "Começar no Business",
    features: [
      "Google Ads + Meta Ads conectados",
      "Dashboard completo com CPA e ROAS",
      "Histórico completo de dados",
      "Múltiplas organizações",
      "Suporte prioritário",
      "7 dias grátis para testar",
    ],
  },
];

export default function Planos() {
  return (
    <section id="planos" className="scroll-mt-16 bg-zinc-900/30 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Planos e <span className="text-indigo-400">preços</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Sem taxa de setup. Cancele quando quiser.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {planos.map((plano) => (
            <Card
              key={plano.nome}
              className={
                plano.destaque
                  ? "gap-0 flex flex-col border-indigo-700 bg-indigo-950/20 p-6 ring-0"
                  : "gap-0 flex flex-col border-zinc-800 bg-zinc-900/60 p-6 ring-0"
              }
            >
              {plano.destaque && (
                <div className="mb-4">
                  <Badge className="border-transparent bg-indigo-500 text-xs text-white">
                    Mais popular
                  </Badge>
                </div>
              )}

              <p className="text-lg font-bold text-zinc-50">{plano.nome}</p>

              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold text-zinc-50">
                  {plano.preco}
                </span>
                <span className="mb-1 text-sm text-zinc-400">/mês</span>
              </div>

              <p className="mt-2 text-sm text-zinc-500">{plano.descricao}</p>

              <div className="my-6 border-t border-zinc-800" />

              <ul className="mb-6 flex-1 space-y-3">
                {plano.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="size-4 shrink-0 text-indigo-400" />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={plano.destaque ? "default" : "outline"}
                className={
                  plano.destaque
                    ? "w-full"
                    : "w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                }
              >
                <Link href="/precos">{plano.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-zinc-600">
          Sem taxa de setup. Cancele quando quiser.
        </p>
      </div>
    </section>
  );
}
