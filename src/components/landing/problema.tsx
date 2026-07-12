import { Clock, GitFork, TrendingDown, type LucideIcon } from "lucide-react";

interface ItemProblema {
  Icone: LucideIcon;
  titulo: string;
  descricao: string;
  cor: string;
  glow: string;
  iconBg: string;
  iconBorder: string;
}

const itens: ItemProblema[] = [
  {
    Icone: Clock,
    titulo: "1 dia inteiro por semana só montando relatório",
    descricao:
      "Você abre Google Ads, Meta, Analytics e uma planilha, copia número a número e ainda assim o relatório sai torto.",
    cor: "#06B6D4",
    glow: "rgba(6,182,212,0.8)",
    iconBg: "rgba(6,182,212,0.10)",
    iconBorder: "rgba(6,182,212,0.30)",
  },
  {
    Icone: GitFork,
    titulo: "Cada plataforma jura que foi ela que fez a venda",
    descricao:
      "Google Ads marcou 30 conversões. Meta Ads também. Mas você vendeu 20. Quem está certo — e o que você faz com isso?",
    cor: "#E879F9",
    glow: "rgba(232,121,249,0.8)",
    iconBg: "rgba(232,121,249,0.08)",
    iconBorder: "rgba(232,121,249,0.30)",
  },
  {
    Icone: TrendingDown,
    titulo: "O cliente não entende os números e começa a duvidar",
    descricao:
      "Você passa a reunião explicando por que os dados são diferentes em cada tela. A confiança cai — e junto com ela, a conta.",
    cor: "#A855F7",
    glow: "rgba(168,85,247,0.8)",
    iconBg: "rgba(168,85,247,0.08)",
    iconBorder: "rgba(168,85,247,0.30)",
  },
];

export default function Problema() {
  return (
    <section
      className="relative px-4 py-24 overflow-hidden"
      style={{ background: "#050B18" }}
    >
      <style>{`
        .prob-card {
          background: rgba(10,15,30,0.80);
          border: 1px solid rgba(6,182,212,0.20);
          box-shadow: 0 0 20px rgba(6,182,212,0.05), inset 0 1px 0 rgba(6,182,212,0.10);
          backdrop-filter: blur(8px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .prob-card:hover {
          border-color: rgba(6,182,212,0.50);
          box-shadow: 0 0 30px rgba(6,182,212,0.12), 0 0 60px rgba(6,182,212,0.06), inset 0 1px 0 rgba(6,182,212,0.20);
          transform: translateY(-3px);
        }
      `}</style>

      {/* ── Traços PCB sutis no fundo ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <svg
          width="100%" height="100%"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Traço 1 — topo-esquerdo */}
          <path d="M 0 80 H 200 V 140 H 380 V 100 H 520"
                stroke="rgba(6,182,212,0.10)" strokeWidth="1" fill="none"/>
          <circle cx="200" cy="80"  r="2" fill="rgba(6,182,212,0.18)"/>
          <circle cx="200" cy="140" r="2" fill="rgba(6,182,212,0.18)"/>
          <circle cx="380" cy="140" r="2" fill="rgba(6,182,212,0.18)"/>
          <circle cx="380" cy="100" r="2" fill="rgba(6,182,212,0.18)"/>
          <circle cx="520" cy="100" r="3" fill="rgba(6,182,212,0.16)"/>

          {/* Traço 2 — inferior-direito */}
          <path d="M 1440 520 H 1280 V 460 H 1100 V 520 H 960"
                stroke="rgba(6,182,212,0.10)" strokeWidth="1" fill="none"/>
          <circle cx="1280" cy="520" r="2" fill="rgba(6,182,212,0.18)"/>
          <circle cx="1280" cy="460" r="2" fill="rgba(6,182,212,0.18)"/>
          <circle cx="1100" cy="460" r="2" fill="rgba(6,182,212,0.18)"/>
          <circle cx="1100" cy="520" r="2" fill="rgba(6,182,212,0.18)"/>
          <circle cx="960"  cy="520" r="3" fill="rgba(6,182,212,0.16)"/>

          {/* Traço 3 — lateral esquerda vertical */}
          <path d="M 60 0 V 200 H 140 V 320 H 40 V 440"
                stroke="rgba(6,182,212,0.08)" strokeWidth="1" fill="none"/>
          <circle cx="60"  cy="200" r="2" fill="rgba(6,182,212,0.15)"/>
          <circle cx="140" cy="200" r="2" fill="rgba(6,182,212,0.15)"/>
          <circle cx="140" cy="320" r="2" fill="rgba(6,182,212,0.15)"/>
          <circle cx="40"  cy="320" r="2" fill="rgba(6,182,212,0.15)"/>

          {/* Traço 4 — lateral direita */}
          <path d="M 1440 180 H 1360 V 280 H 1420 V 380"
                stroke="rgba(6,182,212,0.09)" strokeWidth="1" fill="none"/>
          <circle cx="1360" cy="180" r="2" fill="rgba(6,182,212,0.16)"/>
          <circle cx="1360" cy="280" r="2" fill="rgba(6,182,212,0.16)"/>
          <circle cx="1420" cy="280" r="2" fill="rgba(6,182,212,0.16)"/>
        </svg>
      </div>

      {/* Glow topo suave para fundir com o hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 30% at 50% 0%, rgba(6,182,212,0.06) 0%, transparent 70%)",
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
            O problema que todo gestor{" "}
            <br className="hidden sm:block" />
            <span
              style={{
                background: "linear-gradient(90deg, #06B6D4 0%, #E879F9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              conhece de perto
            </span>
          </h2>

          {/* Linha decorativa ciano → magenta → transparente */}
          <div
            className="mx-auto mt-5 h-px w-72"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #06B6D4 25%, #E879F9 75%, transparent 100%)",
            }}
          />

          <p className="mt-6 text-lg" style={{ color: "#64748B" }}>
            Se você se identifica com pelo menos um desses cenários, o GetDashia
            foi feito pra você.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {itens.map(({ Icone, titulo, descricao, cor, glow, iconBg, iconBorder }) => (
            <div key={titulo} className="prob-card rounded-2xl p-6">
              {/* Ícone */}
              <div
                className="mb-4 inline-flex rounded-xl p-3"
                style={{
                  background: iconBg,
                  border: `1px solid ${iconBorder}`,
                }}
              >
                <Icone
                  className="size-6"
                  style={{
                    color: cor,
                    filter: `drop-shadow(0 0 8px ${glow})`,
                  }}
                />
              </div>

              {/* Texto */}
              <h3
                className="mb-2 text-base font-semibold leading-snug"
                style={{ color: "#F1F5F9" }}
              >
                {titulo}
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
