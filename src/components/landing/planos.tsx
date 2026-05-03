import { Check, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Feature {
  texto: string;
  incluso: boolean;
}

interface Plano {
  nome: string;
  preco: string;
  descricao: string;
  features: Feature[];
  cta: string;
  destaque: boolean;
}

const planos: Plano[] = [
  {
    nome: "Starter",
    preco: "R$97",
    descricao: "Para gestores que estão começando a profissionalizar os relatórios.",
    destaque: false,
    cta: "Começar no Starter",
    features: [
      { texto: "1 cliente ativo", incluso: true },
      { texto: "3 contas conectadas", incluso: true },
      { texto: "Google Ads + Meta Ads", incluso: true },
      { texto: "Dashboard CPA e ROAS", incluso: true },
      { texto: "Exportação em PDF", incluso: true },
      { texto: "Google Analytics 4", incluso: false },
      { texto: "Relatório agendado", incluso: false },
      { texto: "White-label", incluso: false },
    ],
  },
  {
    nome: "Pro",
    preco: "R$197",
    descricao: "Para gestores com carteira de clientes que precisam escalar.",
    destaque: true,
    cta: "Começar no Pro",
    features: [
      { texto: "Até 5 clientes ativos", incluso: true },
      { texto: "10 contas conectadas", incluso: true },
      { texto: "Google Ads + Meta Ads", incluso: true },
      { texto: "Dashboard CPA e ROAS", incluso: true },
      { texto: "Exportação em PDF", incluso: true },
      { texto: "Google Analytics 4", incluso: true },
      { texto: "Relatório agendado", incluso: true },
      { texto: "White-label", incluso: false },
    ],
  },
  {
    nome: "Agência",
    preco: "R$497",
    descricao: "Para agências com múltiplos colaboradores e clientes.",
    destaque: false,
    cta: "Falar sobre Agência",
    features: [
      { texto: "Até 30 clientes ativos", incluso: true },
      { texto: "50 contas conectadas", incluso: true },
      { texto: "Google Ads + Meta Ads", incluso: true },
      { texto: "Dashboard CPA e ROAS", incluso: true },
      { texto: "Exportação em PDF", incluso: true },
      { texto: "Google Analytics 4", incluso: true },
      { texto: "Relatório agendado", incluso: true },
      { texto: "White-label (sua marca)", incluso: true },
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
                  <li key={feature.texto} className="flex items-center gap-3">
                    {feature.incluso ? (
                      <Check className="size-4 shrink-0 text-indigo-400" />
                    ) : (
                      <Minus className="size-4 shrink-0 text-zinc-600" />
                    )}
                    <span
                      className={
                        feature.incluso
                          ? "text-sm text-zinc-300"
                          : "text-sm text-zinc-600"
                      }
                    >
                      {feature.texto}
                    </span>
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
                <a href="#waitlist">{plano.cta}</a>
              </Button>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-zinc-600">
          Preços estimados para o lançamento. Usuários da lista de espera terão
          condições especiais.
        </p>
      </div>
    </section>
  );
}
