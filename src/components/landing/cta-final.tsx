import { Button } from "@/components/ui/button";

export default function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-zinc-900 px-4 py-24 text-center">
      {/* Glow mais intenso que o Hero — sinaliza fechamento de ciclo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }}
      />

      <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
        Seu trabalho é gerar resultado,{" "}
        <span className="text-indigo-400">não montar relatório no Slides.</span>
      </h2>

      <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
        Garanta acesso antecipado ao GetDashia e seja um dos primeiros a testar
        antes do lançamento oficial.
      </p>

      <div className="mt-10">
        <Button asChild size="lg" className="h-12 px-8 text-base">
          <a href="#waitlist">Garantir meu lugar →</a>
        </Button>
      </div>
    </section>
  );
}
