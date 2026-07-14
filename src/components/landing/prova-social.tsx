const plataformas = [
  { nome: "Google Ads",       logo: "/logos/google-ads.jpeg" },
  { nome: "Meta Ads",         logo: "/logos/meta-ads.png" },
  { nome: "Google Analytics", logo: "/logos/google-analytics.png" },
  { nome: "TikTok Ads",       logo: "/logos/tiktok-ads.webp" },
] as const;

export default function ProvaSocial() {
  return (
    <section
      className="relative px-4 py-20 overflow-hidden"
      style={{ background: "#050B18" }}
    >
      <style>{`
        @keyframes dot-pulse {
          0%, 100% { opacity: 1;   box-shadow: 0 0 4px rgba(6,182,212,0.8); }
          50%       { opacity: 0.4; box-shadow: 0 0 10px rgba(6,182,212,0.4); }
        }
        .integ-card {
          background: rgba(15,20,40,0.70);
          border: 1px solid rgba(6,182,212,0.30);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 30px rgba(6,182,212,0.10);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .integ-card:hover {
          border-color: rgba(6,182,212,0.70);
          box-shadow: 0 0 40px rgba(6,182,212,0.22), inset 0 1px 0 rgba(6,182,212,0.15);
          transform: translateY(-3px);
        }
      `}</style>

      {/* ── Traços PCB de fundo ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 1440 500"
             preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 80 H 300 V 50 H 620 V 80 H 920"
                stroke="rgba(6,182,212,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="300" cy="80" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="300" cy="50" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="620" cy="50" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="620" cy="80" r="1.5" fill="rgba(6,182,212,0.14)"/>

          <path d="M 520 420 H 800 V 450 H 1080 V 420 H 1440"
                stroke="rgba(6,182,212,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="800"  cy="420" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="800"  cy="450" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="1080" cy="450" r="1.5" fill="rgba(6,182,212,0.14)"/>
          <circle cx="1080" cy="420" r="1.5" fill="rgba(6,182,212,0.14)"/>

          <path d="M 48 0 V 180 H 16 V 360 H 56 V 500"
                stroke="rgba(6,182,212,0.06)" strokeWidth="1" fill="none"/>
          <circle cx="16" cy="180" r="1.5" fill="rgba(6,182,212,0.12)"/>
          <circle cx="16" cy="360" r="1.5" fill="rgba(6,182,212,0.12)"/>
          <circle cx="56" cy="360" r="1.5" fill="rgba(6,182,212,0.12)"/>
        </svg>
      </div>

      {/* Glow central */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)", zIndex: 0 }}/>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* ── Título ── */}
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "#E2E8F0" }}>
          Funciona com as ferramentas{" "}
          <br className="hidden sm:block"/>
          <span style={{
            background: "linear-gradient(90deg, #06B6D4 0%, #E879F9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            que você já usa
          </span>
        </h2>

        <div className="mx-auto mt-4 h-px w-56" style={{
          background: "linear-gradient(90deg, transparent 0%, #06B6D4 30%, #E879F9 70%, transparent 100%)",
        }}/>

        <p className="mt-5 text-lg" style={{ color: "#94A3B8" }}>
          Conexão via API oficial. Seus dados sempre atualizados.
        </p>

        {/* ── Grid 2x2 com conexões PCB ── */}
        <div className="relative mt-12 mx-auto" style={{ maxWidth: 700 }}>

          {/* Connector PCB SVG — fica atrás dos cards */}
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
            <svg width="100%" height="100%" viewBox="0 0 1000 420"
                 preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              {/* Horizontal — linha de cima (centro da linha 1) */}
              <line x1="0"   y1="93"  x2="1000" y2="93"  stroke="#06B6D4" strokeWidth="1.5" opacity="0.6"/>
              {/* Horizontal — linha de baixo (centro da linha 2) */}
              <line x1="0"   y1="327" x2="1000" y2="327" stroke="#06B6D4" strokeWidth="1.5" opacity="0.6"/>
              {/* Vertical — coluna esquerda (centro da col 1) */}
              <line x1="241" y1="0"   x2="241"  y2="420" stroke="#06B6D4" strokeWidth="1.5" opacity="0.6"/>
              {/* Vertical — coluna direita (centro da col 2) */}
              <line x1="759" y1="0"   x2="759"  y2="420" stroke="#06B6D4" strokeWidth="1.5" opacity="0.6"/>

              {/* Dots com glow nos 4 pontos centrais */}
              {([
                [241, 93], [759, 93], [241, 327], [759, 327],
              ] as [number, number][]).map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="9" fill="none"
                          stroke="rgba(6,182,212,0.40)" strokeWidth="1">
                    <animate attributeName="r"       values="9;15;9"       dur={`${2.2 + i * 0.3}s`} repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.40;0;0.40"  dur={`${2.2 + i * 0.3}s`} repeatCount="indefinite"/>
                  </circle>
                  <circle cx={cx} cy={cy} r="5" fill="#06B6D4" opacity="0.85"
                          style={{ filter: "drop-shadow(0 0 4px rgba(6,182,212,0.9))" }}/>
                </g>
              ))}
            </svg>
          </div>

          {/* Cards — z-index 1 para cobrir as linhas internas */}
          <div className="relative grid grid-cols-2 gap-6" style={{ zIndex: 1 }}>
            {plataformas.map(({ nome, logo }) => (
              <div key={nome} className="integ-card flex items-center gap-4 px-6 py-5">
                <div style={{
                  background: 'white',
                  borderRadius: '10px',
                  padding: '6px',
                  width: '52px',
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo}
                    alt={nome}
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  />
                </div>
                <span className="text-left font-semibold" style={{ color: "#F1F5F9", fontSize: "1.1rem" }}>
                  {nome}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Rodapé ── */}
        <p className="mt-8 inline-flex items-center gap-2 text-sm" style={{ color: "#64748B" }}>
          <span className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#06B6D4", animation: "dot-pulse 2s ease-in-out infinite" }}/>
          Mais integrações chegando em breve.
        </p>
      </div>
    </section>
  );
}
