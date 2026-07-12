import { PlugZap, LayoutDashboard, FileDown, type LucideIcon } from "lucide-react";

interface Passo {
  numero: number;
  Icone: LucideIcon;
  titulo: string;
  descricao: string;
  cor: string;
  glowFull: string;
  glowMid: string;
  glowSoft: string;
  iconBg: string;
  iconBorder: string;
  lineBg: string;
}

const passos: Passo[] = [
  {
    numero: 1,
    Icone: PlugZap,
    titulo: "Conecte suas plataformas",
    descricao:
      "Vincule Google Ads, Meta Ads e sua loja em menos de 5 minutos. Sem código, sem planilha, sem dor de cabeça.",
    cor: "#06B6D4",
    glowFull: "rgba(6,182,212,0.85)",
    glowMid:  "rgba(6,182,212,0.40)",
    glowSoft: "rgba(6,182,212,0.12)",
    iconBg:   "rgba(6,182,212,0.08)",
    iconBorder: "rgba(6,182,212,0.38)",
    lineBg: "linear-gradient(to bottom, #06B6D4, transparent)",
  },
  {
    numero: 2,
    Icone: LayoutDashboard,
    titulo: "Visualize a jornada real",
    descricao:
      "Veja quais canais tocaram cada cliente antes da compra — e qual deles foi decisivo para fechar a venda.",
    cor: "#E879F9",
    glowFull: "rgba(232,121,249,0.85)",
    glowMid:  "rgba(232,121,249,0.40)",
    glowSoft: "rgba(232,121,249,0.12)",
    iconBg:   "rgba(232,121,249,0.08)",
    iconBorder: "rgba(232,121,249,0.38)",
    lineBg: "linear-gradient(to bottom, #E879F9, transparent)",
  },
  {
    numero: 3,
    Icone: FileDown,
    titulo: "Exporte e impressione",
    descricao:
      "Gere relatórios em PDF com sua marca e envie pro cliente automaticamente toda semana ou todo mês.",
    cor: "#A855F7",
    glowFull: "rgba(168,85,247,0.85)",
    glowMid:  "rgba(168,85,247,0.40)",
    glowSoft: "rgba(168,85,247,0.12)",
    iconBg:   "rgba(168,85,247,0.08)",
    iconBorder: "rgba(168,85,247,0.38)",
    lineBg: "linear-gradient(to bottom, #A855F7, transparent)",
  },
];

