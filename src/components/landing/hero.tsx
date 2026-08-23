'use client'

/* ─────────────────────────────────────────────────────────────────────────────
   hero.tsx
   Animações: CSS keyframes + SVG SMIL (animateMotion / animateTransform / animate)
   Trick de transform SVG: <g translate fixo> + <g inner com scale CSS>
   prefers-reduced-motion: CSS pausado via @media
──────────────────────────────────────────────────────────────────────────── */

// ── Hex polygon (flat-top) centered at origin, for use inside translate <g> ──
function H(r: number): string {
  const p = (x: number, y: number) => `${x.toFixed(1)},${y.toFixed(1)}`
  return [
    p(r, 0), p(r * .5, r * .866), p(-r * .5, r * .866),
    p(-r, 0), p(-r * .5, -r * .866), p(r * .5, -r * .866),
  ].join(' ')
}

// ── Mini chart cards ──────────────────────────────────────────────────────────

function MiniBarChart4() {
  return (
    <div className="mini-chart-card mini-float" style={{ animationDelay: '0s' }}>
      <p className="mini-label">Receita</p>
      <svg viewBox="0 0 80 56" width="80" height="56">
        {/* bar 1 */}
        <rect x="5"  width="12" rx="2.5" fill="#06B6D4">
          <animate attributeName="height" values="22;40;22" dur="2.0s" repeatCount="indefinite" begin="0s"/>
          <animate attributeName="y"      values="30;12;30" dur="2.0s" repeatCount="indefinite" begin="0s"/>
        </rect>
        {/* bar 2 */}
        <rect x="21" width="12" rx="2.5" fill="#E879F9">
          <animate attributeName="height" values="32;16;32" dur="2.4s" repeatCount="indefinite" begin="0.4s"/>
          <animate attributeName="y"      values="20;36;20" dur="2.4s" repeatCount="indefinite" begin="0.4s"/>
        </rect>
        {/* bar 3 */}
        <rect x="37" width="12" rx="2.5" fill="#06B6D4">
          <animate attributeName="height" values="26;44;26" dur="2.7s" repeatCount="indefinite" begin="0.8s"/>
          <animate attributeName="y"      values="26; 8;26" dur="2.7s" repeatCount="indefinite" begin="0.8s"/>
        </rect>
        {/* bar 4 */}
        <rect x="53" width="12" rx="2.5" fill="#A855F7">
          <animate attributeName="height" values="36;18;36" dur="2.2s" repeatCount="indefinite" begin="0.2s"/>
          <animate attributeName="y"      values="16;34;16" dur="2.2s" repeatCount="indefinite" begin="0.2s"/>
        </rect>
        <line x1="2" y1="52" x2="68" y2="52" stroke="rgba(6,182,212,0.20)" strokeWidth="1"/>
      </svg>
      <p className="mini-trend" style={{ color: '#06B6D4' }}>↑ 12,4%</p>
    </div>
  )
}

function MiniDonutChart() {
  // Circumference r=26: 2π*26 ≈ 163.4
  // 200° → 163.4*(200/360) ≈ 90.8
  // 300° → 163.4*(300/360) ≈ 136.2
  return (
    <div className="mini-chart-card mini-float" style={{ animationDelay: '0.6s' }}>
      <p className="mini-label">Canais</p>
      <svg viewBox="0 0 72 72" width="72" height="72">
        {/* bg ring */}
        <circle cx="36" cy="36" r="26" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8"/>
        {/* ciano arc */}
        <circle cx="36" cy="36" r="26" fill="none" stroke="#06B6D4" strokeWidth="7"
          strokeLinecap="round" transform="rotate(-90 36 36)" strokeDasharray="90.8 72.6">
          <animate attributeName="stroke-dasharray"
            values="90.8 72.6;136.2 27.2;90.8 72.6"
            dur="4s" repeatCount="indefinite"/>
        </circle>
        {/* magenta arc */}
        <circle cx="36" cy="36" r="26" fill="none" stroke="#E879F9" strokeWidth="5"
          strokeLinecap="round" transform="rotate(-90 36 36)"
          strokeDasharray="44 119.4" strokeDashoffset="-100">
          <animate attributeName="stroke-dasharray"
            values="44 119.4;30 133.4;44 119.4"
            dur="3.5s" repeatCount="indefinite" begin="0.5s"/>
        </circle>
        {/* center dot */}
        <circle cx="36" cy="36" r="6" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
      </svg>
      <p className="mini-trend" style={{ color: '#E879F9' }}>2 ativos</p>
    </div>
  )
}

function MiniLineChart() {
  return (
    <div className="mini-chart-card mini-float" style={{ animationDelay: '1.1s' }}>
      <p className="mini-label">Cliques</p>
      <svg viewBox="0 0 88 60" width="88" height="60">
        {/* grid */}
        <line x1="0" y1="50" x2="88" y2="50" stroke="rgba(6,182,212,0.12)" strokeWidth="1"/>
        <line x1="0" y1="30" x2="88" y2="30" stroke="rgba(6,182,212,0.08)" strokeWidth="1"/>
        {/* series 1 ciano */}
        <polyline fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="points"
            values="6,42 28,28 50,34 72,16 86,22;6,36 28,22 50,28 72,10 86,16;6,42 28,28 50,34 72,16 86,22"
            dur="2.5s" repeatCount="indefinite"/>
        </polyline>
        {/* series 2 magenta */}
        <polyline fill="none" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          opacity="0.75">
          <animate attributeName="points"
            values="6,46 28,50 50,44 72,48 86,42;6,50 28,54 50,48 72,52 86,46;6,46 28,50 50,44 72,48 86,42"
            dur="3s" repeatCount="indefinite" begin="0.8s"/>
        </polyline>
        {/* dots series 1 */}
        {([6,28,50,72,86] as const).map((cx, i) => (
          <circle key={cx} cx={cx} r="3.5" fill="#06B6D4">
            <animate attributeName="cy"
              values={`${[42,28,34,16,22][i]};${[36,22,28,10,16][i]};${[42,28,34,16,22][i]}`}
              dur="2.5s" repeatCount="indefinite" begin={`${i*0.15}s`}/>
          </circle>
        ))}
      </svg>
      <p className="mini-trend" style={{ color: '#06B6D4' }}>↑ 8,1%</p>
    </div>
  )
}

