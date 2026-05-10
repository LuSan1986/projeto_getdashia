import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | GetDashia",
  description:
    "Leia os Termos de Uso do GetDashia antes de utilizar a plataforma.",
};

const secoes = [
  {
    titulo: "1. Aceitação dos termos",
    conteudo: (
      <p>
        Ao criar uma conta ou utilizar o GetDashia, você concorda integralmente
        com estes Termos de Uso. Se não concordar, não utilize a plataforma.
        Estes termos regem a relação entre você e{" "}
        <strong>Luciano De Santana Oliveira</strong>, operador do GetDashia.
      </p>
    ),
  },
  {
    titulo: "2. Descrição do serviço",
    conteudo: (
      <p>
        O GetDashia é uma plataforma SaaS que consolida métricas de campanhas
        publicitárias de diferentes fontes (Google Ads, Meta Ads) em um único
        painel de controle. O serviço é voltado a gestores de tráfego, agências
        e donos de negócios que precisam visualizar dados de performance de
        forma centralizada.
      </p>
    ),
  },
  {
    titulo: "3. Cadastro e conta",
    conteudo: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Você deve fornecer informações verdadeiras e mantê-las atualizadas.
        </li>
        <li>
          É responsável pela confidencialidade de sua senha e por todas as
          atividades realizadas com sua conta.
        </li>
        <li>
          Notifique-nos imediatamente em caso de acesso não autorizado pelo
          e-mail{" "}
          <a
            href="mailto:luciano@getdashia.com.br"
            className="text-indigo-400 hover:text-indigo-300"
          >
            luciano@getdashia.com.br
          </a>
          .
        </li>
        <li>
          É permitida apenas uma conta por pessoa ou organização, salvo acordo
          expresso.
        </li>
      </ul>
    ),
  },
  {
    titulo: "4. Integrações com Google Ads e Meta Ads",
    conteudo: (
      <>
        <p>
          Ao conectar suas contas de anúncios ao GetDashia, você nos autoriza
          a acessar seus dados de campanha via APIs oficiais do Google e da
          Meta. É importante compreender que:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            O acesso é <strong>somente leitura</strong>: o GetDashia nunca
            cria, edita, pausa ou exclui campanhas em seu nome.
          </li>
          <li>
            Os tokens de acesso OAuth são armazenados de forma encriptada e
            utilizados exclusivamente para buscar métricas.
          </li>
          <li>
            Você pode revogar o acesso a qualquer momento diretamente nas
            configurações das plataformas de anúncios ou no painel do
            GetDashia.
          </li>
          <li>
            O uso das APIs segue as políticas de dados do Google e da Meta; ao
            conectar suas contas, você confirma ter lido e aceito essas
            políticas.
          </li>
        </ul>
      </>
    ),
  },
  {
    titulo: "5. Planos e pagamento",
    conteudo: (
      <>
        <p>
          O GetDashia oferece um período de acesso gratuito durante a fase
          beta. Planos pagos poderão ser introduzidos futuramente, com aviso
          prévio de ao menos 30 dias.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Preços e condições de planos pagos serão detalhados no momento da
            oferta.
          </li>
          <li>
            Cobranças são feitas antecipadamente pelo período contratado
            (mensal ou anual).
          </li>
          <li>
            Reembolsos podem ser solicitados em até 7 dias corridos da
            contratação, conforme o Código de Defesa do Consumidor.
          </li>
        </ul>
      </>
    ),
  },
  {
    titulo: "6. Uso aceitável",
    conteudo: (
      <>
        <p>É vedado:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Fazer engenharia reversa ou descompilar a plataforma.</li>
          <li>
            Utilizar a plataforma para fins ilegais ou que violem direitos de
            terceiros.
          </li>
          <li>
            Sobrecarregar os servidores com requisições automatizadas (scraping,
            bots).
          </li>
          <li>
            Revender ou sublicenciar o acesso sem autorização expressa por
            escrito.
          </li>
          <li>
            Tentar acessar contas ou dados de outros usuários.
          </li>
        </ul>
      </>
    ),
  },
  {
    titulo: "7. Propriedade intelectual",
    conteudo: (
      <p>
        Todo o conteúdo da plataforma — interface, código-fonte, marca,
        logotipo e textos — é de propriedade exclusiva de Luciano De Santana
        Oliveira. Os dados de campanhas pertencem ao respectivo anunciante.
        Nenhuma licença implícita é concedida além do uso necessário para operar
        a plataforma.
      </p>
    ),
  },
  {
    titulo: "8. Disponibilidade do serviço",
    conteudo: (
      <p>
        Não garantimos disponibilidade ininterrupta. Realizaremos manutenções
        programadas com aviso prévio sempre que possível. Interrupções
        temporárias não geram direito a reembolso proporcional durante o período
        beta.
      </p>
    ),
  },
  {
    titulo: "9. Limitação de responsabilidade",
    conteudo: (
      <p>
        O GetDashia exibe dados fornecidos pelas APIs de terceiros (Google, Meta)
        e não se responsabiliza por imprecisões nesses dados. Em nenhuma
        circunstância a responsabilidade total do GetDashia excederá o valor
        pago pelo usuário nos últimos 3 meses. Não somos responsáveis por danos
        indiretos, lucros cessantes ou perda de oportunidades de negócio.
      </p>
    ),
  },
  {
    titulo: "10. Encerramento de conta",
    conteudo: (
      <p>
        Você pode encerrar sua conta a qualquer momento enviando um e-mail para{" "}
        <a
          href="mailto:luciano@getdashia.com.br"
          className="text-indigo-400 hover:text-indigo-300"
        >
          luciano@getdashia.com.br
        </a>
        . Reservamo-nos o direito de suspender ou encerrar contas que violem
        estes termos, com notificação prévia sempre que possível. Após o
        encerramento, seus dados serão excluídos em até 30 dias.
      </p>
    ),
  },
  {
    titulo: "11. Lei aplicável e foro",
    conteudo: (
      <p>
        Estes Termos são regidos pela legislação brasileira. As partes elegem o
        foro da Comarca de Mogi das Cruzes, Estado de São Paulo, para dirimir
        quaisquer controvérsias decorrentes deste instrumento, com renúncia a
        qualquer outro, por mais privilegiado que seja.
      </p>
    ),
  },
  {
    titulo: "12. Contato",
    conteudo: (
      <ul className="space-y-1">
        <li>
          <strong>Responsável:</strong> Luciano De Santana Oliveira
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

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-16 text-zinc-100">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-10 inline-block text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          ← Voltar para o início
        </Link>

        <h1 className="mb-2 text-3xl font-bold">Termos de Uso</h1>
        <p className="mb-10 text-sm text-zinc-500">
          Última atualização: maio de 2026
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