export default function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-16 relative px-4 py-24 overflow-hidden"
      style={{ background: "#050B18" }}
    >
      <style>{`
        .cf-icon-ring {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .cf-passo:hover .cf-icon-ring {
          transform: scale(1.08);
        }
      `}</style>

      {/* ── Traços PCB de fundo conectando os passos ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <svg
          width="100%" height="100%"
          viewBox="0 0 1440 700"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Traço 1 — horizontal superior ligando os passos */}
          <path d="M 140 120 H 480 V 80 H 760 V 120 H 1100 V 80 H 1300"
                stroke="rgba(6,182,212,0.08)" strokeWidth="1" fill="none"/>
          <circle cx="480"  cy="120" r="2" fill="rgba(6,182,212,0.15)"/>
          <circle cx="480"  cy="80"  r="2" fill="rgba(6,182,212,0.15)"/>
          <circle cx="760"  cy="80"  r="2" fill="rgba(6,182,212,0.15)"/>
          <circle cx="760"  cy="120" r="2" fill="rgba(6,182,212,0.15)"/>
          <circle cx="1100" cy="120" r="2" fill="rgba(6,182,212,0.15)"/>
          <circle cx="1100" cy="80"  r="2" fill="rgba(6,182,212,0.15)"/>

          {/* Traço 2 — horizontal inferior */}
          <path d="M 0 560 H 340 V 600 H 640 V 560 H 960 V 600 H 1260 V 560 H 1440"
                stroke="rgba(6,182,212,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="340"  cy="560" r="2" fill="rgba(6,182,212,0.13)"/>
          <circle cx="340"  cy="600" r="2" fill="rgba(6,182,212,0.13)"/>
          <circle cx="640"  cy="600" r="2" fill="rgba(6,182,212,0.13)"/>
          <circle cx="640"  cy="560" r="2" fill="rgba(6,182,212,0.13)"/>
          <circle cx="960"  cy="560" r="2" fill="rgba(6,182,212,0.13)"/>
          <circle cx="960"  cy="600" r="2" fill="rgba(6,182,212,0.13)"/>
          <circle cx="1260" cy="600" r="2" fill="rgba(6,182,212,0.13)"/>
          <circle cx="1260" cy="560" r="2" fill="rgba(6,182,212,0.13)"/>

          {/* Traço 3 — lateral esquerda */}
          <path d="M 30 0 V 220 H 80 V 380 H 20 V 560"
                stroke="rgba(6,182,212,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="80" cy="220" r="2" fill="rgba(6,182,212,0.12)"/>
          <circle cx="80" cy="380" r="2" fill="rgba(6,182,212,0.12)"/>
          <circle cx="20" cy="380" r="2" fill="rgba(6,182,212,0.12)"/>

          {/* Traço 4 — lateral direita */}
          <path d="M 1410 140 H 1360 V 320 H 1420 V 480 H 1380"
                stroke="rgba(6,182,212,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="1360" cy="140" r="2" fill="rgba(6,182,212,0.12)"/>
          <circle cx="1360" cy="320" r="2" fill="rgba(6,182,212,0.12)"/>
          <circle cx="1420" cy="320" r="2" fill="rgba(6,182,212,0.12)"/>
          <circle cx="1420" cy="480" r="2" fill="rgba(6,182,212,0.12)"/>
        </svg>
      </div>

      {/* Glow topo suave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 50% 0%, rgba(6,182,212,0.05) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Cabeçalho ── */}
        <div className="mb-20 text-center">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "#E2E8F0" }}
          >
            Como funciona o{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #06B6D4 0%, #E879F9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              GetDashia
            </span>
          </h2>

          {/* Linha decorativa */}
          <div
            className="mx-auto mt-5 h-px w-56"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #06B6D4 25%, #E879F9 75%, transparent 100%)",
            }}
          />

          <p className="mt-6 text-lg" style={{ color: "#64748B" }}>
            Três passos para parar de perder tempo e começar a impressionar
            clientes.
          </p>
        </div>

        {/* ── Grid de passos ── */}
        <div className="relative grid gap-16 md:grid-cols-3 md:gap-8">

          {/* ── Linha conectora tracejada (desktop) ── */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 hidden md:block"
            style={{ top: "10.5rem", zIndex: 0 }}
          >
            <svg
              width="100%" height="12"
              viewBox="0 0 900 12"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Segmento passo 1 → passo 2 */}
              <line
                x1="150" y1="6" x2="450" y2="6"
                stroke="rgba(6,182,212,0.35)"
                strokeWidth="1"
                strokeDasharray="5 5"
              />
              {/* Segmento passo 2 → passo 3 */}
              <line
                x1="450" y1="6" x2="750" y2="6"
                stroke="rgba(168,85,247,0.30)"
                strokeWidth="1"
                strokeDasharray="5 5"
              />
              {/* Dots nos pontos de conexão */}
              <circle cx="150" cy="6" r="3.5" fill="rgba(6,182,212,0.60)"/>
              <circle cx="450" cy="6" r="3.5" fill="rgba(232,121,249,0.55)"/>
              <circle cx="750" cy="6" r="3.5" fill="rgba(168,85,247,0.55)"/>
              {/* Halos nos dots */}
              <circle cx="150" cy="6" r="6" fill="none" stroke="rgba(6,182,212,0.25)" strokeWidth="1"/>
              <circle cx="450" cy="6" r="6" fill="none" stroke="rgba(232,121,249,0.20)" strokeWidth="1"/>
              <circle cx="750" cy="6" r="6" fill="none" stroke="rgba(168,85,247,0.20)" strokeWidth="1"/>
            </svg>
          </div>

          {/* ── Passos ── */}
          {passos.map(({ numero, Icone, titulo, descricao, cor, glowFull, glowMid, glowSoft, iconBg, iconBorder, lineBg }) => (
            <div
              key={numero}
              className="cf-passo relative flex flex-col items-center text-center"
              style={{ zIndex: 1 }}
            >
              {/* Número grande */}
              <span
                aria-hidden
                className="select-none leading-none mb-0"
                style={{
                  fontSize: "5rem",
                  fontWeight: 800,
                  color: cor,
                  textShadow: `0 0 30px ${glowFull}, 0 0 60px ${glowMid}`,
                  lineHeight: 1,
                }}
              >
                {String(numero).padStart(2, "0")}
              </span>

              {/* Linha vertical número → ícone */}
              <div
                className="my-3"
                style={{
                  width: "1px",
                  height: "2rem",
                  background: lineBg,
                  margin: "0.5rem auto",
                }}
              />

              {/* Círculo do ícone */}
              <div
                className="cf-icon-ring mb-5 inline-flex rounded-full p-4"
                style={{
                  background: iconBg,
                  border: `1px solid ${iconBorder}`,
                  boxShadow: `0 0 20px ${glowSoft}, inset 0 0 12px ${glowSoft}`,
                }}
              >
                <Icone
                  className="size-7"
                  style={{
                    color: cor,
                    filter: `drop-shadow(0 0 6px ${glowFull})`,
                  }}
                />
              </div>

              {/* Texto */}
              <h3
                className="mb-2 text-lg font-semibold"
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
