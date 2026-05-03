import {
  Network,
  Gauge,
  FileDown,
  Users,
  Paintbrush,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface ItemFuncionalidade {
  Icone: LucideIcon;
  nome: string;
  descricao: string;
}

const itens: ItemFuncionalidade[] = [
  {
    Icone: Network,
    nome: "Atribuição multi-touch",
    descricao:
      "5 modelos de atribuição mostram qual canal realmente gerou cada venda na jornada completa do cliente.",
  },
  {
    Icone: Gauge,
    nome: "Dashboard em tempo real",
    descricao:
      "CPA, ROAS, gasto total e conversões atualizados automaticamente — sem F5, sem espera.",
  },
  {
    Icone: FileDown,
    nome: "Relatório PDF agendado",
    descricao:
      "Configure uma vez e receba relatórios prontos por e-mail toda semana, com a cara da sua agência.",
  },
  {
    Icone: Users,
    nome: "Gestão multi-cliente",
    descricao:
      "Cada cliente em seu próprio painel isolado — nenhum dado se mistura, nenhuma confusão de contas.",
  },
  {
    Icone: Paintbrush,
    nome: "White-label para agências",
    descricao:
      "Entregue dashboards com a identidade da sua agência. O cliente vê a sua marca, não a nossa.",
  },
  {
    Icone: SlidersHorizontal,
    nome: "Filtros e comparativos",
    descricao:
      "Filtre por período, canal, campanha e ROAS mínimo. Compare resultados lado a lado em segundos.",
  },
];

export default function Funcionalidades() {
  return (
    <section
      id="funcionalidades"
      className="scroll-mt-16 bg-zinc-900/30 px-4 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Tudo que você precisa{" "}
            <span className="text-indigo-400">em um só lugar</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Sem abrir 4 abas. Sem copiar e colar. Só o que importa, organizado
            do jeito certo.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map(({ Icone, nome, descricao }) => (
            <Card
              key={nome}
              className="gap-0 border border-zinc-800 bg-zinc-900/60 p-6 ring-0"
            >
              <div className="mb-4 inline-flex rounded-xl bg-indigo-950/60 p-3 text-indigo-400">
                <Icone className="size-6" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-zinc-100">
                {nome}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">{descricao}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
