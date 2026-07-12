"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
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
          background: linear-gradient(135deg, #06B6D4 0%, #7C3AED 100%);
          box-shadow: 0 0 20px rgba(6,182,212,0.4), 0 0 40px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
          transition: all 0.3s ease;
          color: #fff;
          font-weight: 600;
          border: none;
        }
        .cyber-btn-primary:hover {
          box-shadow: 0 0 30px rgba(6,182,212,0.6), 0 0 60px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.15);
          transform: translateY(-1px);
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
      `}</style>

      {/* ── Background grid/circuit pattern ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-small" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,255,255,0.15)" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid-mid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(6,182,212,0.08)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-small)" />
          <rect width="100%" height="100%" fill="url(#grid-mid)" />
        </svg>
      </div>

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
      {/* Right glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 45% 60% at 90% 50%, rgba(124,58,237,0.15) 0%, transparent 65%)",
        }}
      />

      {/* ── Full-coverage circuit line overlay ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Horizontal lines */}
          <line x1="0" y1="12%" x2="100%" y2="12%" stroke="rgba(0,255,255,0.20)" strokeWidth="0.8" />
          <line x1="0" y1="28%" x2="100%" y2="28%" stroke="rgba(0,255,255,0.12)" strokeWidth="0.6" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(6,182,212,0.18)" strokeWidth="0.8" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="rgba(0,255,255,0.12)" strokeWidth="0.6" />
          <line x1="0" y1="88%" x2="100%" y2="88%" stroke="rgba(6,182,212,0.16)" strokeWidth="0.8" />

          {/* Vertical lines */}
          <line x1="8%"  y1="0" x2="8%"  y2="100%" stroke="rgba(0,255,255,0.15)" strokeWidth="0.7" />
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="rgba(6,182,212,0.10)" strokeWidth="0.6" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(0,255,255,0.13)" strokeWidth="0.7" />
          <line x1="75%" y1="0" x2="75%" y2="100%" stroke="rgba(6,182,212,0.10)" strokeWidth="0.6" />

          {/* Intersection dots */}
          <circle cx="8%"  cy="12%" r="2.5" fill="rgba(0,255,255,0.30)" />
          <circle cx="25%" cy="12%" r="2"   fill="rgba(0,255,255,0.25)" />
          <circle cx="50%" cy="12%" r="2.5" fill="rgba(0,255,255,0.30)" />
          <circle cx="75%" cy="12%" r="2"   fill="rgba(6,182,212,0.25)" />
          <circle cx="8%"  cy="50%" r="2"   fill="rgba(0,255,255,0.25)" />
          <circle cx="50%" cy="50%" r="3"   fill="rgba(0,255,255,0.35)" />
          <circle cx="75%" cy="50%" r="2"   fill="rgba(124,58,237,0.30)" />
          <circle cx="25%" cy="70%" r="2"   fill="rgba(0,255,255,0.25)" />
          <circle cx="50%" cy="70%" r="2.5" fill="rgba(6,182,212,0.30)" />
          <circle cx="75%" cy="88%" r="2"   fill="rgba(0,255,255,0.25)" />
          <circle cx="8%"  cy="88%" r="2.5" fill="rgba(124,58,237,0.28)" />

          {/* L-shapes — top-left */}
          <path d="M 0 60 L 0 0 L 60 0" stroke="#06B6D4" strokeWidth="1.5" fill="none" opacity="0.7" />
          <circle cx="0"  cy="0"  r="4" fill="#06B6D4" opacity="0.6" />

          {/* L-shape — top-right */}
          <path d="M 100% 60 L 100% 0 L calc(100% - 60px) 0" stroke="#06B6D4" strokeWidth="1.5" fill="none" opacity="0.7" />
          <circle cx="100%" cy="0" r="4" fill="#06B6D4" opacity="0.6" />

          {/* L-shape — bottom-left */}
          <path d="M 0 calc(100% - 60px) L 0 100% L 60 100%" stroke="rgba(124,58,237,0.8)" strokeWidth="1.5" fill="none" opacity="0.7" />
          <circle cx="0" cy="100%" r="4" fill="rgba(124,58,237,0.7)" opacity="0.6" />

          {/* L-shape — bottom-right */}
          <path d="M calc(100% - 60px) 100% L 100% 100% L 100% calc(100% - 60px)" stroke="rgba(124,58,237,0.8)" strokeWidth="1.5" fill="none" opacity="0.7" />
          <circle cx="100%" cy="100%" r="4" fill="rgba(124,58,237,0.7)" opacity="0.6" />

          {/* Extra circuit traces — left side */}
          <path d="M 0 35% L 5% 35% L 5% 42% L 12% 42%" stroke="rgba(0,255,255,0.25)" strokeWidth="1" fill="none" />
          <circle cx="5%"  cy="35%" r="2" fill="rgba(0,255,255,0.35)" />
          <circle cx="12%" cy="42%" r="2" fill="rgba(0,255,255,0.30)" />

          {/* Extra circuit traces — right side */}
          <path d="M 100% 60% L 92% 60% L 92% 65% L 85% 65%" stroke="rgba(124,58,237,0.25)" strokeWidth="1" fill="none" />
          <circle cx="92%" cy="60%" r="2" fill="rgba(124,58,237,0.35)" />
          <circle cx="85%" cy="65%" r="2" fill="rgba(124,58,237,0.30)" />
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

          {/* H1 com gradiente nas palavras de destaque */}
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-tight" style={{ color: "#E2E8F0" }}>
            Chega de abrir 4 plataformas pra{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #06B6D4 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              montar um relatório.
            </span>
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
                    className="h-10 flex-1"
                    style={{
                      background: "rgba(6,182,212,0.05)",
                      border: "1px solid rgba(6,182,212,0.2)",
                      color: "#E2E8F0",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={carregando}
                    className="cyber-btn-primary inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm whitespace-nowrap disabled:opacity-60"
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
