export default function AboutSection() {
  return (
    <section id="sobre" className="bg-zinc-900/50 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Texto principal */}
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Sobre o GetDashia
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-zinc-300">
              O GetDashia nasceu para resolver um problema real: gestores de
              tráfego e donos de e-commerce brasileiros perdiam horas alternando
              entre o painel do Google Ads e o Gerenciador de Anúncios da Meta
              para entender a performance das campanhas.
            </p>
            <p className="mb-4 leading-relaxed text-zinc-400">
              Nossa plataforma centraliza as métricas de Google Ads e Meta Ads
              em um único painel inteligente. Em vez de copiar números para
              planilhas, você tem uma visão consolidada em tempo real — gastos,
              impressões, cliques, conversões e ROAS — de todas as suas
              campanhas em um só lugar.
            </p>
            <p className="leading-relaxed text-zinc-400">
              Construído no Brasil para o mercado brasileiro, o GetDashia respeita
              a LGPD e acessa seus dados de anúncios somente para leitura: nunca
              criamos, editamos ou pausamos campanhas em seu nome.
            </p>
          </div>

          {/* Card de informações */}
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-8">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-400">
              Informações
            </h3>
            <dl className="space-y-5">
              <div>
                <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Produto
                </dt>
                <dd className="text-zinc-200">GetDashia</dd>
              </div>
              <div>
                <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Responsável
                </dt>
                <dd className="text-zinc-200">Luciano De Santana Oliveira</dd>
              </div>
              <div>
                <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Endereço
                </dt>
                <dd className="text-zinc-200">
                  Rua &quot;A&quot;, nº 167
                  <br />
                  Mogi das Cruzes — SP
                  <br />
                  CEP 08766-520
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  E-mail
                </dt>
                <dd>
                  <a
                    href="mailto:luciano@getdashia.com.br"
                    className="text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    luciano@getdashia.com.br
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Site
                </dt>
                <dd>
                  <a
                    href="https://www.getdashia.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    www.getdashia.com.br
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
