import { PlugZap, LayoutDashboard, FileDown, type LucideIcon } from "lucide-react";

interface Passo {
  numero: number;
  Icone: LucideIcon;
  titulo: string;
  descricao: string;
}

const passos: Passo[] = [
  {
    numero: 1,
    Icone: PlugZap,
    titulo: "Conecte suas plataformas",
    descricao:
      "Vincule Google Ads, Meta Ads e sua loja em menos de 5 minutos. Sem código, sem planilha, sem dor de cabeça.",
  },
  {
    numero: 2,
    Icone: LayoutDashboard,
    titulo: "Visualize a jornada real",
    descricao:
      "Veja quais canais tocaram cada cliente antes da compra — e qual deles foi decisivo para fechar a venda.",
  },
  {
    numero: 3,
    Icone: FileDown,
    titulo: "Exporte e impressione",
    descricao:
      "Gere relatórios em PDF com sua marca e envie pro cliente automaticamente toda semana ou todo mês.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="scroll-mt-16 bg-zinc-950 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Como funciona o{" "}
            <span className="text-indigo-400">GetDashia</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Três passos para parar de perder tempo e começar a impressionar
            clientes.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {passos.map(({ numero, Icone, titulo, descricao }) => (
            <div
              key={numero}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              <span
                className="mb-3 select-none text-6xl font-bold leading-none text-indigo-400/20"
                aria-hidden
              >
                {String(numero).padStart(2, "0")}
              </span>
              <div className="mb-4 inline-flex rounded-xl bg-indigo-950/60 p-3 text-indigo-400">
                <Icone className="size-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-100">
                {titulo}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">{descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
