import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const perguntas = [
  {
    valor: "q1",
    pergunta: "Preciso saber programar para usar o GetDashia?",
    resposta:
      "Não. O GetDashia foi feito para gestores de tráfego, não para desenvolvedores. A conexão com Google Ads, Meta Ads e e-commerce é feita em poucos cliques, sem instalar nada ou mexer em código.",
  },
  {
    valor: "q2",
    pergunta: "Funciona com múltiplos clientes?",
    resposta:
      "Sim. Nos planos Pro e Agência você gerencia vários clientes em painéis completamente isolados — cada um com suas próprias contas e usuários. Nenhum dado de um cliente aparece para outro.",
  },
  {
    valor: "q3",
    pergunta: "Tem período de teste gratuito?",
    resposta:
      "O produto está em fase beta. Ao garantir seu lugar na lista de espera, você terá acesso antecipado com condições especiais antes do lançamento oficial. Os detalhes chegam por e-mail quando o acesso abrir.",
  },
  {
    valor: "q4",
    pergunta: "Posso cancelar a qualquer momento?",
    resposta:
      "Sim. Não há contrato de fidelidade nem multa. Você pode cancelar a assinatura quando quiser, direto pelo painel, sem burocracia.",
  },
  {
    valor: "q5",
    pergunta: "Funciona com Hotmart e Kiwify?",
    resposta:
      "A integração com Hotmart e Kiwify está no roadmap e será entregue ainda em 2026. O MVP inicial foca em Google Ads, Meta Ads e Google Analytics. Infoprodutores podem garantir lugar na lista de espera para acesso antecipado.",
  },
  {
    valor: "q6",
    pergunta: "O que é atribuição multi-touch e por que importa?",
    resposta:
      'É a capacidade de identificar todos os canais que contribuíram para uma venda — não só o último clique. Isso impede que Google Ads e Meta Ads "roubem" o crédito da mesma venda entre si, dando a você uma visão real do que está funcionando.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-16 bg-zinc-950 px-4 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Perguntas{" "}
            <span className="text-indigo-400">frequentes</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            O que todo gestor pergunta antes de testar.
          </p>
        </div>

        <Accordion type="single" collapsible>
          {perguntas.map(({ valor, pergunta, resposta }) => (
            <AccordionItem
              key={valor}
              value={valor}
              className="border-zinc-800"
            >
              <AccordionTrigger className="text-left text-zinc-100 hover:text-zinc-50 hover:no-underline">
                {pergunta}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400">
                {resposta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