function MiniBars5Chart() {
  const bars = [
    { x: 4,  fill: '#06B6D4', h1: 26, h2: 42, delay: '0s'   },
    { x: 17, fill: '#E879F9', h1: 36, h2: 20, delay: '0.5s' },
    { x: 30, fill: '#06B6D4', h1: 20, h2: 40, delay: '0.2s' },
    { x: 43, fill: '#A855F7', h1: 42, h2: 24, delay: '0.8s' },
    { x: 56, fill: '#E879F9', h1: 30, h2: 46, delay: '0.4s' },
  ]
  return (
    <div className="mini-chart-card mini-float" style={{ animationDelay: '1.6s' }}>
      <p className="mini-label">Conversões</p>
      <svg viewBox="0 0 74 56" width="74" height="56">
        {bars.map(({ x, fill, h1, h2, delay }) => (
          <rect key={x} x={x} width="10" rx="2.5" fill={fill}>
            <animate attributeName="height" values={`${h1};${h2};${h1}`}
              dur="2.3s" repeatCount="indefinite" begin={delay}/>
            <animate attributeName="y" values={`${52-h1};${52-h2};${52-h1}`}
              dur="2.3s" repeatCount="indefinite" begin={delay}/>
          </rect>
        ))}
        <line x1="0" y1="52" x2="74" y2="52" stroke="rgba(6,182,212,0.20)" strokeWidth="1"/>
      </svg>
      <p className="mini-trend" style={{ color: '#A855F7' }}>↑ 5,7%</p>
    </div>
  )
}

// ── Animated hex platform network (right column) ──────────────────────────────

