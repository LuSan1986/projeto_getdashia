"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCarregando(true);
    setErro("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error || "Erro ao cadastrar. Tente novamente.");
      } else {
        setEnviado(true);
      }
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section
      className="relative min-h-screen flex items-center px-4 py-24 sm:py-32 overflow-hidden"
      style={{ background: "#050B18" }}
    >
      <style>{`
        @keyframes float {
          from { transform: perspective(1200px) rotateY(-6deg) rotateX(2deg) translateY(0px); }
          to   { transform: perspective(1200px) rotateY(-6deg) rotateX(2deg) translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(6,182,212,0.4), 0 0 20px rgba(6,182,212,0.15); }
          50% { box-shadow: 0 0 16px rgba(6,182,212,0.7), 0 0 40px rgba(6,182,212,0.25); }
        }
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes star-pulse {
          0%, 100% {
            opacity: 0.6;
            text-shadow: 0 0 10px #06B6D4, 0 0 30px rgba(6,182,212,0.5), 0 0 60px rgba(6,182,212,0.2);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 20px #06B6D4, 0 0 50px rgba(6,182,212,0.8), 0 0 90px rgba(6,182,212,0.4), 0 0 120px rgba(124,58,237,0.3);
          }
        }
        .cyber-btn-primary {
          background: linear-gradient(135deg, #22D3EE 0%, #EC4899 100%);
          box-shadow: 0 0 20px rgba(6,182,212,0.4), 0 0 40px rgba(232,121,249,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
          transition: all 0.3s ease;
          color: #fff;
          font-weight: 600;
          border: none;
        }
        .cyber-btn-primary:hover {
          box-shadow: 0 0 30px rgba(6,182,212,0.6), 0 0 60px rgba(232,121,249,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
          transform: translateY(-1px);
        }
        .cyber-btn-magenta {
          background: #D946EF;
          box-shadow: 0 0 16px rgba(217,70,239,0.5), 0 0 32px rgba(232,121,249,0.2), inset 0 1px 0 rgba(255,255,255,0.12);
          transition: all 0.3s ease;
          color: #fff;
          font-weight: 600;
          border: none;
        }
        .cyber-btn-magenta:hover {
          background: #C026D3;
          box-shadow: 0 0 24px rgba(217,70,239,0.7), 0 0 48px rgba(232,121,249,0.3);
          transform: translateY(-1px);
        }
        .cyber-btn-magenta:disabled {
          opacity: 0.6;
        }
        .cyber-btn-secondary {
          border: 1px solid rgba(6,182,212,0.6);
          color: #06B6D4;
          background: transparent;
          box-shadow: 0 0 10px rgba(6,182,212,0.15), inset 0 0 10px rgba(6,182,212,0.05);
          transition: all 0.3s ease;
          font-weight: 500;
        }
        .cyber-btn-secondary:hover {
          border-color: rgba(6,182,212,0.9);
          box-shadow: 0 0 20px rgba(6,182,212,0.3), inset 0 0 20px rgba(6,182,212,0.08);
          color: #67E8F9;
        }
        .cyber-input {
          background: rgba(6,182,212,0.05) !important;
          border: 1px solid rgba(6,182,212,0.6) !important;
          color: #E2E8F0 !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .cyber-input:focus,
        .cyber-input:focus-visible {
          outline: none !important;
          border-color: #06B6D4 !important;
          box-shadow: 0 0 0 2px rgba(6,182,212,0.25), 0 0 12px rgba(6,182,212,0.3) !important;
        }
      `}</style>


      {/* ── Radial gradient center glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.25) 0%, rgba(6,182,212,0.20) 40%, transparent 70%)",
        }}
      />
      {/* Top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% -5%, rgba(6,182,212,0.18) 0%, transparent 65%)",
        }}
      />
      {/* Right glow — purple */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 45% 60% at 90% 50%, rgba(124,58,237,0.15) 0%, transparent 65%)",
        }}
      />
      {/* Top-right glow — magenta */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 100% 0%, rgba(232,121,249,0.18) 0%, rgba(217,70,239,0.08) 40%, transparent 70%)",
        }}
      />

      {/* ── PCB Circuit Traces ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <svg
          width="100%" height="100%"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="pcb-glow-cy" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="pcb-glow-ma" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="pcb-glow-pu" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* ── CY-1: dashboard-left edge → ramo superior-esquerdo ── */}
          <path d="M 760 320 H 560 V 160 H 340 V 220 H 140"
                stroke="rgba(6,182,212,0.38)" strokeWidth="1" fill="none"/>
          <circle cx="560" cy="320" r="2.5" fill="rgba(6,182,212,0.65)"/>
          <circle cx="560" cy="160" r="2.5" fill="rgba(6,182,212,0.60)"/>
          <circle cx="340" cy="160" r="3"   fill="rgba(6,182,212,0.65)"/>
          <circle cx="340" cy="220" r="2"   fill="rgba(6,182,212,0.55)"/>
          <circle cx="140" cy="220" r="4.5" fill="rgba(6,182,212,0.55)" filter="url(#pcb-glow-cy)"/>

          {/* CY-1b: ramificação em T saindo de (340,160) para cima */}
          <path d="M 340 160 H 240 V 60 H 80"
                stroke="rgba(6,182,212,0.28)" strokeWidth="1" fill="none"/>
          <circle cx="240" cy="160" r="2"   fill="rgba(6,182,212,0.55)"/>
          <circle cx="240" cy="60"  r="2"   fill="rgba(6,182,212,0.50)"/>
          <circle cx="80"  cy="60"  r="4"   fill="rgba(6,182,212,0.48)" filter="url(#pcb-glow-cy)"/>

          {/* ── CY-2: dashboard-bottom → baixo-esquerdo ── */}
          <path d="M 900 760 H 680 V 848 H 440 V 800 H 260 V 860"
                stroke="rgba(6,182,212,0.30)" strokeWidth="1" fill="none"/>
          <circle cx="680" cy="760" r="2.5" fill="rgba(6,182,212,0.60)"/>
          <circle cx="680" cy="848" r="2"   fill="rgba(6,182,212,0.52)"/>
          <circle cx="440" cy="848" r="3"   fill="rgba(6,182,212,0.58)"/>
          <circle cx="440" cy="800" r="2"   fill="rgba(6,182,212,0.50)"/>
          <circle cx="260" cy="800" r="2.5" fill="rgba(6,182,212,0.55)"/>
          <circle cx="260" cy="860" r="4.5" fill="rgba(6,182,212,0.50)" filter="url(#pcb-glow-cy)"/>

          {/* ── CY-3: topo-esquerdo independente ── */}
          <path d="M 0 168 H 220 V 80 H 480 V 128 H 660 V 56 H 740"
                stroke="rgba(6,182,212,0.32)" strokeWidth="1" fill="none"/>
          <circle cx="220" cy="168" r="2.5" fill="rgba(6,182,212,0.62)"/>
          <circle cx="220" cy="80"  r="2"   fill="rgba(6,182,212,0.55)"/>
          <circle cx="480" cy="80"  r="3.5" fill="rgba(6,182,212,0.68)" filter="url(#pcb-glow-cy)"/>
          <circle cx="480" cy="128" r="2"   fill="rgba(6,182,212,0.52)"/>
          <circle cx="660" cy="128" r="2"   fill="rgba(6,182,212,0.52)"/>
          <circle cx="660" cy="56"  r="2.5" fill="rgba(6,182,212,0.58)"/>
          <circle cx="740" cy="56"  r="4.5" fill="rgba(6,182,212,0.52)" filter="url(#pcb-glow-cy)"/>

          {/* ── CY-4: mid-left independente ── */}
          <path d="M 0 480 H 160 V 380 H 320 V 300 H 200 V 240"
                stroke="rgba(6,182,212,0.26)" strokeWidth="1" fill="none"/>
          <circle cx="160" cy="480" r="2.5" fill="rgba(6,182,212,0.58)"/>
          <circle cx="160" cy="380" r="2"   fill="rgba(6,182,212,0.50)"/>
          <circle cx="320" cy="380" r="3"   fill="rgba(6,182,212,0.60)"/>
          <circle cx="320" cy="300" r="2"   fill="rgba(6,182,212,0.50)"/>
          <circle cx="200" cy="300" r="2"   fill="rgba(6,182,212,0.48)"/>
          <circle cx="200" cy="240" r="4"   fill="rgba(6,182,212,0.48)" filter="url(#pcb-glow-cy)"/>

          {/* CY-4b: T-junction em (320,380) → direita */}
          <path d="M 320 380 H 500 V 440 H 620"
                stroke="rgba(6,182,212,0.20)" strokeWidth="1" fill="none"/>
          <circle cx="500" cy="380" r="2"   fill="rgba(6,182,212,0.45)"/>
          <circle cx="500" cy="440" r="2"   fill="rgba(6,182,212,0.42)"/>
          <circle cx="620" cy="440" r="3.5" fill="rgba(6,182,212,0.42)" filter="url(#pcb-glow-cy)"/>

          {/* ── CY-5: lado direito subindo ── */}
          <path d="M 1440 460 H 1380 V 360 H 1300 V 280"
                stroke="rgba(6,182,212,0.22)" strokeWidth="1" fill="none"/>
          <circle cx="1380" cy="460" r="2"   fill="rgba(6,182,212,0.48)"/>
          <circle cx="1380" cy="360" r="2.5" fill="rgba(6,182,212,0.52)"/>
          <circle cx="1300" cy="360" r="2"   fill="rgba(6,182,212,0.48)"/>
          <circle cx="1300" cy="280" r="4"   fill="rgba(6,182,212,0.48)" filter="url(#pcb-glow-cy)"/>

          {/* ── PU-1: dashboard-topo → cima-direita ── */}
          <path d="M 1060 160 V 72 H 1260 V 20"
                stroke="rgba(147,51,234,0.32)" strokeWidth="1" fill="none"/>
          <circle cx="1060" cy="72"  r="2.5" fill="rgba(147,51,234,0.62)"/>
          <circle cx="1260" cy="72"  r="3"   fill="rgba(147,51,234,0.65)" filter="url(#pcb-glow-pu)"/>
          <circle cx="1260" cy="20"  r="4.5" fill="rgba(147,51,234,0.55)" filter="url(#pcb-glow-pu)"/>

          {/* PU-1b: T-junction em (1260,72) → continuação direita */}
          <path d="M 1260 72 H 1380 V 32"
                stroke="rgba(147,51,234,0.22)" strokeWidth="1" fill="none"/>
          <circle cx="1380" cy="72"  r="2"   fill="rgba(147,51,234,0.48)"/>
          <circle cx="1380" cy="32"  r="3"   fill="rgba(147,51,234,0.44)" filter="url(#pcb-glow-pu)"/>

          {/* ── PU-2: canto superior-direito ── */}
          <path d="M 1440 300 H 1320 V 200 H 1160 V 100 H 1080"
                stroke="rgba(147,51,234,0.24)" strokeWidth="1" fill="none"/>
          <circle cx="1320" cy="300" r="2.5" fill="rgba(147,51,234,0.52)"/>
          <circle cx="1320" cy="200" r="2"   fill="rgba(147,51,234,0.48)"/>
          <circle cx="1160" cy="200" r="2.5" fill="rgba(147,51,234,0.52)"/>
          <circle cx="1160" cy="100" r="2"   fill="rgba(147,51,234,0.48)"/>
          <circle cx="1080" cy="100" r="4"   fill="rgba(147,51,234,0.48)" filter="url(#pcb-glow-pu)"/>

          {/* ── PU-3: centro-esquerdo ── */}
          <path d="M 400 560 H 220 V 660 H 100 V 760"
                stroke="rgba(147,51,234,0.24)" strokeWidth="1" fill="none"/>
          <circle cx="220" cy="560" r="2.5" fill="rgba(147,51,234,0.52)"/>
          <circle cx="220" cy="660" r="2"   fill="rgba(147,51,234,0.48)"/>
          <circle cx="100" cy="660" r="2.5" fill="rgba(147,51,234,0.52)"/>
          <circle cx="100" cy="760" r="4"   fill="rgba(147,51,234,0.48)" filter="url(#pcb-glow-pu)"/>

          {/* ── MA-1: baixo-direito magenta ── */}
          <path d="M 1360 680 V 820 H 1200 V 760 H 1060 V 868"
                stroke="rgba(232,121,249,0.25)" strokeWidth="1" fill="none"/>
          <circle cx="1360" cy="820" r="2.5" fill="rgba(232,121,249,0.55)"/>
          <circle cx="1200" cy="820" r="3"   fill="rgba(232,121,249,0.58)" filter="url(#pcb-glow-ma)"/>
          <circle cx="1200" cy="760" r="2.5" fill="rgba(232,121,249,0.52)"/>
          <circle cx="1060" cy="760" r="2"   fill="rgba(232,121,249,0.50)"/>
          <circle cx="1060" cy="868" r="4.5" fill="rgba(232,121,249,0.50)" filter="url(#pcb-glow-ma)"/>

          {/* ── MA-2: baixo-esquerdo magenta ── */}
          <path d="M 0 720 H 140 V 820 H 300 V 760 H 460 V 840 H 560"
                stroke="rgba(232,121,249,0.28)" strokeWidth="1" fill="none"/>
          <circle cx="140" cy="720" r="2.5" fill="rgba(232,121,249,0.58)"/>
          <circle cx="140" cy="820" r="2"   fill="rgba(232,121,249,0.52)"/>
          <circle cx="300" cy="820" r="3"   fill="rgba(232,121,249,0.60)" filter="url(#pcb-glow-ma)"/>
          <circle cx="300" cy="760" r="2"   fill="rgba(232,121,249,0.52)"/>
          <circle cx="460" cy="760" r="2.5" fill="rgba(232,121,249,0.55)"/>
          <circle cx="460" cy="840" r="2"   fill="rgba(232,121,249,0.50)"/>
          <circle cx="560" cy="840" r="4"   fill="rgba(232,121,249,0.50)" filter="url(#pcb-glow-ma)"/>

          {/* MA-2b: T-junction em (300,760) → cima */}
          <path d="M 300 760 V 640 H 180 V 580"
                stroke="rgba(232,121,249,0.18)" strokeWidth="1" fill="none"/>
          <circle cx="300" cy="640" r="2"   fill="rgba(232,121,249,0.42)"/>
          <circle cx="180" cy="640" r="2"   fill="rgba(232,121,249,0.40)"/>
          <circle cx="180" cy="580" r="3.5" fill="rgba(232,121,249,0.40)" filter="url(#pcb-glow-ma)"/>

          {/* ── Dots de pulse em junções-chave ── */}
          <circle cx="480" cy="80" r="5" fill="none" stroke="rgba(6,182,212,0.55)" strokeWidth="1">
            <animate attributeName="r"       values="5;9;5"   dur="3s"   repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.55;0;0.55" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="300" cy="820" r="5" fill="none" stroke="rgba(232,121,249,0.55)" strokeWidth="1">
            <animate attributeName="r"       values="5;9;5"   dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.55;0;0.55" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="1260" cy="72" r="5" fill="none" stroke="rgba(147,51,234,0.60)" strokeWidth="1">
            <animate attributeName="r"       values="5;9;5"   dur="3.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.60;0;0.60" dur="3.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="1200" cy="820" r="5" fill="none" stroke="rgba(232,121,249,0.50)" strokeWidth="1">
            <animate attributeName="r"       values="5;8;5"   dur="4s"   repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.50;0;0.50" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="320" cy="380" r="5" fill="none" stroke="rgba(6,182,212,0.50)" strokeWidth="1">
            <animate attributeName="r"       values="5;8;5"   dur="2.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.50;0;0.50" dur="2.8s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* ── Coluna esquerda ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

          {/* Badge neon */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
            style={{
              border: "1px solid #06B6D4",
              background: "rgba(6,182,212,0.07)",
              color: "#06B6D4",
              boxShadow: "0 0 15px rgba(6,182,212,0.5), inset 0 0 12px rgba(6,182,212,0.08)",
              animation: "pulse-glow 3s ease-in-out infinite",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "#06B6D4", boxShadow: "0 0 6px #06B6D4" }}
            />
            Lançamento beta limitado em 2026. Garanta seu lugar.
          </div>

          {/* H1 com palavras coloridas individuais */}
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-tight" style={{ color: "#E2E8F0" }}>
            Chega de abrir 4 plataformas pra{" "}
            <span style={{ color: "#06B6D4", textShadow: "0 0 20px rgba(6,182,212,0.8)" }}>montar</span>
            {" "}um{" "}
            <span style={{ color: "#E879F9", textShadow: "0 0 20px rgba(232,121,249,0.8)" }}>relatório.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "#94A3B8" }}>
            GetDashia centraliza Google Ads, Meta Ads e e-commerce em um painel
            único. Você vê qual canal gerou cada venda — em minutos, não em horas.
          </p>

          <div className="mt-10 flex flex-col items-center lg:items-start gap-4 sm:flex-row">
            <a
              href="#waitlist"
              className="cyber-btn-primary inline-flex h-11 items-center justify-center rounded-lg px-6 text-base"
            >
              Garantir meu lugar →
            </a>
            <a
              href="#como-funciona"
              className="cyber-btn-secondary inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm"
            >
              Ver como funciona
            </a>
          </div>

          {/* Waitlist */}
          <div
            id="waitlist"
            className="mt-10 w-full max-w-md scroll-mt-24 rounded-2xl p-8"
            style={{
              background: "rgba(10,15,30,0.8)",
              border: "1px solid rgba(6,182,212,0.2)",
              boxShadow: "0 0 30px rgba(6,182,212,0.05), inset 0 0 30px rgba(6,182,212,0.02)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p className="mb-1 text-base font-semibold" style={{ color: "#E2E8F0" }}>
              Seja um dos primeiros a testar
            </p>
            <p className="mb-6 text-sm" style={{ color: "#64748B" }}>
              Acesso antecipado para um grupo limitado de gestores.
            </p>

            {!enviado ? (
              <>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="cyber-input h-10 flex-1"
                  />
                  <button
                    type="submit"
                    disabled={carregando}
                    className="cyber-btn-magenta inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm whitespace-nowrap"
                  >
                    {carregando ? "Enviando..." : "Garantir meu lugar"}
                  </button>
                </form>
                {erro && <p className="mt-2 text-xs text-red-400">{erro}</p>}
              </>
            ) : (
              <div
                className="rounded-lg px-4 py-3 text-sm"
                style={{
                  background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.3)",
                  color: "#06B6D4",
                }}
              >
                Recebemos seu e-mail. Avisaremos quando o beta abrir!
              </div>
            )}

            <p className="mt-3 text-xs" style={{ color: "#334155" }}>Sem spam. Só o aviso de acesso.</p>
          </div>
        </div>

        {/* ── Coluna direita — dashboard animado ── */}
        <div className="hidden lg:flex justify-center items-center relative">

          {/* Decorative circuit lines around panel */}
          <svg
            aria-hidden
            className="pointer-events-none absolute"
            width="110%"
            height="110%"
            viewBox="-40 -40 580 580"
            xmlns="http://www.w3.org/2000/svg"
            style={{ top: "-5%", left: "-5%" }}
          >
            {/* Corner accents */}
            <path d="M 0 30 L 0 0 L 30 0" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" fill="none" />
            <path d="M 470 0 L 500 0 L 500 30" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" fill="none" />
            <path d="M 0 470 L 0 500 L 30 500" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5" fill="none" />
            <path d="M 470 500 L 500 500 L 500 470" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5" fill="none" />
            {/* Corner dots */}
            <circle cx="0" cy="0" r="3" fill="rgba(6,182,212,0.4)" />
            <circle cx="500" cy="0" r="3" fill="rgba(6,182,212,0.4)" />
            <circle cx="0" cy="500" r="3" fill="rgba(124,58,237,0.4)" />
            <circle cx="500" cy="500" r="3" fill="rgba(124,58,237,0.4)" />
            {/* Side trace lines */}
            <path d="M 0 160 L -30 160 L -30 200" stroke="rgba(6,182,212,0.25)" strokeWidth="1" fill="none" />
            <circle cx="-30" cy="200" r="2" fill="rgba(6,182,212,0.3)" />
            <path d="M 500 300 L 530 300 L 530 340" stroke="rgba(124,58,237,0.25)" strokeWidth="1" fill="none" />
            <circle cx="530" cy="340" r="2" fill="rgba(124,58,237,0.3)" />
            <path d="M 120 0 L 120 -25" stroke="rgba(6,182,212,0.2)" strokeWidth="1" fill="none" />
            <path d="M 380 500 L 380 525" stroke="rgba(124,58,237,0.2)" strokeWidth="1" fill="none" />
          </svg>

          <div
            className="rounded-2xl p-5 w-full max-w-lg backdrop-blur-sm relative overflow-hidden"
            style={{
              background: "#0A0F1E",
              border: "1px solid rgba(6,182,212,0.35)",
              boxShadow: "0 0 20px rgba(6,182,212,0.5), 0 0 60px rgba(6,182,212,0.3), 0 0 100px rgba(124,58,237,0.2)",
              transform: "perspective(1200px) rotateY(-6deg) rotateX(2deg)",
              animation: "float 4s ease-in-out infinite alternate",
            }}
          >
            {/* Subtle scan line effect */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 h-12 -z-0"
              style={{
                background: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.03), transparent)",
                animation: "scan-line 6s linear infinite",
                top: 0,
              }}
            />

            {/* Header */}
            <div
              className="flex justify-between items-center mb-4 pb-3"
              style={{ borderBottom: "1px solid rgba(6,182,212,0.12)" }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#06B6D4",
                    boxShadow: "0 0 6px #06B6D4, 0 0 12px rgba(6,182,212,0.4)",
                    animation: "pulse-glow 2s ease-in-out infinite",
                  }}
                />
                <span className="text-sm font-semibold" style={{ color: "#E2E8F0" }}>GetDashia</span>
              </div>
              <span
                className="text-xs px-2 py-1 rounded-md"
                style={{
                  background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.15)",
                  color: "#06B6D4",
                }}
              >
                Últimos 30 dias
              </span>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { label: "ROAS",       value: "4.8×",  color: "#06B6D4", glow: "rgba(6,182,212,0.3)" },
                { label: "Receita",    value: "R$28k", color: "#10B981", glow: "rgba(16,185,129,0.3)" },
                { label: "Conversões", value: "312",   color: "#7C3AED", glow: "rgba(124,58,237,0.3)" },
                { label: "CPA",        value: "R$18",  color: "#1E40AF", glow: "rgba(30,64,175,0.3)" },
              ].map(({ label, value, color, glow }) => (
                <div
                  key={label}
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: "rgba(6,182,212,0.04)",
                    border: "1px solid rgba(6,182,212,0.1)",
                  }}
                >
                  <p className="text-xs mb-1" style={{ color: "#475569" }}>{label}</p>
                  <p
                    className="font-bold text-lg"
                    style={{ color, textShadow: `0 0 12px ${glow}` }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <p className="text-xs mb-2" style={{ color: "#475569" }}>Receita mensal</p>
            <svg width="100%" height="110" viewBox="0 0 380 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cy-grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#0E7490" />
                </linearGradient>
                <linearGradient id="cy-grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#5B21B6" />
                </linearGradient>
                <linearGradient id="cy-grad3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E40AF" />
                  <stop offset="100%" stopColor="#1E3A8A" />
                </linearGradient>
                <linearGradient id="cy-grad4" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
                <filter id="bar-glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <line x1="0" y1="106" x2="380" y2="106" stroke="rgba(6,182,212,0.15)" strokeWidth="1" />
              <rect x="10"  y="65" width="38" height="40" rx="3" fill="url(#cy-grad2)" filter="url(#bar-glow)" />
              <rect x="58"  y="50" width="38" height="55" rx="3" fill="url(#cy-grad1)" filter="url(#bar-glow)" />
              <rect x="106" y="70" width="38" height="35" rx="3" fill="url(#cy-grad3)" filter="url(#bar-glow)" />
              <rect x="154" y="35" width="38" height="70" rx="3" fill="url(#cy-grad1)" filter="url(#bar-glow)" />
              <rect x="202" y="45" width="38" height="60" rx="3" fill="url(#cy-grad2)" filter="url(#bar-glow)" />
              <rect x="250" y="20" width="38" height="85" rx="3" fill="url(#cy-grad4)" filter="url(#bar-glow)" />
              <rect x="298" y="33" width="38" height="72" rx="3" fill="url(#cy-grad1)" filter="url(#bar-glow)" />
              <rect x="346" y="10" width="38" height="95" rx="3" fill="url(#cy-grad4)" filter="url(#bar-glow)" />
              <text x="29"  y="108" fontSize="8" fill="#334155" textAnchor="middle">Jan</text>
              <text x="77"  y="108" fontSize="8" fill="#334155" textAnchor="middle">Fev</text>
              <text x="125" y="108" fontSize="8" fill="#334155" textAnchor="middle">Mar</text>
              <text x="173" y="108" fontSize="8" fill="#334155" textAnchor="middle">Abr</text>
              <text x="221" y="108" fontSize="8" fill="#334155" textAnchor="middle">Mai</text>
              <text x="269" y="108" fontSize="8" fill="#334155" textAnchor="middle">Jun</text>
              <text x="317" y="108" fontSize="8" fill="#334155" textAnchor="middle">Jul</text>
              <text x="365" y="108" fontSize="8" fill="#334155" textAnchor="middle">Ago</text>
            </svg>

            <div className="my-4" style={{ borderTop: "1px solid rgba(6,182,212,0.1)" }} />

            {/* Line chart */}
            <p className="text-xs mb-2" style={{ color: "#475569" }}>Conversões</p>
            <svg width="100%" height="60" viewBox="0 0 380 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cy-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                </linearGradient>
                <filter id="line-glow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <path
                d="M0,50 L48,44 L96,46 L144,32 L192,28 L240,18 L288,14 L336,8 L380,4 L380,60 L0,60 Z"
                fill="url(#cy-area)"
              />
              <polyline
                points="0,50 48,44 96,46 144,32 192,28 240,18 288,14 336,8 380,4"
                stroke="#06B6D4"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#line-glow)"
              />
              <circle cx="380" cy="4" r="3" fill="#06B6D4" style={{ filter: "drop-shadow(0 0 4px #06B6D4)" }} />
            </svg>
          </div>
        </div>

      </div>

      {/* ── Decorative star/diamond ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 right-8 hidden lg:block"
        style={{
          fontSize: "3rem",
          color: "#06B6D4",
          lineHeight: 1,
          animation: "star-pulse 2.5s ease-in-out infinite",
          zIndex: 1,
        }}
      >
        ✦
      </div>
    </section>
  );
}
