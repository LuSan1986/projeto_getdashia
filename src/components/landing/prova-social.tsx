interface Plataforma {
  nome: string;
  cor: string;
  glowFull: string;
  glowSoft: string;
  borderColor: string;
}

const plataformas: Plataforma[] = [
  {
    nome: "Google Ads",
    cor: "#06B6D4",
    glowFull: "rgba(6,182,212,0.70)",
    glowSoft: "rgba(6,182,212,0.12)",
    borderColor: "rgba(6,182,212,0.40)",
  },
  {
    nome: "Meta Ads",
    cor: "#3B82F6",
    glowFull: "rgba(59,130,246,0.70)",
    glowSoft: "rgba(59,130,246,0.12)",
    borderColor: "rgba(59,130,246,0.40)",
  },
  {
    nome: "Google Analytics",
    cor: "#F59E0B",
    glowFull: "rgba(245,158,11,0.70)",
    glowSoft: "rgba(245,158,11,0.12)",
    borderColor: "rgba(245,158,11,0.40)",
  },
  {
    nome: "Shopify",
    cor: "#10B981",
    glowFull: "rgba(16,185,129,0.70)",
    glowSoft: "rgba(16,185,129,0.12)",
    borderColor: "rgba(16,185,129,0.40)",
  },
  {
    nome: "Hotmart",
    cor: "#E879F9",
    glowFull: "rgba(232,121,249,0.70)",
    glowSoft: "rgba(232,121,249,0.12)",
    borderColor: "rgba(232,121,249,0.40)",
  },
  {
    nome: "Kiwify",
    cor: "#A855F7",
    glowFull: "rgba(168,85,247,0.70)",
    glowSoft: "rgba(168,85,247,0.12)",
    borderColor: "rgba(168,85,247,0.40)",
  },
];

export default function ProvaSocial() {
  return (
    <section
      className="relative px-4 py-20 overflow-hidden"
      style={{ background: "#050B18" }}
    >
      <style>{`
        @keyframes dot-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px rgba(6,182,212,0.8); }
          50%       { opacity: 0.4; box-shadow: 0 0 10px rgba(6,182,212,0.4); }
        }
        .integ-badge {
          background: rgba(10,15,30,0.80);
          backdrop-filter: blur(8px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .integ-badge:hover {
          transform: translateY(-3px);
        }
      `}</style>

      {/* ── Traços PCB sutis ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <svg
          width="100%" height="100%"
          viewBox="0 0 1440 500"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Traço 1 — horizontal topo */}
          <path d="M 0 80 H 320 V 48 H 640 V 80 H 900"
                stroke="rgba(6,182,212,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="320" cy="80" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="320" cy="48" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="640" cy="48" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="640" cy="80" r="1.5" fill="rgba(6,182,212,0.14)"/>

          {/* Traço 2 — horizontal inferior */}
          <path d="M 540 420 H 820 V 452 H 1100 V 420 H 1440"
                stroke="rgba(6,182,212,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="820"  cy="420" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="820"  cy="452" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="1100" cy="452" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="1100" cy="420" r="1.5" fill="rgba(6,182,212,0.14)"/>

          {/* Traço 3 — lateral esquerda */}
          <path d="M 50 0 V 160 H 18 V 340 H 60 V 500"
                stroke="rgba(6,182,212,0.06)" strokeWidth="1" fill="none"/>
          <circle cx="18" cy="160" r="1.5" fill="rgba(6,182,212,0.12)"/>
          <circle cx="18" cy="340" r="1.5" fill="rgba(6,182,212,0.12)"/>
          <circle cx="60" cy="340" r="1.5" fill="rgba(6,182,212,0.12)"/>
        </svg>
      </div>

      {/* Glow central suave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* ── Título ── */}
        <h2
          className="text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "#E2E8F0" }}
        >
          Funciona com as ferramentas{" "}
          <br className="hidden sm:block" />
          <span
            style={{
              background: "linear-gradient(90deg, #06B6D4 0%, #E879F9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            que você já usa
          </span>
        </h2>

        {/* Linha decorativa */}
        <div
          className="mx-auto mt-4 h-px w-56"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #06B6D4 30%, #E879F9 70%, transparent 100%)",
          }}
        />

        <p className="mt-5 text-lg" style={{ color: "#94A3B8" }}>
          Conexão via API oficial. Seus dados sempre atualizados.
        </p>

        {/* ── Badges das plataformas ── */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {plataformas.map(({ nome, cor, glowFull, glowSoft, borderColor }) => (
            <div
              key={nome}
              className="integ-badge rounded-xl px-5 py-3"
              style={{
                border: `1px solid ${borderColor}`,
                boxShadow: `0 0 16px ${glowSoft}, inset 0 1px 0 ${glowSoft}`,
              }}
            >
              {/* Dot colorido + nome */}
              <span className="inline-flex items-center gap-2.5">
                <span
                  className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background: cor,
                    boxShadow: `0 0 6px ${glowFull}`,
                  }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "#E2E8F0" }}
                >
                  {nome}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* ── Rodapé — mais integrações ── */}
        <p
          className="mt-8 inline-flex items-center gap-2 text-sm"
          style={{ color: "#64748B" }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "#06B6D4", animation: "dot-pulse 2s ease-in-out infinite" }}
          />
          Mais integrações chegando em breve.
        </p>
      </div>
    </section>
  );
}