function HeroPlatforms() {
  // Center and satellite positions
  const CX = 280, CY = 248 // center
  const sat = {
    nw: { x: 108, y:  97 }, // Google Ads
    ne: { x: 452, y:  97 }, // Instagram
    se: { x: 452, y: 398 }, // Facebook
    sw: { x: 108, y: 398 }, // TikTok
  }

  return (
    <svg viewBox="0 0 560 500" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: '590px', overflow: 'visible' }}>
      <defs>
        {/* Center gradient border */}
        <linearGradient id="hp2-center-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#06B6D4"/>
          <stop offset="100%" stopColor="#E879F9"/>
        </linearGradient>
        {/* Instagram gradient bg — laranja/dourado (baixo-esq) → rosa → roxo (cima-dir) */}
        <linearGradient id="hp2-ig-bg" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#FCAF45"/>
          <stop offset="40%"  stopColor="#E1306C"/>
          <stop offset="100%" stopColor="#833AB4"/>
        </linearGradient>
        {/* Facebook gradient bg — azul mais claro no topo */}
        <linearGradient id="hp2-fb-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#2d93f5"/>
          <stop offset="100%" stopColor="#0d5cbf"/>
        </linearGradient>
        {/* Glow filters */}
        <filter id="hp2-glow-cy" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="hp2-glow-ma" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Connection paths for animateMotion (invisible) */}
        <path id="hp2-nw" d={`M ${CX} ${CY} L ${sat.nw.x} ${sat.nw.y}`}/>
        <path id="hp2-ne" d={`M ${CX} ${CY} L ${sat.ne.x} ${sat.ne.y}`}/>
        <path id="hp2-se" d={`M ${CX} ${CY} L ${sat.se.x} ${sat.se.y}`}/>
        <path id="hp2-sw" d={`M ${CX} ${CY} L ${sat.sw.x} ${sat.sw.y}`}/>
        <path id="hp2-nw-r" d={`M ${sat.nw.x} ${sat.nw.y} L ${CX} ${CY}`}/>
        <path id="hp2-ne-r" d={`M ${sat.ne.x} ${sat.ne.y} L ${CX} ${CY}`}/>
        <path id="hp2-se-r" d={`M ${sat.se.x} ${sat.se.y} L ${CX} ${CY}`}/>
        <path id="hp2-sw-r" d={`M ${sat.sw.x} ${sat.sw.y} L ${CX} ${CY}`}/>
      </defs>

      {/* ── Subtle hex grid background ── */}
      {([
        [280,60,38],[160,108,30],[400,108,30],[500,145,26],[60,145,26],
        [510,378,28],[50,378,26],[310,445,30],[162,440,24],[400,442,24],
      ] as [number,number,number][]).map(([cx,cy,r],i) => (
        <polygon key={i} points={H(r)}
          transform={`translate(${cx},${cy})`}
          fill="none" stroke="rgba(6,182,212,0.045)" strokeWidth="1"/>
      ))}

      {/* ── Connection lines ── */}
      {[
        [CX, CY, sat.nw.x, sat.nw.y, 'rgba(6,182,212,0.28)'],
        [CX, CY, sat.ne.x, sat.ne.y, 'rgba(232,121,249,0.25)'],
        [CX, CY, sat.se.x, sat.se.y, 'rgba(24,119,242,0.25)'],
        [CX, CY, sat.sw.x, sat.sw.y, 'rgba(105,201,208,0.25)'],
      ].map(([x1,y1,x2,y2,stroke],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={stroke as string} strokeWidth="1.2" strokeDasharray="5 4"/>
      ))}

      {/* ── Particles along connection lines ── */}
      {/* NW particles */}
      <circle r="3.5" fill="#06B6D4" opacity="0.9" filter="url(#hp2-glow-cy)">
        <animateMotion dur="2.2s" repeatCount="indefinite" begin="0s"><mpath href="#hp2-nw"/></animateMotion>
      </circle>
      <circle r="2.5" fill="#06B6D4" opacity="0.5">
        <animateMotion dur="2.2s" repeatCount="indefinite" begin="1.1s"><mpath href="#hp2-nw-r"/></animateMotion>
      </circle>
      {/* NE particles */}
      <circle r="3" fill="#E879F9" opacity="0.9" filter="url(#hp2-glow-ma)">
        <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.4s"><mpath href="#hp2-ne"/></animateMotion>
      </circle>
      <circle r="2" fill="#E879F9" opacity="0.5">
        <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.65s"><mpath href="#hp2-ne-r"/></animateMotion>
      </circle>
      {/* SE particles */}
      <circle r="3" fill="#4285F4" opacity="0.9">
        <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.9s"><mpath href="#hp2-se"/></animateMotion>
      </circle>
      <circle r="2" fill="#4285F4" opacity="0.45">
        <animateMotion dur="2.8s" repeatCount="indefinite" begin="2.3s"><mpath href="#hp2-se-r"/></animateMotion>
      </circle>
      {/* SW particles */}
      <circle r="3" fill="#69C9D0" opacity="0.9" filter="url(#hp2-glow-cy)">
        <animateMotion dur="2.4s" repeatCount="indefinite" begin="1.4s"><mpath href="#hp2-sw"/></animateMotion>
      </circle>
      <circle r="2" fill="#69C9D0" opacity="0.5">
        <animateMotion dur="2.4s" repeatCount="indefinite" begin="2.6s"><mpath href="#hp2-sw-r"/></animateMotion>
      </circle>

      {/* ── Sonar rings from center ── */}
      {[
        { stroke: 'rgba(6,182,212,0.45)',   dur: '3s',   begin: '0s' },
        { stroke: 'rgba(232,121,249,0.35)', dur: '3s',   begin: '1s' },
        { stroke: 'rgba(6,182,212,0.30)',   dur: '3s',   begin: '2s' },
      ].map(({ stroke, dur, begin }, i) => (
        <circle key={i} cx={CX} cy={CY} fill="none" stroke={stroke} strokeWidth="1.5">
          <animate attributeName="r"       values="86;190;86"   dur={dur} repeatCount="indefinite" begin={begin}/>
          <animate attributeName="opacity" values="0.5;0;0.5"   dur={dur} repeatCount="indefinite" begin={begin}/>
        </circle>
      ))}

      {/* ════════════ CENTER HEX ════════════ */}
      <g transform={`translate(${CX},${CY})`}>
        {/* OUTER FIXED: translate only — inner has CSS animation */}
        <g className="hp2-center">
          {/* Gradient border: outer poly filled, inner poly covers to create border effect */}
          <polygon points={H(82)} fill="url(#hp2-center-grad)" opacity="0.80"/>
          <polygon points={H(77)} fill="#060D1A" opacity="0.98"/>
          {/* Inner tinted fill */}
          <polygon points={H(75)} fill="rgba(6,182,212,0.06)"/>
          {/* Inner dashed ring */}
          <polygon points={H(68)} fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="1" strokeDasharray="6 5"/>
          {/* Icon: simplified dashboard bars */}
          <g transform="translate(0, -14)">
            <rect x="-22" y="2"  width="9" height="20" rx="2" fill="rgba(6,182,212,0.55)"/>
            <rect x="-9"  y="-6" width="9" height="28" rx="2" fill="rgba(232,121,249,0.55)"/>
            <rect x="4"   y="-2" width="9" height="24" rx="2" fill="rgba(6,182,212,0.45)"/>
            <rect x="17"  y="-8" width="9" height="30" rx="2" fill="rgba(168,85,247,0.50)"/>
          </g>
          {/* Text */}
          <text y="32" textAnchor="middle" fontSize="10.5" fontWeight="700"
            fill="rgba(255,255,255,0.88)" letterSpacing="0.3">Tudo em um só lugar</text>
        </g>
      </g>

      {/* ════════════ NW: Google Ads ════════════ */}
      <g transform={`translate(${sat.nw.x},${sat.nw.y})`}>
        <g className="hp2-nw">
          {/* Neutral dark hex — same tone as TikTok */}
          <polygon points={H(60)} fill="rgba(7,10,22,0.97)"/>
          {/* Google Ads "A" — chunky arms, endpoints close so stripes almost touch */}
          <line x1="0" y1="-20" x2="-11" y2="16" stroke="#FBBC04" strokeWidth="13" strokeLinecap="round"/>
          <line x1="0" y1="-20" x2="11"  y2="16" stroke="#4285F4" strokeWidth="13" strokeLinecap="round"/>
          {/* Green circle overlapping base of yellow arm */}
          <circle cx="-11" cy="16" r="11" fill="#34A853"/>
        </g>
      </g>
      {/* NW label */}
      <g transform={`translate(${sat.nw.x}, ${sat.nw.y + 60 * .866 + 14})`}>
        <circle cx="-38" cy="-2" r="4" fill="#22C55E">
          <animate attributeName="r"       values="4;5.5;4"   dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.5;1"   dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <text x="-28" y="2"  fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.85)">Google Ads</text>
        <text x="-28" y="15" fontSize="8.5" fill="rgba(34,197,94,0.75)">Conectado</text>
      </g>

      {/* ════════════ NE: Instagram ════════════ */}
      <g transform={`translate(${sat.ne.x},${sat.ne.y})`}>
        <g className="hp2-ne">
          {/* Instagram gradient bg */}
          <polygon points={H(54)} fill="url(#hp2-ig-bg)"/>
          {/* Camera body — square stroke only */}
          <rect x="-16" y="-16" width="32" height="32" rx="7"
            fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="2.5"/>
          {/* Lens — stroke only */}
          <circle cy="0" r="9.5" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="2.5"/>
          {/* Flash dot — top-right */}
          <circle cx="11" cy="-10" r="3" fill="rgba(255,255,255,0.90)"/>
        </g>
      </g>
      {/* NE label */}
      <g transform={`translate(${sat.ne.x}, ${sat.ne.y + 54 * .866 + 14})`}>
        <circle cx="-38" cy="-2" r="4" fill="#22C55E">
          <animate attributeName="r"       values="4;5.5;4"   dur="1.9s" repeatCount="indefinite" begin="0.3s"/>
          <animate attributeName="opacity" values="1;0.5;1"   dur="1.9s" repeatCount="indefinite" begin="0.3s"/>
        </circle>
        <text x="-28" y="2"  fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.85)">Instagram</text>
        <text x="-28" y="15" fontSize="8.5" fill="rgba(34,197,94,0.75)">Conectado</text>
      </g>

      {/* ════════════ SE: Facebook ════════════ */}
      <g transform={`translate(${sat.se.x},${sat.se.y})`}>
        <g className="hp2-se">
          <polygon points={H(54)} fill="url(#hp2-fb-bg)"/>
          {/* Facebook "f" — vertical stem + curved top hook + crossbar */}
          <path d="M 0,22 L 0,-10 C 0,-22 2,-28 14,-28"
            stroke="rgba(255,255,255,0.95)" strokeWidth="8.5"
            strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <line x1="-3" y1="-3" x2="14" y2="-3"
            stroke="rgba(255,255,255,0.95)" strokeWidth="7.5"
            strokeLinecap="round"/>
        </g>
      </g>
      {/* SE label — above hex */}
      <g transform={`translate(${sat.se.x}, ${sat.se.y - 54 * .866 - 22})`}>
        <circle cx="-38" cy="-2" r="4" fill="#22C55E">
          <animate attributeName="r"       values="4;5.5;4"   dur="2.1s" repeatCount="indefinite" begin="0.7s"/>
          <animate attributeName="opacity" values="1;0.5;1"   dur="2.1s" repeatCount="indefinite" begin="0.7s"/>
        </circle>
        <text x="-28" y="2"  fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.85)">Facebook</text>
        <text x="-28" y="15" fontSize="8.5" fill="rgba(34,197,94,0.75)">Conectado</text>
      </g>

      {/* ════════════ SW: TikTok ════════════ */}
      <g transform={`translate(${sat.sw.x},${sat.sw.y})`}>
        <g className="hp2-sw">
          <polygon points={H(54)} fill="rgba(5,5,10,0.95)"/>
          {/* TikTok music note — 3-layer chromatic depth (official brand colors) */}
          {/* Cyan shadow: #25F4EE, subtle 1.5px diagonal — thin aura behind white */}
          <g transform="translate(-1.5, 1.5)" opacity="0.75">
            <ellipse cx="-7" cy="13" rx="10" ry="7.5" fill="#25F4EE" transform="rotate(-18,-7,13)"/>
            <rect x="2" y="-22" width="5" height="36" rx="2.5" fill="#25F4EE"/>
            <path d="M 7,-22 C 26,-16 25,-1 7,3" stroke="#25F4EE" strokeWidth="5" fill="none" strokeLinecap="round"/>
          </g>
          {/* Red shadow: #FE2C55, subtle 1.5px diagonal — thin aura behind white */}
          <g transform="translate(1.5, -1.5)" opacity="0.75">
            <ellipse cx="-7" cy="13" rx="10" ry="7.5" fill="#FE2C55" transform="rotate(-18,-7,13)"/>
            <rect x="2" y="-22" width="5" height="36" rx="2.5" fill="#FE2C55"/>
            <path d="M 7,-22 C 26,-16 25,-1 7,3" stroke="#FE2C55" strokeWidth="5" fill="none" strokeLinecap="round"/>
          </g>
          {/* White main layer */}
          <ellipse cx="-7" cy="13" rx="10" ry="7.5" fill="white" transform="rotate(-18,-7,13)"/>
          <rect x="2" y="-22" width="5" height="36" rx="2.5" fill="white"/>
          <path d="M 7,-22 C 26,-16 25,-1 7,3" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </g>
      </g>
      {/* SW label — above hex */}
      <g transform={`translate(${sat.sw.x}, ${sat.sw.y - 54 * .866 - 22})`}>
        <circle cx="-38" cy="-2" r="4" fill="#22C55E">
          <animate attributeName="r"       values="4;5.5;4"   dur="2.4s" repeatCount="indefinite" begin="1.2s"/>
          <animate attributeName="opacity" values="1;0.5;1"   dur="2.4s" repeatCount="indefinite" begin="1.2s"/>
        </circle>
        <text x="-28" y="2"  fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.85)">TikTok</text>
        <text x="-28" y="15" fontSize="8.5" fill="rgba(34,197,94,0.75)">Conectado</text>
      </g>
    </svg>
  )
}

