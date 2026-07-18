"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { SiGoogleads, SiTiktok, SiFacebook } from 'react-icons/si';

/* ──────────────────────────────────────────────────────────
   HeroPlatforms — coluna direita feita 100% em código
   Hexágonos com plataformas + gráficos + traços PCB neon
────────────────────────────────────────────────────────── */
function HeroPlatforms() {
  // Flat-top hexagon polygon points (width=2r, height=r√3)
  function hex(cx: number, cy: number, r: number): string {
    const p = (x: number, y: number) => `${x.toFixed(1)},${y.toFixed(1)}`
    return [
      p(cx + r,       cy),
      p(cx + r * 0.5, cy + r * 0.866),
      p(cx - r * 0.5, cy + r * 0.866),
      p(cx - r,       cy),
      p(cx - r * 0.5, cy - r * 0.866),
      p(cx + r * 0.5, cy - r * 0.866),
    ].join(' ')
  }

  return (
    <svg
      viewBox="0 0 560 490"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '100%',
        maxWidth: '590px',
        overflow: 'visible',
        animation: 'float 4s ease-in-out infinite alternate',
      }}
    >
      <defs>
        <filter id="hp-cy" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="hp-ma" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ─── Grid de hexágonos de fundo (muito sutil) ─── */}
      {([
        [270,60,40],[175,115,34],[375,108,34],
        [480,150,30],[88,165,30],[492,385,32],
        [58,398,28],[312,445,32],[170,442,26],[416,445,26],
      ] as [number,number,number][]).map(([cx,cy,r],i) => (
        <polygon key={i} points={hex(cx,cy,r)}
                 fill="none" stroke="rgba(6,182,212,0.055)" strokeWidth="1"/>
      ))}

      {/* ════════════════════════════════════════════ */}
      {/* ═══════════  TRAÇOS PCB  ════════════════ */}
      {/* ════════════════════════════════════════════ */}

      {/* ① Centro → Google G  +  bifurcação ↓ Pie chart */}
      <path d="M 188 205 H 146 V 108 H 168" stroke="rgba(6,182,212,0.44)" strokeWidth="1" fill="none"/>
      <path d="M 146 205 V 262 H 100"       stroke="rgba(232,121,249,0.30)" strokeWidth="1" fill="none"/>
      <circle cx="146" cy="205" r="2.5" fill="rgba(6,182,212,0.70)"/>
      <circle cx="146" cy="108" r="2"   fill="rgba(6,182,212,0.65)"/>
      <circle cx="168" cy="108" r="2.5" fill="rgba(6,182,212,0.60)"/>
      <circle cx="146" cy="262" r="2"   fill="rgba(232,121,249,0.58)"/>
      <circle cx="100" cy="262" r="2.5" fill="rgba(232,121,249,0.58)"/>

      {/* ② Centro topo → Meta */}
      <path d="M 270 134 V 80 H 363" stroke="rgba(6,182,212,0.38)" strokeWidth="1" fill="none"/>
      <circle cx="270" cy="80" r="2"   fill="rgba(6,182,212,0.62)"/>
      <circle cx="363" cy="80" r="2.5" fill="rgba(6,182,212,0.62)"/>

      {/* ③ Centro direita → TikTok */}
      <path d="M 352 205 H 390 V 220" stroke="rgba(6,182,212,0.35)" strokeWidth="1" fill="none"/>
      <circle cx="390" cy="205" r="2"   fill="rgba(6,182,212,0.58)"/>
      <circle cx="390" cy="220" r="2.5" fill="rgba(6,182,212,0.55)"/>

      {/* ④ Centro baixo-esquerda → Instagram */}
      <path d="M 229 276 V 316 H 148 V 300" stroke="rgba(232,121,249,0.38)" strokeWidth="1" fill="none"/>
      <circle cx="229" cy="316" r="2"   fill="rgba(232,121,249,0.62)"/>
      <circle cx="148" cy="316" r="2.5" fill="rgba(232,121,249,0.62)"/>

      {/* ⑤ Centro baixo-direita → Facebook */}
      <path d="M 311 276 V 312 H 426 V 308" stroke="rgba(24,119,242,0.32)" strokeWidth="1" fill="none"/>
      <circle cx="311" cy="312" r="2"   fill="rgba(24,119,242,0.56)"/>
      <circle cx="426" cy="312" r="2.5" fill="rgba(24,119,242,0.56)"/>

      {/* ⑥ Centro baixo → Bar chart */}
      <path d="M 270 287 V 330 H 305 V 335" stroke="rgba(6,182,212,0.30)" strokeWidth="1" fill="none"/>
      <circle cx="270" cy="330" r="2"   fill="rgba(6,182,212,0.54)"/>
      <circle cx="305" cy="330" r="2.5" fill="rgba(6,182,212,0.54)"/>

      {/* ─── Dots pulsantes nas junções-chave ─── */}
      <circle cx="146" cy="108" r="5" fill="none" stroke="rgba(6,182,212,0.60)" strokeWidth="1">
        <animate attributeName="r"       values="5;9;5"       dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.60;0;0.60" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="363" cy="80" r="5" fill="none" stroke="rgba(6,182,212,0.55)" strokeWidth="1">
        <animate attributeName="r"       values="5;8;5"       dur="3s"   repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.55;0;0.55" dur="3s"   repeatCount="indefinite"/>
      </circle>
      <circle cx="148" cy="316" r="5" fill="none" stroke="rgba(232,121,249,0.55)" strokeWidth="1">
        <animate attributeName="r"       values="5;9;5"       dur="3.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.55;0;0.55" dur="3.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="426" cy="312" r="5" fill="none" stroke="rgba(24,119,242,0.50)" strokeWidth="1">
        <animate attributeName="r"       values="5;8;5"       dur="2.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.50;0;0.50" dur="2.8s" repeatCount="indefinite"/>
      </circle>

      {/* ════════════════════════════════════════════ */}
      {/* ═══════════  TILES DE HEX  ════════════════ */}
      {/* ════════════════════════════════════════════ */}

      {/* ── 1. Google Ads — hub central, grande, com anel pulsante ── */}
      <polygon points={hex(270, 205, 82)}
               fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.55)" strokeWidth="1.5"/>
      <polygon points={hex(270, 205, 74)}
               fill="none" stroke="rgba(6,182,212,0.10)" strokeWidth="1"/>
      {/* Anel de glow animado */}
      <polygon points={hex(270, 205, 82)} fill="none" stroke="rgba(6,182,212,0.30)" strokeWidth="2.5">
        <animate attributeName="opacity" values="0.40;1.0;0.40" dur="2s" repeatCount="indefinite"/>
      </polygon>
      {/* Ícone via foreignObject */}
      <foreignObject x="234" y="168" width="72" height="72">
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
          <SiGoogleads size={52} color="#06B6D4"
                       style={{filter:'drop-shadow(0 0 10px rgba(6,182,212,0.95))'}}/>
        </div>
      </foreignObject>
      <text x="270" y="246" textAnchor="middle" fontSize="9"
            fill="rgba(6,182,212,0.65)" fontWeight="600" letterSpacing="1.5">GOOGLE ADS</text>

      {/* ── 2. Google G — topo-esquerda ── */}
      <polygon points={hex(108, 88, 60)}
               fill="rgba(66,133,244,0.08)" stroke="rgba(66,133,244,0.40)" strokeWidth="1.2"/>
      <text x="108" y="88"
            textAnchor="middle" dominantBaseline="central"
            fontSize="52" fontWeight="700" fill="#4285F4"
            style={{ filter: 'drop-shadow(0 0 10px rgba(66,133,244,0.85))' }}>G</text>

      {/* ── 3. Meta ∞ — topo-direita ── */}
      <polygon points={hex(420, 77, 57)}
               fill="rgba(0,130,251,0.08)" stroke="rgba(0,130,251,0.40)" strokeWidth="1.2"/>
      <text x="420" y="74"
            textAnchor="middle" dominantBaseline="central"
            fontSize="40" fill="#0082FB"
            style={{ filter: 'drop-shadow(0 0 10px rgba(0,130,251,0.85))' }}>∞</text>
      <text x="420" y="103" textAnchor="middle" fontSize="9"
            fill="rgba(0,130,251,0.65)" fontWeight="600" letterSpacing="1">META</text>

      {/* ── 4. TikTok — direita ── */}
      <polygon points={hex(450, 248, 56)}
               fill="rgba(255,0,80,0.07)" stroke="rgba(255,0,80,0.38)" strokeWidth="1.2"/>
      <foreignObject x="418" y="216" width="64" height="64">
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
          <SiTiktok size={40} color="#FF0050"
                    style={{filter:'drop-shadow(0 0 8px rgba(255,0,80,0.85))'}}/>
        </div>
      </foreignObject>

      {/* ── 5. Instagram — baixo-esquerda (ícone câmera) ── */}
      <polygon points={hex(152, 352, 54)}
               fill="rgba(232,121,249,0.07)" stroke="rgba(232,121,249,0.40)" strokeWidth="1.2"/>
      {/* Corpo da câmera */}
      <rect x="126" y="337" width="32" height="24" rx="6"
            fill="rgba(232,121,249,0.08)" stroke="rgba(232,121,249,0.82)" strokeWidth="1.8"
            style={{ filter: 'drop-shadow(0 0 6px rgba(232,121,249,0.65))' }}/>
      {/* Lente externa */}
      <circle cx="152" cy="349" r="8"
              fill="rgba(232,121,249,0.06)" stroke="rgba(232,121,249,0.78)" strokeWidth="1.5"
              style={{ filter: 'drop-shadow(0 0 5px rgba(232,121,249,0.55))' }}/>
      {/* Lente interna */}
      <circle cx="152" cy="349" r="3" fill="rgba(232,121,249,0.60)"/>
      {/* Visor */}
      <circle cx="149" cy="339" r="2.5" fill="rgba(232,121,249,0.82)"/>

      {/* ── 6. Facebook — baixo-direita ── */}
      <polygon points={hex(426, 354, 46)}
               fill="rgba(24,119,242,0.07)" stroke="rgba(24,119,242,0.40)" strokeWidth="1.2"/>
      <foreignObject x="398" y="326" width="56" height="56">
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
          <SiFacebook size={36} color="#1877F2"
                      style={{filter:'drop-shadow(0 0 8px rgba(24,119,242,0.85))'}}/>
        </div>
      </foreignObject>

      {/* ── 7. Bar chart — baixo-centro ── */}
      <polygon points={hex(305, 378, 48)}
               fill="rgba(6,182,212,0.06)" stroke="rgba(6,182,212,0.36)" strokeWidth="1.2"/>
      <rect x="276" y="376" width="7" height="14" rx="1.5" fill="rgba(6,182,212,0.78)"   filter="url(#hp-cy)"/>
      <rect x="287" y="365" width="7" height="25" rx="1.5" fill="rgba(232,121,249,0.78)" filter="url(#hp-ma)"/>
      <rect x="298" y="369" width="7" height="21" rx="1.5" fill="rgba(6,182,212,0.68)"   filter="url(#hp-cy)"/>
      <rect x="309" y="359" width="7" height="31" rx="1.5" fill="rgba(168,85,247,0.82)"/>
      <rect x="320" y="364" width="7" height="26" rx="1.5" fill="rgba(6,182,212,0.72)"   filter="url(#hp-cy)"/>
      <line x1="270" y1="392" x2="334" y2="392"
            stroke="rgba(6,182,212,0.30)" strokeWidth="0.8"/>

      {/* ── 8. Pie chart — extremo-esquerda ── */}
      <polygon points={hex(58, 262, 42)}
               fill="rgba(232,121,249,0.06)" stroke="rgba(232,121,249,0.36)" strokeWidth="1.2"/>
      {/* 35% ciano  — 270°→36° */}
      <path d="M 58 262 L 58 234 A 28 28 0 0 1 81 279 Z"
            fill="rgba(6,182,212,0.72)" filter="url(#hp-cy)"/>
      {/* 40% magenta — 36°→180° */}
      <path d="M 58 262 L 81 279 A 28 28 0 0 1 30 262 Z"
            fill="rgba(232,121,249,0.72)" filter="url(#hp-ma)"/>
      {/* 25% roxo    — 180°→270° */}
      <path d="M 58 262 L 30 262 A 28 28 0 0 1 58 234 Z"
            fill="rgba(168,85,247,0.62)"/>
      {/* Buraco central */}
      <circle cx="58" cy="262" r="9" fill="rgba(5,11,24,0.96)"/>
      <circle cx="58" cy="262" r="2.5" fill="rgba(6,182,212,0.70)"/>

    </svg>
  )
}

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

          {/* ── BRIDGE: traços que conectam texto → imagem ── */}
          {/* Traço horizontal superior cruzando as colunas */}
          <path d="M 560 180 H 760 V 140 H 980 V 200 H 1200 V 160 H 1380"
                stroke="rgba(6,182,212,0.35)" strokeWidth="1" fill="none"/>
          <circle cx="760"  cy="180" r="2.5" fill="rgba(6,182,212,0.65)"/>
          <circle cx="760"  cy="140" r="2"   fill="rgba(6,182,212,0.55)"/>
          <circle cx="980"  cy="140" r="3"   fill="rgba(6,182,212,0.70)" filter="url(#pcb-glow-cy)"/>
          <circle cx="980"  cy="200" r="2"   fill="rgba(6,182,212,0.55)"/>
          <circle cx="1200" cy="200" r="2.5" fill="rgba(6,182,212,0.60)"/>
          <circle cx="1200" cy="160" r="2"   fill="rgba(6,182,212,0.50)"/>
          {/* Traço horizontal meio cruzando as colunas */}
          <path d="M 680 420 H 860 V 380 H 1060 V 440 H 1260 V 400 H 1440"
                stroke="rgba(6,182,212,0.28)" strokeWidth="1" fill="none"/>
          <circle cx="860"  cy="420" r="2.5" fill="rgba(6,182,212,0.58)"/>
          <circle cx="860"  cy="380" r="2"   fill="rgba(6,182,212,0.50)"/>
          <circle cx="1060" cy="380" r="3"   fill="rgba(6,182,212,0.65)" filter="url(#pcb-glow-cy)"/>
          <circle cx="1060" cy="440" r="2"   fill="rgba(6,182,212,0.52)"/>
          <circle cx="1260" cy="440" r="2.5" fill="rgba(6,182,212,0.55)"/>
          {/* Traço magenta inferior cruzando as colunas */}
          <path d="M 600 620 H 820 V 580 H 1020 V 640 H 1220 V 600 H 1440"
                stroke="rgba(232,121,249,0.22)" strokeWidth="1" fill="none"/>
          <circle cx="820"  cy="620" r="2.5" fill="rgba(232,121,249,0.50)"/>
          <circle cx="820"  cy="580" r="2"   fill="rgba(232,121,249,0.42)"/>
          <circle cx="1020" cy="580" r="3"   fill="rgba(232,121,249,0.58)" filter="url(#pcb-glow-ma)"/>
          <circle cx="1020" cy="640" r="2"   fill="rgba(232,121,249,0.45)"/>
          <circle cx="1220" cy="640" r="2.5" fill="rgba(232,121,249,0.48)"/>
          {/* Dot pulsante no ponto de entrada da imagem */}
          <circle cx="980" cy="140" r="5" fill="none" stroke="rgba(6,182,212,0.60)" strokeWidth="1">
            <animate attributeName="r"       values="5;9;5"   dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.60;0;0.60" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="1060" cy="380" r="5" fill="none" stroke="rgba(6,182,212,0.55)" strokeWidth="1">
            <animate attributeName="r"       values="5;8;5"   dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.55;0;0.55" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="1020" cy="580" r="5" fill="none" stroke="rgba(232,121,249,0.55)" strokeWidth="1">
            <animate attributeName="r"       values="5;9;5"   dur="3.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.55;0;0.55" dur="3.5s" repeatCount="indefinite"/>
          </circle>

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

        {/* ── Coluna direita — plataformas em código ── */}
        <div className="hidden lg:flex justify-center items-center relative">
          {/* Glow radial de fundo */}
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0,
               background: "radial-gradient(ellipse 85% 85% at 50% 50%, rgba(6,182,212,0.10) 0%, rgba(232,121,249,0.06) 50%, transparent 80%)" }}/>
          <div style={{ position: 'relative', zIndex: 1, width: '115%', maxWidth: '680px', marginRight: '-8%' }}>
            <HeroPlatforms />
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
