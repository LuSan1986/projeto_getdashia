'use client'

import Link from "next/link";

const colunas = [
  {
    titulo: "Produto",
    links: [
      { label: "Recursos", href: "#funcionalidades" },
      { label: "Preços", href: "#planos" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    titulo: "Empresa",
    links: [
      { label: "Sobre nós", href: "/sobre" },
      { label: "Blog", href: "/blog" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    titulo: "Legal",
    links: [
      { label: "Política de Privacidade", href: "/privacidade" },
      { label: "Termos de Uso", href: "/termos" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative px-4 py-16 overflow-hidden"
      style={{ background: "#030810", borderTop: "1px solid rgba(6,182,212,0.15)" }}
    >
      {/* Linha neon topo */}
      <div aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-px"
           style={{ background: "linear-gradient(90deg, transparent 0%, #06B6D4 30%, #E879F9 70%, transparent 100%)" }}/>

      {/* PCB traces */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: 0.6 }}>
        <svg width="100%" height="100%" viewBox="0 0 1440 300"
             preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 60 H 180 V 30 H 400"
                stroke="rgba(6,182,212,0.06)" strokeWidth="1" fill="none"/>
          <circle cx="180" cy="60" r="1.5" fill="rgba(6,182,212,0.12)"/>
          <circle cx="180" cy="30" r="1.5" fill="rgba(6,182,212,0.12)"/>

          <path d="M 1440 220 H 1200 V 250 H 1000"
                stroke="rgba(232,121,249,0.05)" strokeWidth="1" fill="none"/>
          <circle cx="1200" cy="220" r="1.5" fill="rgba(232,121,249,0.10)"/>
          <circle cx="1200" cy="250" r="1.5" fill="rgba(232,121,249,0.10)"/>

          <path d="M 700 0 V 80 H 720 V 180 H 700"
                stroke="rgba(168,85,247,0.04)" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Logo + tagline */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight"
                  style={{
                    background: "linear-gradient(90deg, #06B6D4, #E879F9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
              GetDashia
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed" style={{ color: "#475569" }}>
              Atribuição multi-canal para gestores de tráfego e agências de
              marketing digital.
            </p>

            {/* Status dot */}
            <div className="mt-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: "#06B6D4",
                      boxShadow: "0 0 6px #06B6D4",
                      animation: "footer-pulse 2s ease-in-out infinite",
                    }}/>
              <span className="text-xs" style={{ color: "#06B6D4" }}>Sistema operacional</span>
            </div>
          </div>

          {/* Colunas de links */}
          {colunas.map((coluna) => (
            <div key={coluna.titulo}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest"
                 style={{ color: "#334155" }}>
                {coluna.titulo}
              </p>
              <ul className="space-y-3">
                {coluna.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        className="text-sm transition-all duration-200"
                        style={{ color: "#64748B" }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = "#06B6D4"
                          e.currentTarget.style.textShadow = "0 0 8px rgba(6,182,212,0.40)"
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = "#64748B"
                          e.currentTarget.style.textShadow = "none"
                        }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm transition-all duration-200"
                        style={{ color: "#64748B" }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = "#06B6D4"
                          e.currentTarget.style.textShadow = "0 0 8px rgba(6,182,212,0.40)"
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = "#64748B"
                          e.currentTarget.style.textShadow = "none"
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
             style={{ borderTop: "1px solid rgba(6,182,212,0.08)" }}>
          <p className="text-sm" style={{ color: "#1E293B" }}>
            © 2026 GetDashia. Todos os direitos reservados.
          </p>
          <p className="text-sm" style={{ color: "#1E293B" }}>Feito no Brasil 🇧🇷</p>
        </div>
      </div>

      <style>{`
        @keyframes footer-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #06B6D4; }
          50%       { opacity: 0.4; box-shadow: 0 0 12px #06B6D4; }
        }
      `}</style>
    </footer>
  );
}
