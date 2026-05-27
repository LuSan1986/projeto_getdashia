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
    <section className="relative flex flex-col items-center px-4 pb-32 pt-24 text-center sm:pt-32">
      {/* Indigo glow sutil no topo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Gradiente de profundidade centro-baixo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Keyframes de flutuação */}
      <style>{`
        @keyframes float {
          from { transform: translateY(0px); }
          to   { transform: translateY(-12px); }
        }
      `}</style>

      {/* Card A — ROAS (top-left) */}
      <div
        aria-hidden
        className="pointer-events-none absolute opacity-30 sm:opacity-50 -z-10 bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-3 backdrop-blur-sm"
        style={{ top: '15%', left: '3%', animation: 'float 3.5s ease-in-out infinite alternate' }}
      >
        <p className="text-xs text-zinc-500">ROAS</p>
        <p className="text-lg font-bold text-indigo-400">4.2×</p>
        <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
          <rect x="0"  y="20" width="10" height="12" fill="#6366f1" />
          <rect x="14" y="14" width="10" height="18" fill="#6366f1" />
          <rect x="28" y="8"  width="10" height="24" fill="#6366f1" />
          <rect x="42" y="12" width="10" height="20" fill="#6366f1" />
          <rect x="56" y="4"  width="10" height="28" fill="#6366f1" />
          <rect x="70" y="0"  width="10" height="32" fill="#6366f1" />
        </svg>
      </div>

      {/* Card B — CTR (top-right) */}
      <div
        aria-hidden
        className="pointer-events-none absolute opacity-30 sm:opacity-50 -z-10 bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-3 backdrop-blur-sm"
        style={{ top: '10%', right: '3%', animation: 'float 4.2s ease-in-out infinite alternate' }}
      >
        <p className="text-xs text-zinc-500">CTR</p>
        <p className="text-lg font-bold text-violet-400">3.8%</p>
        <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
          <polyline points="0,28 16,22 32,18 48,12 64,7 80,2" stroke="#a78bfa" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Card C — Conversões (mid-left, hidden mobile) */}
      <div
        aria-hidden
        className="pointer-events-none absolute opacity-30 sm:opacity-50 -z-10 hidden sm:block bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-3 backdrop-blur-sm"
        style={{ top: '42%', left: '1%', animation: 'float 5s ease-in-out infinite alternate' }}
      >
        <p className="text-xs text-zinc-500">Conversões</p>
        <p className="text-lg font-bold text-emerald-400">184</p>
        <p className="text-xs text-emerald-500">↑ +12% hoje</p>
      </div>

      {/* Card D — Investimento (mid-right, hidden mobile) */}
      <div
        aria-hidden
        className="pointer-events-none absolute opacity-30 sm:opacity-50 -z-10 hidden sm:block bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-3 backdrop-blur-sm"
        style={{ top: '38%', right: '1%', animation: 'float 3.8s ease-in-out infinite alternate' }}
      >
        <p className="text-xs text-zinc-500">Investimento</p>
        <p className="text-lg font-bold text-zinc-100">R$ 3.240</p>
        <svg width="80" height="28" viewBox="0 0 80 28" fill="none">
          <rect x="0"  y="16" width="12" height="12" fill="#52525b" />
          <rect x="17" y="10" width="12" height="18" fill="#52525b" />
          <rect x="34" y="14" width="12" height="14" fill="#52525b" />
          <rect x="51" y="8"  width="12" height="20" fill="#52525b" />
          <rect x="68" y="2"  width="12" height="26" fill="#6366f1" />
        </svg>
      </div>

      {/* Card E — CPA Médio (bottom-left, hidden mobile) */}
      <div
        aria-hidden
        className="pointer-events-none absolute opacity-30 sm:opacity-50 -z-10 hidden sm:block bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-3 backdrop-blur-sm"
        style={{ bottom: '18%', left: '5%', animation: 'float 4.5s ease-in-out infinite alternate' }}
      >
        <p className="text-xs text-zinc-500">CPA Médio</p>
        <p className="text-lg font-bold text-zinc-100">R$ 17,60</p>
        <p className="text-xs text-zinc-600">Meta: R$ 20,00</p>
      </div>

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

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
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

      {/* ── Waitlist ── */}
      <div
        id="waitlist"
        className="mt-20 w-full max-w-md scroll-mt-24 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8"
      >
        <p className="mb-1 text-base font-semibold text-zinc-100">
          Seja um dos primeiros a testar
        </p>
        <p className="mb-6 text-sm text-zinc-500">
          Acesso antecipado para um grupo limitado de gestores.
        </p>

        {!enviado ? (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
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
            {erro && (
              <p className="mt-2 text-xs text-red-400">{erro}</p>
            )}
          </>
        ) : (
          <div className="rounded-lg border border-emerald-800/50 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-400">
            Recebemos seu e-mail. Avisaremos quando o beta abrir!
          </div>
        )}

        <p className="mt-3 text-xs text-zinc-600">Sem spam. Só o aviso de acesso.</p>
      </div>
    </section>
  );
}