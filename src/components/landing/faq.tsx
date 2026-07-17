'use client'

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
  const [aberto, setAberto] = useState<string | null>(null);

  return (
    <section
      id="faq"
      className="relative scroll-mt-16 px-4 py-24 overflow-hidden"
      style={{ background: "#050B18" }}
    >
      {/* PCB traces */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 1440 600"
             preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 100 H 300 V 60 H 600"
                stroke="rgba(6,182,212,0.06)" strokeWidth="1" fill="none"/>
          <circle cx="300" cy="100" r="2" fill="rgba(6,182,212,0.12)"/>
          <circle cx="300" cy="60"  r="2" fill="rgba(6,182,212,0.12)"/>

          <path d="M 1440 500 H 1100 V 540 H 800"
                stroke="rgba(168,85,247,0.06)" strokeWidth="1" fill="none"/>
          <circle cx="1100" cy="500" r="2" fill="rgba(168,85,247,0.12)"/>
          <circle cx="1100" cy="540" r="2" fill="rgba(168,85,247,0.12)"/>

          <path d="M 80 0 V 200 H 40 V 400 H 80"
                stroke="rgba(232,121,249,0.05)" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)", zIndex: 0 }}/>

      <div className="relative z-10 mx-auto max-w-2xl">

        {/* Título */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#E2E8F0" }}>
            Perguntas{" "}
            <span style={{
              background: "linear-gradient(90deg, #06B6D4 0%, #E879F9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              frequentes
            </span>
          </h2>
          <div className="mx-auto mt-4 h-px w-40" style={{
            background: "linear-gradient(90deg, transparent 0%, #06B6D4 30%, #E879F9 70%, transparent 100%)",
          }}/>
          <p className="mt-5 text-lg" style={{ color: "#94A3B8" }}>
            O que todo gestor pergunta antes de testar.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {perguntas.map(({ valor, pergunta, resposta }) => {
            const isOpen = aberto === valor;
            return (
              <div
                key={valor}
                style={{
                  background: isOpen ? "rgba(6,182,212,0.05)" : "rgba(10,15,40,0.70)",
                  border: `1px solid ${isOpen ? "rgba(6,182,212,0.50)" : "rgba(6,182,212,0.15)"}`,
                  borderRadius: "14px",
                  backdropFilter: "blur(10px)",
                  boxShadow: isOpen ? "0 0 24px rgba(6,182,212,0.10)" : "none",
                  transition: "all 0.3s ease",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setAberto(isOpen ? null : valor)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-sm sm:text-base"
                        style={{ color: isOpen ? "#06B6D4" : "#E2E8F0" }}>
                    {pergunta}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      color: "#06B6D4",
                      flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </button>

                <div style={{
                  maxHeight: isOpen ? "300px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}>
                  <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                    {resposta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
