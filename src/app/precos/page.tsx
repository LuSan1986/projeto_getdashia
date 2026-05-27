import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import CheckoutButton from "./CheckoutButton";

export const metadata: Metadata = {
  title: "Planos e Preços | GetDashia",
  description:
    "Escolha o plano ideal para centralizar suas métricas de Google Ads e Meta Ads. Comece grátis por 7 dias.",
};

interface Feature {
  texto: string;
  incluso: boolean;
}

interface Plano {
  nome: string;
  preco: string;
  descricao: string;
  lookupKey: string;
  destaque: boolean;
  features: Feature[];
}

const planos: Plano[] = [
  {
    nome: "Starter",
    preco: "R$ 59,90",
    descricao: "Para gestores que estão começando a profissionalizar os relatórios.",
    lookupKey: "starter_mensal",
    destaque: false,
    features: [
      { texto: "1 integração (Google Ads ou Meta Ads)", incluso: true },
      { texto: "Dashboard básico com métricas de campanha", incluso: true },
      { texto: "Dados dos últimos 30 dias", incluso: true },
      { texto: "1 organização", incluso: true },
      { texto: "7 dias grátis para testar", incluso: true },
    ],
  },
  {
    nome: "Pro",
    preco: "R$ 97,00",
    descricao: "Para gestores com carteira de clientes que precisam escalar.",
    lookupKey: "pro_mensal",
    destaque: true,
    features: [
      { texto: "Google Ads + Meta Ads conectados", incluso: true },
      { texto: "Dashboard completo com CPA e ROAS", incluso: true },
      { texto: "Dados dos últimos 90 dias", incluso: true },
      { texto: "1 organização", incluso: true },
      { texto: "7 dias grátis para testar", incluso: true },
    ],
  },
  {
    nome: "Business",
    preco: "R$ 197,00",
    descricao: "Para agências e times com múltiplos clientes e alto volume.",
    lookupKey: "business_mensal",
    destaque: false,
    features: [
      { texto: "Google Ads + Meta Ads conectados", incluso: true },
      { texto: "Dashboard completo com CPA e ROAS", incluso: true },
      { texto: "Histórico completo de dados", incluso: true },
      { texto: "Múltiplas organizações", incluso: true },
      { texto: "Suporte prioritário", incluso: true },
      { texto: "7 dias grátis para testar", incluso: true },
    ],
  },
];

export default function PrecosPage() {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-16 text-zinc-100">
      <div className="mx-auto max-w-6xl">
        {/* Navegação */}
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-indigo-400"
          >
            GetDashia
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-indigo-500 px-4 py-2 text-sm font-medium text-indigo-400 transition-colors hover:bg-indigo-600 hover:text-white"
          >
            Entrar
          </Link>
        </div>

        {/* Cabeçalho */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            Planos e <span className="text-indigo-400">preços</span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            7 dias grátis em todos os planos. Sem cartão de crédito para começar.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Plano Grátis */}
          <div className="flex flex-col rounded-2xl border border-emerald-800/50 bg-emerald-950/20 p-6">
            <span className="mb-4 inline-block w-fit rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-800/50">
              Beta — tempo limitado
            </span>
            <p className="text-lg font-bold text-zinc-50">Grátis</p>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-4xl font-bold text-zinc-50">R$ 0</span>
              <span className="mb-1 text-sm text-zinc-400">/mês</span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">Para testar a plataforma durante o período beta.</p>
            <div className="my-6 border-t border-zinc-800" />
            <ul className="mb-6 flex-1 space-y-3">
              {[
                "1 integração (Google Ads ou Meta Ads)",
                "Dashboard com métricas de campanha",
                "Dados dos últimos 30 dias",
                "1 organização",
                "Sem cartão de crédito",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <Check className="size-4 shrink-0 text-emerald-400" />
                  <span className="text-sm text-zinc-300">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/cadastro"
              className="w-full rounded-lg border border-emerald-700 py-2.5 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-900/40 text-center"
            >
              Criar conta grátis
            </Link>
          </div>

          {planos.map((plano) => (
            <div
              key={plano.nome}
              className={
                plano.destaque
                  ? "flex flex-col rounded-2xl border border-indigo-700 bg-indigo-950/20 p-6 ring-1 ring-indigo-700"
                  : "flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
              }
            >
              {plano.destaque && (
                <span className="mb-4 inline-block w-fit rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white">
                  Mais popular
                </span>
              )}

              <p className="text-lg font-bold text-zinc-50">{plano.nome}</p>

              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold text-zinc-50">{plano.preco}</span>
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

              <CheckoutButton
                lookupKey={plano.lookupKey}
                className={
                  plano.destaque
                    ? "w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:opacity-60"
                    : "w-full rounded-lg border border-zinc-700 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-60"
                }
              >
                Começar grátis
              </CheckoutButton>
            </div>
          ))}
        </div>

        {/* Rodapé informativo */}
        <p className="mt-10 text-center text-sm text-zinc-600">
          Ao assinar, você concorda com nossos{" "}
          <Link href="/termos" className="text-zinc-500 underline hover:text-zinc-300">
            Termos de Uso
          </Link>{" "}
          e{" "}
          <Link href="/privacidade" className="text-zinc-500 underline hover:text-zinc-300">
            Política de Privacidade
          </Link>
          . Cancele quando quiser.
        </p>
      </div>
    </div>
  );
}
