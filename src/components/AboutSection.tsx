'use client'

export default function AboutSection() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden px-4 py-24"
      style={{ background: "#050B18" }}
    >
      {/* PCB traces */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 1440 500"
             preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 150 H 200 V 100 H 500 V 150 H 750"
                stroke="rgba(6,182,212,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="200" cy="150" r="2" fill="rgba(6,182,212,0.14)"/>
          <circle cx="200" cy="100" r="2" fill="rgba(6,182,212,0.14)"/>
          <circle cx="500" cy="100" r="2" fill="rgba(6,182,212,0.14)"/>
          <circle cx="500" cy="150" r="2" fill="rgba(6,182,212,0.14)"/>

          <path d="M 1440 350 H 1100 V 400 H 850 V 350"
                stroke="rgba(232,121,249,0.06)" strokeWidth="1" fill="none"/>
          <circle cx="1100" cy="350" r="2" fill="rgba(232,121,249,0.12)"/>
          <circle cx="1100" cy="400" r="2" fill="rgba(232,121,249,0.12)"/>
          <circle cx="850"  cy="400" r="2" fill="rgba(232,121,249,0.12)"/>
          <circle cx="850"  cy="350" r="2" fill="rgba(232,121,249,0.12)"/>

          <path d="M 50 0 V 150 H 20 V 350 H 50"
                stroke="rgba(168,85,247,0.05)" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* Glow lateral esquerdo */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(ellipse 40% 60% at 20% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)", zIndex: 0 }}/>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Título */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#E2E8F0" }}>
            Sobre o{" "}
            <span style={{
              background: "linear-gradient(90deg, #06B6D4 0%, #E879F9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              GetDashia
            </span>
          </h2>
          <div className="mx-auto mt-4 h-px w-40" style={{
            background: "linear-gradient(90deg, transparent 0%, #06B6D4 30%, #E879F9 70%, transparent 100%)",
          }}/>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

          {/* Texto principal */}
          <div>
            <p className="mb-5 text-lg leading-relaxed" style={{ color: "#CBD5E1" }}>
              O GetDashia nasceu para resolver um problema real: gestores de
              tráfego e donos de e-commerce brasileiros perdiam horas alternando
              entre o painel do Google Ads e o Gerenciador de Anúncios da Meta
              para entender a performance das campanhas.
            </p>
            <p className="mb-5 leading-relaxed" style={{ color: "#94A3B8" }}>
              Nossa plataforma centraliza as métricas de Google Ads e Meta Ads
              em um único painel inteligente. Em vez de copiar números para
              planilhas, você tem uma visão consolidada em tempo real — gastos,
              impressões, cliques, conversões e ROAS — de todas as suas
              campanhas em um só lugar.
            </p>
            <p className="leading-relaxed" style={{ color: "#94A3B8" }}>
              Construído no Brasil para o mercado brasileiro, o GetDashia respeita
              a LGPD e acessa seus dados de anúncios somente para leitura: nunca
              criamos, editamos ou pausamos campanhas em seu nome.
            </p>

            {/* Pills de destaque */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["Somente leitura", "LGPD compliant", "Feito no Brasil"].map((tag) => (
                <span key={tag}
                      className="text-xs font-medium px-3 py-1.5 rounded-full border"
                      style={{
                        borderColor: "rgba(6,182,212,0.30)",
                        background: "rgba(6,182,212,0.06)",
                        color: "#06B6D4",
                      }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card de informações */}
          <div
            style={{
              background: "rgba(10,15,40,0.70)",
              border: "1px solid rgba(6,182,212,0.20)",
              borderRadius: "20px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 30px rgba(6,182,212,0.06)",
              padding: "32px",
            }}
          >
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#475569" }}>
              Informações
            </h3>

            {/* Divider */}
            <div className="mb-6 h-px" style={{
              background: "linear-gradient(90deg, #06B6D4 0%, #E879F9 100%)",
              opacity: 0.20,
            }}/>

            <dl className="space-y-5">
              {[
                { label: "Produto", value: "GetDashia" },
                { label: "Responsável", value: "Luciano De Santana Oliveira" },
                {
                  label: "Endereço",
                  value: (
                    <>Rua &quot;A&quot;, nº 167<br />Mogi das Cruzes — SP<br />CEP 08766-520</>
                  ),
                },
                {
                  label: "E-mail",
                  value: (
                    <a href="mailto:luciano@getdashia.com.br"
                       style={{ color: "#06B6D4", textDecoration: "none" }}
                       onMouseEnter={e => (e.currentTarget.style.textShadow = "0 0 8px rgba(6,182,212,0.50)")}
                       onMouseLeave={e => (e.currentTarget.style.textShadow = "none")}>
                      luciano@getdashia.com.br
                    </a>
                  ),
                },
                {
                  label: "Site",
                  value: (
                    <a href="https://www.getdashia.com.br"
                       target="_blank"
                       rel="noopener noreferrer"
                       style={{ color: "#06B6D4", textDecoration: "none" }}
                       onMouseEnter={e => (e.currentTarget.style.textShadow = "0 0 8px rgba(6,182,212,0.50)")}
                       onMouseLeave={e => (e.currentTarget.style.textShadow = "none")}>
                      www.getdashia.com.br
                    </a>
                  ),
                },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="mb-1 text-xs font-medium uppercase tracking-wide"
                      style={{ color: "#334155" }}>
                    {label}
                  </dt>
                  <dd className="text-sm" style={{ color: "#CBD5E1" }}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
