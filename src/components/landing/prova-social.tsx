const plataformas = [
  {
    nome: "Google Ads",
    logo: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="12" r="8" fill="#4285F4"/>
        <circle cx="11" cy="35" r="8" fill="#FBBC05"/>
        <circle cx="37" cy="35" r="8" fill="#EA4335"/>
        <line x1="24" y1="20" x2="11" y2="27" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <line x1="24" y1="20" x2="37" y2="27" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <line x1="11" y1="35" x2="37" y2="35" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    nome: "Meta Ads",
    logo: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 24C7 17.5 10.5 12.5 15.5 12.5C20 12.5 22.5 16.5 24 24C25.5 31.5 28 35.5 32.5 35.5C37.5 35.5 41 30.5 41 24C41 17.5 37.5 12.5 32.5 12.5C28 12.5 25.5 16.5 24 24"
          stroke="#0866FF" strokeWidth="4.5" strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    nome: "Google Analytics",
    logo: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5"  y="28" width="10" height="14" rx="2" fill="#F9AB00"/>
        <rect x="19" y="20" width="10" height="22" rx="2" fill="#E37400"/>
        <rect x="33" y="10" width="10" height="32" rx="2" fill="#4285F4"/>
      </svg>
    ),
  },
  {
    nome: "Shopify",
    logo: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31 13C31 13 30.2 8 24 8C17.8 8 17 13 17 13H13L11 40H37L35 13H31Z" fill="#96BF48"/>
        <path d="M21 13C21 13 21 10 24 10C27 10 27 13 27 13" stroke="#5E8E3E" strokeWidth="1.5" fill="none"/>
        <text x="24" y="31" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">S</text>
      </svg>
    ),
  },
  {
    nome: "Hotmart",
    logo: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4C24 4 36 16 36 28C36 35.7 30.6 42 24 42C17.4 42 12 35.7 12 28C12 16 24 4 24 4Z" fill="#FF4C00"/>
        <path d="M24 16C24 16 32 22 32 30C32 34.4 28.4 38 24 38C19.6 38 16 34.4 16 30C16 22 24 16 24 16Z" fill="#FF8C00"/>
        <path d="M24 26C24 26 28 28.5 28 31.5C28 33.4 26.2 35 24 35C21.8 35 20 33.4 20 31.5C20 28.5 24 26 24 26Z" fill="#FFD200"/>
      </svg>
    ),
  },
  {
    nome: "Kiwify",
    logo: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kw-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED"/>
            <stop offset="100%" stopColor="#059669"/>
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="40" height="40" rx="10" fill="url(#kw-grad)"/>
        <text x="24" y="33" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="sans-serif">K</text>
      </svg>
    ),
  },
] as const;

export default function ProvaSocial() {
  return (
    <section
      className="relative px-4 py-20 overflow-hidden"
      style={{ background: "#050B18" }}
    >
      <style>{`
        @keyframes pcb-dot-pulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 0.2; }
        }
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
          border-color: rgba(6,182,212,0.60);
          box-shadow: 0 0 40px rgba(6,182,212,0.18), inset 0 1px 0 rgba(6,182,212,0.15);
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

        {/* ── Grid 3x2 com overlay PCB ── */}
        <div className="relative mt-12">

          {/* Connector PCB SVG — fica atrás dos cards */}
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
            <svg width="100%" height="100%" viewBox="0 0 1000 200"
                 preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              {/* Linhas horizontais nas linhas do grid */}
              <line x1="0"    y1="47"  x2="1000" y2="47"  stroke="#06B6D4" strokeWidth="1.5" opacity="0.45"/>
              <line x1="0"    y1="153" x2="1000" y2="153" stroke="#06B6D4" strokeWidth="1.5" opacity="0.45"/>
              {/* Linhas verticais nas colunas */}
              <line x1="159" y1="0"   x2="159"  y2="200" stroke="#06B6D4" strokeWidth="1.5" opacity="0.45"/>
              <line x1="500" y1="0"   x2="500"  y2="200" stroke="#06B6D4" strokeWidth="1.5" opacity="0.45"/>
              <line x1="841" y1="0"   x2="841"  y2="200" stroke="#06B6D4" strokeWidth="1.5" opacity="0.45"/>

              {/* Dots com pulse nas 6 intersecções (centros dos cards) */}
              {([
                [159, 47], [500, 47], [841, 47],
                [159, 153],[500, 153],[841, 153],
              ] as [number, number][]).map(([cx, cy], i) => (
                <g key={i}>
                  {/* Halo pulsante */}
                  <circle cx={cx} cy={cy} r="9" fill="none"
                          stroke="rgba(6,182,212,0.35)" strokeWidth="1">
                    <animate attributeName="r"       values="9;14;9"     dur={`${2.2 + i * 0.3}s`} repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.35;0;0.35" dur={`${2.2 + i * 0.3}s`} repeatCount="indefinite"/>
                  </circle>
                  {/* Dot sólido */}
                  <circle cx={cx} cy={cy} r="5" fill="#06B6D4" opacity="0.75"/>
                </g>
              ))}
            </svg>
          </div>

          {/* Cards — z-index 1 para cobrir as linhas dentro deles */}
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ zIndex: 1 }}>
            {plataformas.map(({ nome, logo }) => (
              <div key={nome} className="integ-card flex items-center gap-4 px-6 py-5">
                <div className="flex-shrink-0">{logo}</div>
                <span className="text-left text-lg font-semibold" style={{ color: "#F1F5F9" }}>
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
