"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
    <section className="relative min-h-screen flex items-center px-4 py-24 sm:py-32 overflow-hidden">
      <style>{`
        @keyframes float {
          from { transform: perspective(1200px) rotateY(-6deg) rotateX(2deg) translateY(0px); }
          to   { transform: perspective(1200px) rotateY(-6deg) rotateX(2deg) translateY(-10px); }
        }
      `}</style>

      {/* Glow indigo no topo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Glow à direita */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 50% 70% at 90% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Glow colorido centro-direita */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 30% 40% at 75% 60%, rgba(139,92,246,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* ── Coluna esquerda ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <Badge
            variant="outline"
            className="mb-8 h-auto rounded-full border-indigo-800 bg-indigo-950/60 px-4 py-1.5 text-xs text-indigo-400"
          >
            Lançamento beta limitado em 2026. Garanta seu lugar.
          </Badge>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.5rem] lg:leading-tight">
            Chega de abrir 4 plataformas pra{" "}
            <span className="text-indigo-400">montar um relatório.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            GetDashia centraliza Google Ads, Meta Ads e e-commerce em um painel
            único. Você vê qual canal gerou cada venda — em minutos, não em horas.
          </p>

          <div className="mt-10 flex flex-col items-center lg:items-start gap-4 sm:flex-row">
            <Button asChild className="h-11 px-6 text-base">
              <a href="#waitlist">Garantir meu lugar →</a>
            </Button>
            <a
              href="#como-funciona"
              className="text-sm text-zinc-400 underline underline-offset-4 transition-colors hover:text-zinc-100"
            >
              Ver como funciona
            </a>
          </div>

          {/* Waitlist */}
          <div
            id="waitlist"
            className="mt-10 w-full max-w-md scroll-mt-24 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8"
          >
            <p className="mb-1 text-base font-semibold text-zinc-100">
              Seja um dos primeiros a testar
            </p>
            <p className="mb-6 text-sm text-zinc-500">
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
                    className="h-10 flex-1 border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20"
                  />
                  <Button type="submit" className="h-10 whitespace-nowrap" disabled={carregando}>
                    {carregando ? "Enviando..." : "Garantir meu lugar"}
                  </Button>
                </form>
                {erro && <p className="mt-2 text-xs text-red-400">{erro}</p>}
              </>
            ) : (
              <div className="rounded-lg border border-emerald-800/50 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-400">
                Recebemos seu e-mail. Avisaremos quando o beta abrir!
              </div>
            )}

            <p className="mt-3 text-xs text-zinc-600">Sem spam. Só o aviso de acesso.</p>
          </div>
        </div>

        {/* ── Coluna direita — dashboard animado ── */}
        <div className="hidden lg:flex justify-center items-center">
          <div
            className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-5 w-full max-w-lg backdrop-blur-sm"
            style={{
              transform: 'perspective(1200px) rotateY(-6deg) rotateX(2deg)',
              boxShadow: '0 0 0 1px rgba(99,102,241,0.1), 0 25px 50px rgba(0,0,0,0.5), 0 0 80px rgba(99,102,241,0.12)',
              animation: 'float 4s ease-in-out infinite alternate',
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-zinc-100">GetDashia</span>
              </div>
              <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded-md">Últimos 30 dias</span>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { label: 'ROAS',        value: '4.8×',   color: 'text-indigo-400' },
                { label: 'Receita',     value: 'R$28k',  color: 'text-emerald-400' },
                { label: 'Conversões',  value: '312',    color: 'text-violet-400' },
                { label: 'CPA',         value: 'R$18',   color: 'text-cyan-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-zinc-800/60 rounded-xl p-3 text-center">
                  <p className="text-zinc-500 text-xs mb-1">{label}</p>
                  <p className={`${color} font-bold text-lg`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Bar chart — Receita mensal */}
            <p className="text-xs text-zinc-500 mb-2">Receita mensal</p>
            <svg width="100%" height="110" viewBox="0 0 380 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4338ca" />
                </linearGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6d28d9" />
                </linearGradient>
                <linearGradient id="grad3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0e7490" />
                </linearGradient>
                <linearGradient id="grad4" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <line x1="0" y1="106" x2="380" y2="106" stroke="#3f3f46" strokeWidth="1" />
              <rect x="10"  y="65" width="38" height="40" rx="3" fill="url(#grad1)" />
              <rect x="58"  y="50" width="38" height="55" rx="3" fill="url(#grad2)" />
              <rect x="106" y="70" width="38" height="35" rx="3" fill="url(#grad1)" />
              <rect x="154" y="35" width="38" height="70" rx="3" fill="url(#grad3)" />
              <rect x="202" y="45" width="38" height="60" rx="3" fill="url(#grad2)" />
              <rect x="250" y="20" width="38" height="85" rx="3" fill="url(#grad4)" />
              <rect x="298" y="33" width="38" height="72" rx="3" fill="url(#grad1)" />
              <rect x="346" y="10" width="38" height="95" rx="3" fill="url(#grad4)" />
              <text x="29"  y="108" fontSize="8" fill="#52525b" textAnchor="middle">Jan</text>
              <text x="77"  y="108" fontSize="8" fill="#52525b" textAnchor="middle">Fev</text>
              <text x="125" y="108" fontSize="8" fill="#52525b" textAnchor="middle">Mar</text>
              <text x="173" y="108" fontSize="8" fill="#52525b" textAnchor="middle">Abr</text>
              <text x="221" y="108" fontSize="8" fill="#52525b" textAnchor="middle">Mai</text>
              <text x="269" y="108" fontSize="8" fill="#52525b" textAnchor="middle">Jun</text>
              <text x="317" y="108" fontSize="8" fill="#52525b" textAnchor="middle">Jul</text>
              <text x="365" y="108" fontSize="8" fill="#52525b" textAnchor="middle">Ago</text>
            </svg>

            <div className="border-t border-zinc-800 my-4" />

            {/* Line chart — Conversões */}
            <p className="text-xs text-zinc-500 mb-2">Conversões</p>
            <svg width="100%" height="60" viewBox="0 0 380 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,50 L48,44 L96,46 L144,32 L192,28 L240,18 L288,14 L336,8 L380,4 L380,60 L0,60 Z"
                fill="url(#areaGrad)"
              />
              <polyline
                points="0,50 48,44 96,46 144,32 192,28 240,18 288,14 336,8 380,4"
                stroke="#8b5cf6"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="380" cy="4" r="3" fill="#8b5cf6" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
