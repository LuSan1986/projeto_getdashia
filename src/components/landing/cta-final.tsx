'use client'

import Link from "next/link";

export default function CtaFinal() {
  return (
    <section
      className="relative overflow-hidden px-4 py-28 text-center"
      style={{ background: "#050B18" }}
    >
      {/* PCB traces */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 1440 400"
             preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 80 H 250 V 40 H 550 V 80 H 850"
                stroke="rgba(6,182,212,0.08)" strokeWidth="1" fill="none"/>
          <circle cx="250" cy="80" r="2" fill="rgba(6,182,212,0.16)"/>
          <circle cx="250" cy="40" r="2" fill="rgba(6,182,212,0.16)"/>
          <circle cx="550" cy="40" r="2" fill="rgba(6,182,212,0.16)"/>
          <circle cx="550" cy="80" r="2" fill="rgba(6,182,212,0.16)"/>

          <path d="M 600 320 H 900 V 360 H 1200 V 320 H 1440"
                stroke="rgba(232,121,249,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="900"  cy="320" r="2" fill="rgba(232,121,249,0.14)"/>
          <circle cx="900"  cy="360" r="2" fill="rgba(232,121,249,0.14)"/>
          <circle cx="1200" cy="360" r="2" fill="rgba(232,121,249,0.14)"/>
          <circle cx="1200" cy="320" r="2" fill="rgba(232,121,249,0.14)"/>
        </svg>
      </div>

      {/* Glow central */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(232,121,249,0.08) 0%, rgba(6,182,212,0.04) 50%, transparent 80%)", zIndex: 0 }}/>

      {/* Linha topo */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
           style={{ background: "linear-gradient(90deg, transparent 0%, #06B6D4 30%, #E879F9 70%, transparent 100%)", zIndex: 1 }}/>

      <div className="relative z-10 mx-auto max-w-3xl">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
             style={{ borderColor: "rgba(6,182,212,0.30)", background: "rgba(6,182,212,0.08)" }}>
          <span className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#06B6D4", boxShadow: "0 0 6px #06B6D4" }}/>
          <span className="text-xs font-medium" style={{ color: "#06B6D4" }}>
            Acesso antecipado disponível
          </span>
        </div>

        {/* Título */}
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: "#E2E8F0", lineHeight: 1.2 }}>
          Seu trabalho é{" "}
          <span style={{
            background: "linear-gradient(90deg, #06B6D4 0%, #E879F9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            gerar resultado,
          </span>
          <br />
          não montar relatório no Slides.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg" style={{ color: "#94A3B8" }}>
          Garanta acesso antecipado ao GetDashia e seja um dos primeiros a testar
          antes do lançamento oficial.
        </p>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href="#waitlist"
            style={{
              display: "inline-block",
              background: "linear-gradient(90deg, #06B6D4, #E879F9)",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "14px 36px",
              borderRadius: "14px",
              boxShadow: "0 0 30px rgba(232,121,249,0.30), 0 0 60px rgba(6,182,212,0.15)",
              textDecoration: "none",
            }}
          >
            Garantir meu lugar →
          </Link>
        </div>

        <p className="mt-4 text-sm" style={{ color: "#475569" }}>
          Sem cartão de crédito. Cancele quando quiser.
        </p>
      </div>

      {/* Linha rodapé */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px"
           style={{ background: "linear-gradient(90deg, transparent 0%, #E879F9 30%, #06B6D4 70%, transparent 100%)", zIndex: 1 }}/>
    </section>
  );
}
