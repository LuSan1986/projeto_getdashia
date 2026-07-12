import {
  Network,
  Gauge,
  FileDown,
  Users,
  Paintbrush,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

interface ItemFuncionalidade {
  Icone: LucideIcon;
  nome: string;
  descricao: string;
  cor: string;
  glowFull: string;
  glowSoft: string;
  iconBg: string;
  iconBorder: string;
}

const itens: ItemFuncionalidade[] = [
  {
    Icone: Network,
    nome: "Atribuição multi-touch",
    descricao:
      "5 modelos de atribuição mostram qual canal realmente gerou cada venda na jornada completa do cliente.",
    cor: "#06B6D4",
    glowFull: "rgba(6,182,212,0.85)",
    glowSoft: "rgba(6,182,212,0.10)",
    iconBg:   "rgba(6,182,212,0.10)",
    iconBorder: "rgba(6,182,212,0.30)",
  },
  {
    Icone: Gauge,
    nome: "Dashboard em tempo real",
    descricao:
      "CPA, ROAS, gasto total e conversões atualizados automaticamente — sem F5, sem espera.",
    cor: "#E879F9",
    glowFull: "rgba(232,121,249,0.85)",
    glowSoft: "rgba(232,121,249,0.10)",
    iconBg:   "rgba(232,121,249,0.10)",
    iconBorder: "rgba(232,121,249,0.30)",
  },
  {
    Icone: FileDown,
    nome: "Relatório PDF agendado",
    descricao:
      "Configure uma vez e receba relatórios prontos por e-mail toda semana, com a cara da sua agência.",
    cor: "#A855F7",
    glowFull: "rgba(168,85,247,0.85)",
    glowSoft: "rgba(168,85,247,0.10)",
    iconBg:   "rgba(168,85,247,0.10)",
    iconBorder: "rgba(168,85,247,0.30)",
  },
  {
    Icone: Users,
    nome: "Gestão multi-cliente",
    descricao:
      "Cada cliente em seu próprio painel isolado — nenhum dado se mistura, nenhuma confusão de contas.",
    cor: "#3B82F6",
    glowFull: "rgba(59,130,246,0.85)",
    glowSoft: "rgba(59,130,246,0.10)",
    iconBg:   "rgba(59,130,246,0.10)",
    iconBorder: "rgba(59,130,246,0.30)",
  },
  {
    Icone: Paintbrush,
    nome: "White-label para agências",
    descricao:
      "Entregue dashboards com a identidade da sua agência. O cliente vê a sua marca, não a nossa.",
    cor: "#10B981",
    glowFull: "rgba(16,185,129,0.85)",
    glowSoft: "rgba(16,185,129,0.10)",
    iconBg:   "rgba(16,185,129,0.10)",
    iconBorder: "rgba(16,185,129,0.30)",
  },
  {
    Icone: SlidersHorizontal,
    nome: "Filtros e comparativos",
    descricao:
      "Filtre por período, canal, campanha e ROAS mínimo. Compare resultados lado a lado em segundos.",
    cor: "#F59E0B",
    glowFull: "rgba(245,158,11,0.85)",
    glowSoft: "rgba(245,158,11,0.10)",
    iconBg:   "rgba(245,158,11,0.10)",
    iconBorder: "rgba(245,158,11,0.30)",
  },
];

export default function Funcionalidades() {
  return (
    <section
      id="funcionalidades"
      className="scroll-mt-16 relative px-4 py-24 overflow-hidden"
      style={{ background: "#050B18" }}
    >
      <style>{`
        .func-card {
          background: rgba(10,15,30,0.80);
          border: 1px solid rgba(6,182,212,0.20);
          box-shadow: 0 0 20px rgba(6,182,212,0.04), 0 4px 24px rgba(0,0,0,0.40), inset 0 1px 0 rgba(6,182,212,0.08);
          backdrop-filter: blur(8px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .func-card:hover {
          border-color: rgba(6,182,212,0.45);
          box-shadow: 0 0 28px rgba(6,182,212,0.10), 0 8px 40px rgba(0,0,0,0.50), inset 0 1px 0 rgba(6,182,212,0.18);
          transform: translateY(-4px);
        }
        .func-icon {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .func-card:hover .func-icon {
          transform: scale(1.10);
        }
      `}</style>

      {/* ── Traços PCB sutis ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <svg
          width="100%" height="100%"
          viewBox="0 0 1440 700"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Traço 1 — topo-esquerdo em L */}
          <path d="M 0 100 H 260 V 60 H 520 V 100 H 720"
                stroke="rgba(6,182,212,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="260" cy="100" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="260" cy="60"  r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="520" cy="60"  r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="520" cy="100" r="1.5" fill="rgba(6,182,212,0.14)"/>

          {/* Traço 2 — inferior diagonal em L */}
          <path d="M 1440 600 H 1180 V 640 H 860 V 600 H 640"
                stroke="rgba(6,182,212,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="1180" cy="600" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="1180" cy="640" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="860"  cy="640" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="860"  cy="600" r="1.5" fill="rgba(6,182,212,0.14)"/>

          {/* Traço 3 — vertical esquerda */}
          <path d="M 40 0 V 180 H 90 V 380 H 30 V 560"
                stroke="rgba(6,182,212,0.06)" strokeWidth="1" fill="none"/>
          <circle cx="90" cy="180" r="1.5" fill="rgba(6,182,212,0.12)"/>
          <circle cx="90" cy="380" r="1.5" fill="rgba(6,182,212,0.12)"/>
          <circle cx="30" cy="380" r="1.5" fill="rgba(6,182,212,0.12)"/>

          {/* Traço 4 — vertical direita */}
          <path d="M 1400 120 H 1340 V 300 H 1410 V 480 H 1360 V 600"
                stroke="rgba(6,182,212,0.06)" strokeWidth="1" fill="none"/>
          <circle cx="1340" cy="120" r="1.5" fill="rgba(6,182,212,0.12)"/>
          <circle cx="1340" cy="300" r="1.5" fill="rgba(6,182,212,0.12)"/>
          <circle cx="1410" cy="300" r="1.5" fill="rgba(6,182,212,0.12)"/>
          <circle cx="1410" cy="480" r="1.5" fill="rgba(6,182,212,0.12)"/>
          <circle cx="1360" cy="480" r="1.5" fill="rgba(6,182,212,0.12)"/>
        </svg>
      </div>

      {/* Glow topo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 25% at 50% 0%, rgba(6,182,212,0.05) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Cabeçalho ── */}
        <div className="mb-16 text-center">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "#E2E8F0" }}
          >
            Tudo que você precisa{" "}
            <br className="hidden sm:block" />
            <span
              style={{
                background: "linear-gradient(90deg, #06B6D4 0%, #E879F9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              em um só lugar
            </span>
          </h2>

          {/* Linha decorativa */}
          <div
            className="mx-auto mt-5 h-px w-64"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #06B6D4 25%, #E879F9 75%, transparent 100%)",
            }}
          />

          <p className="mt-6 text-lg" style={{ color: "#64748B" }}>
            Sem abrir 4 abas. Sem copiar e colar. Só o que importa, organizado
            do jeito certo.
          </p>
        </div>

        {/* ── Grid de cards ── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map(({ Icone, nome, descricao, cor, glowFull, glowSoft, iconBg, iconBorder }) => (
            <div key={nome} className="func-card rounded-2xl p-6">
              {/* Ícone */}
              <div
                className="func-icon mb-4 inline-flex rounded-xl p-3"
                style={{
                  background: iconBg,
                  border: `1px solid ${iconBorder}`,
                  boxShadow: `0 0 14px ${glowSoft}`,
                }}
              >
                <Icone
                  className="size-6"
                  style={{
                    color: cor,
                    filter: `drop-shadow(0 0 6px ${glowFull})`,
                  }}
                />
              </div>

              {/* Texto */}
              <h3
                className="mb-2 text-base leading-snug"
                style={{ color: "#F1F5F9", fontWeight: 600 }}
              >
                {nome}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                {descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
