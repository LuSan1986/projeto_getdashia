'use client'

import Link from "next/link";
import { Check } from "lucide-react";

interface Plano {
  nome: string;
  preco: string;
  descricao: string;
  features: string[];
  cta: string;
  destaque: boolean;
  accentColor: string;
  borderColor: string;
  glowColor: string;
}

const planos: Plano[] = [
  {
    nome: "Starter",
    preco: "R$ 59,90",
    descricao: "Para gestores que estão começando a profissionalizar os relatórios.",
    destaque: false,
    cta: "Começar no Starter",
    accentColor: "#06B6D4",
    borderColor: "rgba(6,182,212,0.30)",
    glowColor: "rgba(6,182,212,0.10)",
    features: [
      "1 integração (Google Ads ou Meta Ads)",
      "Dashboard básico com métricas de campanha",
      "Dados dos últimos 30 dias",
      "1 organização",
      "7 dias grátis para testar",
    ],
  },
  {
    nome: "Pro",
    preco: "R$ 97,00",
    descricao: "Para gestores com carteira de clientes que precisam escalar.",
    destaque: true,
    cta: "Começar no Pro",
    accentColor: "#E879F9",
    borderColor: "rgba(232,121,249,0.50)",
    glowColor: "rgba(232,121,249,0.15)",
    features: [
      "Google Ads + Meta Ads conectados",
      "Dashboard completo com CPA e ROAS",
      "Dados dos últimos 90 dias",
      "1 organização",
      "7 dias grátis para testar",
    ],
  },
  {
    nome: "Business",
    preco: "R$ 197,00",
    descricao: "Para agências e times com múltiplos clientes e alto volume.",
    destaque: false,
    cta: "Começar no Business",
    accentColor: "#A855F7",
    borderColor: "rgba(168,85,247,0.30)",
    glowColor: "rgba(168,85,247,0.10)",
    features: [
      "Google Ads + Meta Ads conectados",
      "Dashboard completo com CPA e ROAS",
      "Histórico completo de dados",
      "Múltiplas organizações",
      "Suporte prioritário",
      "7 dias grátis para testar",
    ],
  },
];

export default function Planos() {
  return (
    <section
      id="planos"
      className="relative scroll-mt-16 px-4 py-24 overflow-hidden"
      style={{ background: "#050B18" }}
    >
      <style>{`
        @keyframes planos-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>

      {/* PCB traces */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 1440 600"
             preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 120 H 200 V 80 H 500 V 120 H 800"
                stroke="rgba(6,182,212,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="200" cy="120" r="2" fill="rgba(6,182,212,0.15)"/>
          <circle cx="200" cy="80"  r="2" fill="rgba(6,182,212,0.15)"/>
          <circle cx="500" cy="80"  r="2" fill="rgba(6,182,212,0.15)"/>
          <circle cx="500" cy="120" r="2" fill="rgba(6,182,212,0.15)"/>

          <path d="M 640 0 V 200 H 680 V 400 H 640 V 600"
                stroke="rgba(232,121,249,0.06)" strokeWidth="1" fill="none"/>
          <circle cx="640" cy="200" r="2" fill="rgba(232,121,249,0.12)"/>
          <circle cx="680" cy="200" r="2" fill="rgba(232,121,249,0.12)"/>
          <circle cx="680" cy="400" r="2" fill="rgba(232,121,249,0.12)"/>
          <circle cx="640" cy="400" r="2" fill="rgba(232,121,249,0.12)"/>

          <path d="M 900 480 H 1200 V 520 H 1440"
                stroke="rgba(168,85,247,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="1200" cy="480" r="2" fill="rgba(168,85,247,0.14)"/>
          <circle cx="1200" cy="520" r="2" fill="rgba(168,85,247,0.14)"/>
        </svg>
      </div>

      {/* Glow central */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,121,249,0.04) 0%, transparent 70%)", zIndex: 0 }}/>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Título */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#E2E8F0" }}>
            Planos e{" "}
            <span style={{
              background: "linear-gradient(90deg, #06B6D4 0%, #E879F9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              preços
            </span>
          </h2>
          <div className="mx-auto mt-4 h-px w-48" style={{
            background: "linear-gradient(90deg, transparent 0%, #06B6D4 30%, #E879F9 70%, transparent 100%)",
          }}/>
          <p className="mt-5 text-lg" style={{ color: "#94A3B8" }}>
            Sem taxa de setup. Cancele quando quiser.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {planos.map((plano) => (
            <div
              key={plano.nome}
              style={{
                background: plano.destaque
                  ? `rgba(232,121,249,0.07)`
                  : "rgba(10,15,40,0.70)",
                border: `1px solid ${plano.borderColor}`,
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
                boxShadow: plano.destaque
                  ? `0 0 40px ${plano.glowColor}, 0 0 80px rgba(232,121,249,0.06)`
                  : `0 0 24px ${plano.glowColor}`,
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"
              }}
            >
              {/* Badge mais popular */}
              {plano.destaque && (
                <div className="mb-4">
                  <span style={{
                    display: "inline-block",
                    background: "linear-gradient(90deg, #06B6D4, #E879F9)",
                    color: "white",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "3px 12px",
                    borderRadius: "999px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}>
                    Mais popular
                  </span>
                </div>
              )}

              {/* Nome */}
              <p className="text-lg font-bold" style={{ color: plano.accentColor,
                textShadow: `0 0 12px ${plano.accentColor}60` }}>
                {plano.nome}
              </p>

              {/* Preço */}
              <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-bold" style={{ color: "#F1F5F9" }}>
                  {plano.preco}
                </span>
                <span className="mb-1 text-sm" style={{ color: "#64748B" }}>/mês</span>
              </div>

              <p className="mt-2 text-sm" style={{ color: "#64748B" }}>{plano.descricao}</p>

              {/* Divider */}
              <div className="my-6" style={{
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${plano.accentColor}40, transparent)`,
              }}/>

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3">
                {plano.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check size={15} style={{ color: plano.accentColor, flexShrink: 0,
                      filter: `drop-shadow(0 0 4px ${plano.accentColor})` }} />
                    <span className="text-sm" style={{ color: "#CBD5E1" }}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/precos"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  transition: "all 0.2s ease",
                  ...(plano.destaque ? {
                    background: "linear-gradient(90deg, #06B6D4, #E879F9)",
                    color: "white",
                    boxShadow: "0 0 20px rgba(232,121,249,0.30)",
                  } : {
                    background: "transparent",
                    color: plano.accentColor,
                    border: `1px solid ${plano.borderColor}`,
                  }),
                }}
                onMouseEnter={e => {
                  if (!plano.destaque) {
                    (e.currentTarget as HTMLAnchorElement).style.background = `${plano.accentColor}15`
                  }
                }}
                onMouseLeave={e => {
                  if (!plano.destaque) {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent"
                  }
                }}
              >
                {plano.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <p className="mt-10 text-center text-sm" style={{ color: "#475569" }}>
          Todos os planos incluem 7 dias grátis. Sem cartão de crédito para começar.
        </p>
      </div>
    </section>
  );
}
