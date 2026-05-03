import { Clock, GitFork, TrendingDown, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ItemProblema {
  Icone: LucideIcon;
  titulo: string;
  descricao: string;
}

const itens: ItemProblema[] = [
  {
    Icone: Clock,
    titulo: "1 dia inteiro por semana só montando relatório",
    descricao:
      "Você abre Google Ads, Meta, Analytics e uma planilha, copia número a número e ainda assim o relatório sai torto.",
  },
  {
    Icone: GitFork,
    titulo: "Cada plataforma jura que foi ela que fez a venda",
    descricao:
      "Google Ads marcou 30 conversões. Meta Ads também. Mas você vendeu 20. Quem está certo — e o que você faz com isso?",
  },
  {
    Icone: TrendingDown,
    titulo: "O cliente não entende os números e começa a duvidar",
    descricao:
      "Você passa a reunião explicando por que os dados são diferentes em cada tela. A confiança cai — e junto com ela, a conta.",
  },
];

export default function Problema() {
  return (
    <section className="bg-zinc-900/30 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            O problema que todo gestor{" "}
            <span className="text-indigo-400">conhece de perto</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Se você se identifica com pelo menos um desses cenários, o GetDashia
            foi feito pra você.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {itens.map(({ Icone, titulo, descricao }) => (
            <Card
              key={titulo}
              className="gap-0 border border-zinc-800 bg-zinc-900/60 p-6 ring-0"
            >
              <div className="mb-4 inline-flex rounded-xl bg-indigo-950/60 p-3 text-indigo-400">
                <Icone className="size-6" />
              </div>
              <h3 className="mb-2 text-base font-semibold leading-snug text-zinc-100">
                {titulo}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">{descricao}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