// ── How It Works strip (exported — used in page.tsx after <Hero />) ───────────

export function HowItWorksStrip() {
  const steps = [
    {
      icon: (
        <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
          <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4z" stroke="#06B6D4" strokeWidth="1.8"/>
          <path d="M9 14h10M14 9v10" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      color: '#06B6D4',
      title: 'Conecte',
      desc: 'Google Ads, Meta e TikTok em menos de 5 minutos. Sem código.',
    },
    {
      icon: (
        <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
          <rect x="4" y="16" width="5" height="8" rx="1.5" fill="#E879F9" opacity="0.9"/>
          <rect x="11.5" y="10" width="5" height="14" rx="1.5" fill="#E879F9"/>
          <rect x="19" y="6" width="5" height="18" rx="1.5" fill="#E879F9" opacity="0.7"/>
          <line x1="4" y1="24" x2="24" y2="24" stroke="rgba(232,121,249,0.4)" strokeWidth="1.2"/>
        </svg>
      ),
      color: '#E879F9',
      title: 'Analise',
      desc: 'Seus resultados consolidados em tempo real, sem planilha.',
    },
    {
      icon: (
        <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
          <rect x="4" y="4" width="20" height="20" rx="5" stroke="#A855F7" strokeWidth="1.8"/>
          <path d="M9 14h10M14 9v10" stroke="#A855F7" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
          <circle cx="14" cy="14" r="3" fill="#A855F7" opacity="0.5"/>
        </svg>
      ),
      color: '#A855F7',
      title: 'Personalize',
      desc: 'Seus relatórios e dashboards no jeito que você precisa.',
    },
    {
      icon: (
        <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
          <circle cx="6"  cy="14" r="3.5" stroke="#06B6D4" strokeWidth="1.8"/>
          <circle cx="22" cy="7"  r="3.5" stroke="#06B6D4" strokeWidth="1.8"/>
          <circle cx="22" cy="21" r="3.5" stroke="#06B6D4" strokeWidth="1.8"/>
          <path d="M 9 13 L 19 8.5M 9 15 L 19 19.5" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        </svg>
      ),
      color: '#06B6D4',
      title: 'Compartilhe',
      desc: 'Com sua equipe e clientes em poucos cliques.',
    },
  ]

  return (
    <section
      id="como-funciona"
      className="py-16 px-4"
      style={{ background: 'rgba(5,11,24,0.98)', borderTop: '1px solid rgba(6,182,212,0.08)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ icon, color, title, desc }, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl"
              style={{
                background: 'rgba(10,15,30,0.6)',
                border: `1px solid ${color}22`,
                boxShadow: `0 0 20px ${color}08`,
              }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${color}12`, border: `1px solid ${color}30` }}>
                {icon}
              </div>
              <div>
                <p className="text-base font-bold mb-1.5" style={{ color }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Stats bar (exported) ─────────────────────────────────────────────────────

export function StatsBar() {
  const stats = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      value: '2',
      label: 'Plataformas integradas',
      sub: 'Google Ads + Meta Ads',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#E879F9" strokeWidth="1.8"/>
          <path d="M12 7v5l3 3" stroke="#E879F9" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      value: '< 5 min',
      label: 'Para conectar e ver dados',
      sub: 'Setup sem código',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <rect x="3" y="5" width="18" height="16" rx="3" stroke="#A855F7" strokeWidth="1.8"/>
          <path d="M3 10h18M8 3v4M16 3v4" stroke="#A855F7" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
      value: '7 dias',
      label: 'Trial gratuito',
      sub: 'Sem cartão de crédito',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#06B6D4" strokeWidth="1.8"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
      value: '100%',
      label: 'Suporte em PT-BR',
      sub: 'Time brasileiro',
    },
  ]

  return (
    <section className="py-10 px-4" style={{ background: 'rgba(6,11,22,1)', borderTop: '1px solid rgba(6,182,212,0.06)' }}>
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'rgba(6,182,212,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
          {stats.map(({ icon, value, label, sub }, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-7"
              style={{ background: 'rgba(5,11,24,0.97)' }}>
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(6,182,212,0.07)' }}>
                {icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-white leading-tight">{value}</p>
                <p className="text-xs font-medium mt-0.5" style={{ color: '#94A3B8' }}>{label}</p>
                <p className="text-[10px] mt-0.5" style={{ color: '#475569' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Main Hero ─────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center px-4 py-24 sm:py-32 overflow-hidden"
      style={{ background: '#050B18' }}
    >
      <style>{`
        /* ── Text fade-in ── */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
        .hfu-1 { animation: heroFadeUp .65s cubic-bezier(.16,1,.3,1) both; animation-delay:.10s; }
        .hfu-2 { animation: heroFadeUp .65s cubic-bezier(.16,1,.3,1) both; animation-delay:.26s; }
        .hfu-3 { animation: heroFadeUp .65s cubic-bezier(.16,1,.3,1) both; animation-delay:.42s; }
        .hfu-4 { animation: heroFadeUp .65s cubic-bezier(.16,1,.3,1) both; animation-delay:.58s; }
        .hfu-5 { animation: heroFadeUp .65s cubic-bezier(.16,1,.3,1) both; animation-delay:.74s; }

        /* ── Hex pulse animations (CSS on inner SVG groups) ── */
        /* transform-box + transform-origin make scale work around element center in SVG */
        .hp2-center, .hp2-nw, .hp2-ne, .hp2-se, .hp2-sw {
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes hp2CenterPulse {
          0%,100% { transform:scale(1); filter:drop-shadow(0 0 8px rgba(6,182,212,.35)) drop-shadow(0 0 18px rgba(232,121,249,.18)); }
          50%      { transform:scale(1.025); filter:drop-shadow(0 0 16px rgba(6,182,212,.65)) drop-shadow(0 0 32px rgba(232,121,249,.30)); }
        }
        @keyframes hp2NwPulse {
          0%,100% { transform:scale(1);    filter:drop-shadow(0 0 6px rgba(66,133,244,.35)); }
          50%      { transform:scale(1.05); filter:drop-shadow(0 0 14px rgba(66,133,244,.70)); }
        }
        @keyframes hp2NePulse {
          0%,100% { transform:scale(1);    filter:drop-shadow(0 0 6px rgba(200,80,160,.35)); }
          50%      { transform:scale(1.05); filter:drop-shadow(0 0 14px rgba(200,80,160,.70)); }
        }
        @keyframes hp2SePulse {
          0%,100% { transform:scale(1);    filter:drop-shadow(0 0 6px rgba(24,119,242,.40)); }
          50%      { transform:scale(1.05); filter:drop-shadow(0 0 14px rgba(24,119,242,.75)); }
        }
        @keyframes hp2SwPulse {
          0%,100% { transform:scale(1);    filter:drop-shadow(0 0 6px rgba(105,201,208,.35)); }
          50%      { transform:scale(1.05); filter:drop-shadow(0 0 14px rgba(105,201,208,.70)); }
        }
        /* Staggered timings so none synchronise */
        .hp2-center { animation: hp2CenterPulse 4.0s ease-in-out infinite; }
        .hp2-nw     { animation: hp2NwPulse     3.2s ease-in-out infinite 0.0s; }
        .hp2-ne     { animation: hp2NePulse     3.8s ease-in-out infinite 0.7s; }
        .hp2-se     { animation: hp2SePulse     3.5s ease-in-out infinite 1.4s; }
        .hp2-sw     { animation: hp2SwPulse     4.2s ease-in-out infinite 2.0s; }

        /* ── Mini chart cards ── */
        .mini-chart-card {
          position: absolute;
          background: rgba(8,13,28,0.88);
          border: 1px solid rgba(6,182,212,0.18);
          border-radius: 14px;
          backdrop-filter: blur(14px);
          padding: 9px 12px 8px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.45), 0 0 12px rgba(6,182,212,0.06);
          pointer-events: none;
        }
        .mini-label {
          font-size: 10px;
          font-weight: 600;
          color: rgba(148,163,184,0.8);
          margin-bottom: 6px;
          letter-spacing: .5px;
          text-transform: uppercase;
        }
        .mini-trend {
          font-size: 10px;
          font-weight: 700;
          margin-top: 5px;
        }
        @keyframes miniFloat {
          from { transform: translateY(0px); }
          to   { transform: translateY(-7px); }
        }
        .mini-float {
          animation: miniFloat 3.5s ease-in-out infinite alternate;
        }

        /* ── Legacy animations kept ── */
        @keyframes float {
          from { transform: perspective(1200px) rotateY(-6deg) rotateX(2deg) translateY(0px); }
          to   { transform: perspective(1200px) rotateY(-6deg) rotateX(2deg) translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(6,182,212,0.4), 0 0 20px rgba(6,182,212,0.15); }
          50% { box-shadow: 0 0 16px rgba(6,182,212,0.7), 0 0 40px rgba(6,182,212,0.25); }
        }
        @keyframes star-pulse {
          0%, 100% { opacity:.6; text-shadow:0 0 10px #06B6D4,0 0 30px rgba(6,182,212,.5); }
          50% { opacity:1; text-shadow:0 0 20px #06B6D4,0 0 50px rgba(6,182,212,.8),0 0 90px rgba(6,182,212,.4); }
        }

        /* ── Button styles ── */
        .cyber-btn-primary {
          background: linear-gradient(135deg,#22D3EE 0%,#EC4899 100%);
          box-shadow: 0 0 20px rgba(6,182,212,.4),0 0 40px rgba(232,121,249,.2),inset 0 1px 0 rgba(255,255,255,.1);
          transition: all .3s ease; color:#fff; font-weight:600; border:none;
        }
        .cyber-btn-primary:hover {
          box-shadow:0 0 30px rgba(6,182,212,.6),0 0 60px rgba(232,121,249,.35),inset 0 1px 0 rgba(255,255,255,.15);
          transform:translateY(-1px);
        }
        .cyber-btn-magenta {
          background:#D946EF;
          box-shadow:0 0 16px rgba(217,70,239,.5),0 0 32px rgba(232,121,249,.2),inset 0 1px 0 rgba(255,255,255,.12);
          transition:all .3s ease; color:#fff; font-weight:600; border:none;
        }
        .cyber-btn-magenta:hover { background:#C026D3; box-shadow:0 0 24px rgba(217,70,239,.7),0 0 48px rgba(232,121,249,.3); transform:translateY(-1px); }
        .cyber-btn-magenta:disabled { opacity:.6; }
        .cyber-btn-secondary {
          border:1px solid rgba(6,182,212,.6); color:#06B6D4; background:transparent;
          box-shadow:0 0 10px rgba(6,182,212,.15),inset 0 0 10px rgba(6,182,212,.05);
          transition:all .3s ease; font-weight:500;
        }
        .cyber-btn-secondary:hover {
          border-color:rgba(6,182,212,.9);
          box-shadow:0 0 20px rgba(6,182,212,.3),inset 0 0 20px rgba(6,182,212,.08);
          color:#67E8F9;
        }
        .cyber-input {
          background:rgba(6,182,212,.05)!important; border:1px solid rgba(6,182,212,.6)!important;
          color:#E2E8F0!important; transition:border-color .2s,box-shadow .2s;
        }
        .cyber-input:focus,.cyber-input:focus-visible {
          outline:none!important; border-color:#06B6D4!important;
          box-shadow:0 0 0 2px rgba(6,182,212,.25),0 0 12px rgba(6,182,212,.3)!important;
        }

        /* ── prefers-reduced-motion ── */
        @media (prefers-reduced-motion: reduce) {
          .hfu-1,.hfu-2,.hfu-3,.hfu-4,.hfu-5 { animation:none; opacity:1; transform:none; }
          .hp2-center,.hp2-nw,.hp2-ne,.hp2-se,.hp2-sw { animation:none; filter:none; }
          .mini-float { animation:none; }
        }
      `}</style>

      {/* ── Radial glows ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.25) 0%, rgba(6,182,212,0.20) 40%, transparent 70%)' }}/>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% -5%, rgba(6,182,212,0.18) 0%, transparent 65%)' }}/>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 45% 60% at 90% 50%, rgba(124,58,237,0.15) 0%, transparent 65%)' }}/>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 100% 0%, rgba(232,121,249,0.18) 0%, rgba(217,70,239,0.08) 40%, transparent 70%)' }}/>

      {/* ── PCB Circuit Traces ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
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
          <path d="M 560 180 H 760 V 140 H 980 V 200 H 1200 V 160 H 1380" stroke="rgba(6,182,212,0.35)" strokeWidth="1" fill="none"/>
          <circle cx="760"  cy="180" r="2.5" fill="rgba(6,182,212,0.65)"/>
          <circle cx="980"  cy="140" r="3"   fill="rgba(6,182,212,0.70)" filter="url(#pcb-glow-cy)"/>
          <circle cx="1200" cy="200" r="2.5" fill="rgba(6,182,212,0.60)"/>
          <path d="M 680 420 H 860 V 380 H 1060 V 440 H 1260 V 400 H 1440" stroke="rgba(6,182,212,0.28)" strokeWidth="1" fill="none"/>
          <circle cx="1060" cy="380" r="3"   fill="rgba(6,182,212,0.65)" filter="url(#pcb-glow-cy)"/>
          <path d="M 600 620 H 820 V 580 H 1020 V 640 H 1220 V 600 H 1440" stroke="rgba(232,121,249,0.22)" strokeWidth="1" fill="none"/>
          <circle cx="1020" cy="580" r="3"   fill="rgba(232,121,249,0.58)" filter="url(#pcb-glow-ma)"/>
          <circle cx="980" cy="140" r="5" fill="none" stroke="rgba(6,182,212,0.60)" strokeWidth="1">
            <animate attributeName="r"       values="5;9;5"       dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.60;0;0.60" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="1060" cy="380" r="5" fill="none" stroke="rgba(6,182,212,0.55)" strokeWidth="1">
            <animate attributeName="r"       values="5;8;5"       dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.55;0;0.55" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="1020" cy="580" r="5" fill="none" stroke="rgba(232,121,249,0.55)" strokeWidth="1">
            <animate attributeName="r"       values="5;9;5"       dur="3.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.55;0;0.55" dur="3.5s" repeatCount="indefinite"/>
          </circle>
          <path d="M 760 320 H 560 V 160 H 340 V 220 H 140" stroke="rgba(6,182,212,0.38)" strokeWidth="1" fill="none"/>
          <circle cx="340" cy="160" r="3"   fill="rgba(6,182,212,0.65)"/>
          <circle cx="140" cy="220" r="4.5" fill="rgba(6,182,212,0.55)" filter="url(#pcb-glow-cy)"/>
          <path d="M 340 160 H 240 V 60 H 80"  stroke="rgba(6,182,212,0.28)" strokeWidth="1" fill="none"/>
          <circle cx="80"  cy="60"  r="4"   fill="rgba(6,182,212,0.48)" filter="url(#pcb-glow-cy)"/>
          <path d="M 900 760 H 680 V 848 H 440 V 800 H 260 V 860" stroke="rgba(6,182,212,0.30)" strokeWidth="1" fill="none"/>
          <circle cx="260" cy="800" r="2.5" fill="rgba(6,182,212,0.55)"/>
          <path d="M 0 168 H 220 V 80 H 480 V 128 H 660 V 56 H 740" stroke="rgba(6,182,212,0.32)" strokeWidth="1" fill="none"/>
          <circle cx="480" cy="80"  r="3.5" fill="rgba(6,182,212,0.68)" filter="url(#pcb-glow-cy)"/>
          <circle cx="740" cy="56"  r="4.5" fill="rgba(6,182,212,0.52)" filter="url(#pcb-glow-cy)"/>
          <path d="M 0 480 H 160 V 380 H 320 V 300 H 200 V 240" stroke="rgba(6,182,212,0.26)" strokeWidth="1" fill="none"/>
          <circle cx="320" cy="380" r="3"   fill="rgba(6,182,212,0.60)"/>
          <circle cx="200" cy="240" r="4"   fill="rgba(6,182,212,0.48)" filter="url(#pcb-glow-cy)"/>
          <path d="M 1440 460 H 1380 V 360 H 1300 V 280" stroke="rgba(6,182,212,0.22)" strokeWidth="1" fill="none"/>
          <circle cx="1300" cy="280" r="4"  fill="rgba(6,182,212,0.48)" filter="url(#pcb-glow-cy)"/>
          <path d="M 1060 160 V 72 H 1260 V 20"   stroke="rgba(147,51,234,0.32)" strokeWidth="1" fill="none"/>
          <circle cx="1260" cy="72" r="3"  fill="rgba(147,51,234,0.65)" filter="url(#pcb-glow-pu)"/>
          <path d="M 1440 300 H 1320 V 200 H 1160 V 100 H 1080" stroke="rgba(147,51,234,0.24)" strokeWidth="1" fill="none"/>
          <circle cx="1080" cy="100" r="4" fill="rgba(147,51,234,0.48)" filter="url(#pcb-glow-pu)"/>
          <path d="M 400 560 H 220 V 660 H 100 V 760" stroke="rgba(147,51,234,0.24)" strokeWidth="1" fill="none"/>
          <circle cx="100" cy="760" r="4"  fill="rgba(147,51,234,0.48)" filter="url(#pcb-glow-pu)"/>
          <path d="M 1360 680 V 820 H 1200 V 760 H 1060 V 868" stroke="rgba(232,121,249,0.25)" strokeWidth="1" fill="none"/>
          <circle cx="1200" cy="820" r="3" fill="rgba(232,121,249,0.58)" filter="url(#pcb-glow-ma)"/>
          <path d="M 0 720 H 140 V 820 H 300 V 760 H 460 V 840 H 560" stroke="rgba(232,121,249,0.28)" strokeWidth="1" fill="none"/>
          <circle cx="300" cy="820" r="3"  fill="rgba(232,121,249,0.60)" filter="url(#pcb-glow-ma)"/>
          <circle cx="480" cy="80"  r="5" fill="none" stroke="rgba(6,182,212,0.55)" strokeWidth="1">
            <animate attributeName="r"       values="5;9;5"       dur="3s"   repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.55;0;0.55" dur="3s"   repeatCount="indefinite"/>
          </circle>
          <circle cx="300" cy="820" r="5" fill="none" stroke="rgba(232,121,249,0.55)" strokeWidth="1">
            <animate attributeName="r"       values="5;9;5"       dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.55;0;0.55" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="1260" cy="72" r="5" fill="none" stroke="rgba(147,51,234,0.60)" strokeWidth="1">
            <animate attributeName="r"       values="5;9;5"       dur="3.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.60;0;0.60" dur="3.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="320"  cy="380" r="5" fill="none" stroke="rgba(6,182,212,0.50)" strokeWidth="1">
            <animate attributeName="r"       values="5;8;5"       dur="2.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.50;0;0.50" dur="2.8s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* ── Left column ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

          <div className="hfu-1 mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
            style={{ border:'1px solid #06B6D4', background:'rgba(6,182,212,0.07)', color:'#06B6D4',
              boxShadow:'0 0 15px rgba(6,182,212,0.5), inset 0 0 12px rgba(6,182,212,0.08)',
              animation:'pulse-glow 3s ease-in-out infinite' }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background:'#06B6D4', boxShadow:'0 0 6px #06B6D4' }}/>
            Lançamento beta limitado em 2026. Garanta seu lugar.
          </div>

          <h1 className="hfu-2 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-tight"
            style={{ color:'#E2E8F0' }}>
            Chega de abrir 4 plataformas pra{' '}
            <span style={{ color:'#06B6D4', textShadow:'0 0 20px rgba(6,182,212,0.8)' }}>montar</span>
            {' '}um{' '}
            <span style={{ color:'#E879F9', textShadow:'0 0 20px rgba(232,121,249,0.8)' }}>relatório.</span>
          </h1>

          <p className="hfu-3 mt-6 max-w-xl text-lg leading-relaxed" style={{ color:'#94A3B8' }}>
            GetDashia centraliza Google Ads, Meta Ads e e-commerce em um painel
            único. Você vê qual canal gerou cada venda — em minutos, não em horas.
          </p>

          <div className="hfu-4 mt-10 flex flex-col items-center lg:items-start gap-4 sm:flex-row">
            <a href="/cadastro" className="cyber-btn-primary inline-flex h-11 items-center justify-center rounded-lg px-6 text-base">
              Garantir meu lugar →
            </a>
            <a href="#como-funciona" className="cyber-btn-secondary inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm">
              Ver como funciona
            </a>
          </div>

          <div id="waitlist" className="hfu-5 mt-10 w-full max-w-md scroll-mt-24 rounded-2xl p-8"
            style={{ background:'rgba(10,15,30,0.8)', border:'1px solid rgba(6,182,212,0.2)',
              boxShadow:'0 0 30px rgba(6,182,212,0.05), inset 0 0 30px rgba(6,182,212,0.02)',
              backdropFilter:'blur(12px)' }}>
            <p className="mb-1 text-base font-semibold" style={{ color:'#E2E8F0' }}>
              Seja um dos primeiros a testar
            </p>
            <p className="mb-6 text-sm" style={{ color:'#64748B' }}>
              Crie sua conta agora e comece a usar. Sem cartão, acesso imediato.
            </p>
            <a href="/cadastro"
              className="cyber-btn-magenta inline-flex w-full h-10 items-center justify-center rounded-lg px-4 text-sm">
              Garantir meu lugar →
            </a>
          </div>
        </div>

        {/* ── Right column — hex platform network ── */}
        <div className="hidden lg:flex justify-center items-center relative">
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex:0,
            background:'radial-gradient(ellipse 85% 85% at 50% 50%, rgba(6,182,212,0.10) 0%, rgba(232,121,249,0.06) 50%, transparent 80%)' }}/>
          <div style={{ position:'relative', zIndex:1, width:'115%', maxWidth:'680px', marginRight:'-8%' }}>
            <HeroPlatforms />
            {/* ── Mini chart cards (absolute, floating around the SVG) ── */}
            <div style={{ position:'absolute', top:'-24%', left:'8%' }}><MiniBarChart4 /></div>
            <div style={{ position:'absolute', top:'18%',  right:'-15%' }}><MiniLineChart /></div>
            <div style={{ position:'absolute', bottom:'18%', left:'-14%' }}><MiniDonutChart /></div>
            <div style={{ position:'absolute', bottom:'-2%', right:'12%' }}><MiniBars5Chart /></div>
          </div>
        </div>

      </div>

      {/* Decorative star */}
      <div aria-hidden className="pointer-events-none absolute bottom-8 right-8 hidden lg:block"
        style={{ fontSize:'3rem', color:'#06B6D4', lineHeight:1, animation:'star-pulse 2.5s ease-in-out infinite', zIndex:1 }}>
        ✦
      </div>
    </section>
  )
}
