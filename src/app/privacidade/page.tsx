import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | GetDashia",
  description:
    "Saiba como o GetDashia coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
};

const secoes = [
  {
    titulo: "Meta Ads Integration — ads_read permission (English summary)",
    conteudo: (
      <>
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 px-5 py-4 mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400 mb-3">
            English summary
          </p>
          <p className="mb-3">
            GetDashia connects to the Meta Marketing API using the <strong className="text-zinc-100">ads_read</strong> permission only.
            This is a <strong className="text-zinc-100">read-only</strong> permission — we never create, modify, or delete
            any campaigns, ad sets, ads, or any other Meta resource on your behalf.
          </p>
          <p className="mb-3"><strong className="text-zinc-100">What we read:</strong></p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>Campaign-level performance metrics: impressions, clicks, spend, conversions, and revenue.</li>
            <li>The list of ad accounts your Facebook user has access to.</li>
          </ul>
          <p className="mb-3"><strong className="text-zinc-100">Why we read it:</strong></p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>To display consolidated campaign performance in your GetDashia dashboard.</li>
            <li>To generate attribution reports comparing Google Ads and Meta Ads results.</li>
          </ul>
          <p className="mb-3"><strong className="text-zinc-100">What we do NOT do:</strong></p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>We do not sell your Meta data. When you click &lsquo;Analyze my campaigns&rsquo;, only aggregated numeric metrics (spend, clicks, impressions, conversions, revenue, ROAS and CPA) are sent to OpenAI to generate the analysis. No campaign names, ad account IDs, user IDs or access tokens are sent.</li>
            <li>We do not use your data for advertising, profiling, or any purpose beyond the dashboard.</li>
            <li>We do not access your personal Facebook profile, friends, posts, or messages.</li>
          </ul>
          <p className="mb-3">
            The OAuth access token is stored encrypted in our database (Supabase/AWS) and is never
            exposed to the frontend or to any external service other than the Meta Marketing API.
          </p>
          <p>
            To revoke access or request data deletion, see our{' '}
            <Link href="/exclusao-de-dados" className="text-indigo-400 hover:text-indigo-300 underline">
              Data Deletion Instructions
            </Link>{' '}
            page or email{' '}
            <a href="mailto:luciano@getdashia.com.br" className="text-indigo-400 hover:text-indigo-300">
              luciano@getdashia.com.br
            </a>.
          </p>
        </div>
      </>
    ),
  },
  {
    titulo: "1. Quem somos",
    conteudo: (
      <>
        <p>
          O GetDashia é uma plataforma SaaS de análise de marketing digital,
          operada por <strong>Luciano de Santana Oliveira</strong>, microempreendedor
          individual (MEI), CNPJ 67.845.823/0001-99, com endereço em Rua &quot;A&quot;, nº 167, Mogi das Cruzes —
          SP, CEP 08766-520.
        </p>
        <p className="mt-3">
          Para dúvidas sobre privacidade, entre em contato pelo e-mail{" "}
          <a
            href="mailto:luciano@getdashia.com.br"
            className="text-indigo-400 hover:text-indigo-300"
          >
            luciano@getdashia.com.br
          </a>
          .
        </p>
      </>
    ),
  },
  {
    titulo: "2. Dados que coletamos",
    conteudo: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Dados de cadastro:</strong> nome, e-mail e senha (armazenada
          em hash).
        </li>
        <li>
          <strong>Dados da organização:</strong> nome da empresa informado no
          onboarding.
        </li>
        <li>
          <strong>Dados de uso:</strong> páginas visitadas, tempo de sessão e
          eventos de interação dentro da plataforma.
        </li>
        <li>
          <strong>Dados de integrações:</strong> tokens de acesso OAuth das
          plataformas de anúncios conectadas (Google Ads, Meta Ads). Usamos
          apenas para leitura de métricas; nunca criamos ou editamos campanhas.
        </li>
        <li>
          <strong>Dados técnicos:</strong> endereço IP, tipo de navegador,
          sistema operacional e cookies de sessão.
        </li>
      </ul>
    ),
  },
  {
    titulo: "3. Como usamos seus dados",
    conteudo: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Autenticar e manter sua sessão ativa.</li>
        <li>Exibir métricas consolidadas de campanhas no painel.</li>
        <li>Enviar comunicações transacionais (confirmação de e-mail, etc.).</li>
        <li>Melhorar a plataforma com base em dados agregados de uso.</li>
        <li>Gerar análises automáticas das métricas agregadas das campanhas, por meio de inteligência artificial, apenas quando o usuário solicitar.</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </ul>
    ),
  },
  {
    titulo: "4. Base legal (LGPD)",
    conteudo: (
      <p>
        O tratamento dos seus dados pessoais é fundamentado nas seguintes bases
        legais previstas na Lei nº 13.709/2018 (LGPD): <strong>execução de
        contrato</strong> (art. 7º, V) para prestação dos serviços da
        plataforma; <strong>consentimento</strong> (art. 7º, I) para
        comunicações de marketing; e <strong>legítimo interesse</strong> (art.
        7º, IX) para análise de uso e segurança da plataforma.
      </p>
    ),
  },
  {
    titulo: "5. Compartilhamento de dados",
    conteudo: (
      <>
        <p>
          Não vendemos seus dados. Compartilhamos apenas com fornecedores
          essenciais à operação:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Supabase</strong> — banco de dados e autenticação.
          </li>
          <li>
            <strong>Vercel</strong> — hospedagem da aplicação.
          </li>
          <li>
            <strong>Google LLC / Meta Platforms</strong> — apenas para leitura
            de dados via APIs autorizadas por você.
          </li>
          <li>
            <strong>OpenAI</strong> — análise por inteligência artificial. Recebe apenas métricas numéricas
            agregadas das campanhas (sem nomes de campanhas, IDs de contas, IDs de usuários ou tokens),
            somente quando o usuário aciona o recurso &ldquo;Analyze my campaigns&rdquo;.
          </li>
        </ul>
        <p className="mt-3">
          Todos os fornecedores operam com contratos de proteção de dados
          compatíveis com a LGPD e o GDPR.
        </p>
      </>
    ),
  },
  {
    titulo: "6. Armazenamento e segurança",
    conteudo: (
      <p>
        Seus dados são armazenados em servidores localizados nos Estados Unidos
        (Supabase/AWS). Adotamos criptografia em trânsito (TLS 1.2+) e em
        repouso. Tokens OAuth são armazenados de forma encriptada e nunca
        expostos no frontend. Os dados são retidos enquanto sua conta estiver
        ativa; após exclusão, são apagados em até 30 dias.
      </p>
    ),
  },
  {
    titulo: "7. Seus direitos",
    conteudo: (
      <>
        <p>Nos termos da LGPD, você tem direito a:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Confirmar a existência e acessar seus dados.</li>
          <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
          <li>Solicitar anonimização, bloqueio ou eliminação de dados.</li>
          <li>Revogar o consentimento a qualquer momento.</li>
          <li>Portabilidade dos dados a outro fornecedor de serviço.</li>
          <li>Informação sobre compartilhamento com terceiros.</li>
        </ul>
        <p className="mt-3">
          Para exercer qualquer direito, envie um e-mail para{" "}
          <a
            href="mailto:luciano@getdashia.com.br"
            className="text-indigo-400 hover:text-indigo-300"
          >
            luciano@getdashia.com.br
          </a>
          . Respondemos em até 15 dias úteis.
        </p>
      </>
    ),
  },
  {
    titulo: "8. Cookies",
    conteudo: (
      <p>
        Utilizamos cookies estritamente necessários para autenticação e sessão.
        Não utilizamos cookies de rastreamento de terceiros para fins
        publicitários. Você pode desativar cookies no seu navegador, mas isso
        pode impedir o funcionamento correto da plataforma.
      </p>
    ),
  },
  {
    titulo: "9. Alterações nesta política",
    conteudo: (
      <p>
        Podemos atualizar esta Política de Privacidade periodicamente.
        Notificaremos alterações relevantes por e-mail ou por aviso na
        plataforma. O uso continuado após a notificação implica aceite das
        mudanças.
      </p>
    ),
  },
  {
    titulo: "10. Contato",
    conteudo: (
      <ul className="space-y-1">
        <li>
          <strong>Responsável:</strong> Luciano de Santana Oliveira
        </li>
        <li>
          <strong>CNPJ:</strong> 67.845.823/0001-99
        </li>
        <li>
          <strong>Endereço:</strong> Rua &quot;A&quot;, nº 167, Mogi das Cruzes
          — SP, CEP 08766-520
        </li>
        <li>
          <strong>E-mail:</strong>{" "}
          <a
            href="mailto:luciano@getdashia.com.br"
            className="text-indigo-400 hover:text-indigo-300"
          >
            luciano@getdashia.com.br
          </a>
        </li>
      </ul>
    ),
  },
];

export default function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-16 text-zinc-100">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-10 inline-block text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          ← Voltar para o início
        </Link>

        <h1 className="mb-2 text-3xl font-bold">Política de Privacidade</h1>
        <p className="mb-10 text-sm text-zinc-500">
          Última atualização: outubro de 2026
        </p>

        <div className="space-y-10">
          {secoes.map((s) => (
            <section key={s.titulo}>
              <h2 className="mb-3 text-xl font-semibold text-zinc-100">
                {s.titulo}
              </h2>
              <div className="text-zinc-300 leading-relaxed">{s.conteudo}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
