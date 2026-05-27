"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
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
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80"
        alt=""
        fill
        className="object-cover object-center -z-20 opacity-20"
        priority
      />

      {/* Dark overlay */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-950/80 via-zinc-950/70 to-zinc-950/90" />

      {/* Indigo glow sutil no topo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />

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
