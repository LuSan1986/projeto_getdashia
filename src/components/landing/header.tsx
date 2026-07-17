'use client'

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(5,11,24,0.85)",
        borderBottom: "1px solid rgba(6,182,212,0.15)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Linha neon topo */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
           style={{ background: "linear-gradient(90deg, transparent 0%, #06B6D4 30%, #E879F9 70%, transparent 100%)" }}/>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
          style={{
            background: "linear-gradient(90deg, #06B6D4, #E879F9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
          }}
        >
          GetDashia
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { label: "Recursos", href: "#funcionalidades" },
            { label: "Preços",  href: "#planos" },
            { label: "FAQ",     href: "#faq" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm transition-all duration-200"
              style={{ color: "#64748B" }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#06B6D4"
                e.currentTarget.style.textShadow = "0 0 8px rgba(6,182,212,0.50)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#64748B"
                e.currentTarget.style.textShadow = "none"
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTAs desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
            style={{
              color: "#06B6D4",
              border: "1px solid rgba(6,182,212,0.40)",
              background: "transparent",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(6,182,212,0.08)"
              e.currentTarget.style.borderColor = "rgba(6,182,212,0.70)"
              e.currentTarget.style.boxShadow = "0 0 12px rgba(6,182,212,0.20)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent"
              e.currentTarget.style.borderColor = "rgba(6,182,212,0.40)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            Entrar
          </Link>
          <a
            href="#waitlist"
            className="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200"
            style={{
              background: "linear-gradient(90deg, #06B6D4, #E879F9)",
              color: "white",
              boxShadow: "0 0 16px rgba(6,182,212,0.30)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 0 28px rgba(232,121,249,0.40), 0 0 14px rgba(6,182,212,0.30)"
              e.currentTarget.style.transform = "translateY(-1px)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 0 16px rgba(6,182,212,0.30)"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            Garantir meu lugar
          </a>
        </div>

        {/* Botão hamburger mobile */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: "#06B6D4", border: "1px solid rgba(6,182,212,0.25)" }}
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Menu"
        >
          {menuAberto ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuAberto && (
        <div
          className="md:hidden px-4 pb-5 pt-2"
          style={{
            background: "rgba(5,11,24,0.96)",
            borderTop: "1px solid rgba(6,182,212,0.12)",
          }}
        >
          <nav className="flex flex-col gap-4 mb-5">
            {[
              { label: "Recursos", href: "#funcionalidades" },
              { label: "Preços",  href: "#planos" },
              { label: "FAQ",     href: "#faq" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm"
                style={{ color: "#94A3B8" }}
                onClick={() => setMenuAberto(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-center"
              style={{
                color: "#06B6D4",
                border: "1px solid rgba(6,182,212,0.40)",
              }}
              onClick={() => setMenuAberto(false)}
            >
              Entrar
            </Link>
            <a
              href="#waitlist"
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-center"
              style={{
                background: "linear-gradient(90deg, #06B6D4, #E879F9)",
                color: "white",
                boxShadow: "0 0 16px rgba(6,182,212,0.25)",
              }}
              onClick={() => setMenuAberto(false)}
            >
              Garantir meu lugar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
