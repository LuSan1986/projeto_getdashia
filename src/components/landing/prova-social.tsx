import { Badge } from "@/components/ui/badge";

const plataformas = [
  "Google Ads",
  "Meta Ads",
  "Google Analytics",
  "Shopify",
  "Hotmart",
  "Kiwify",
];

export default function ProvaSocial() {
  return (
    <section className="bg-zinc-950 px-4 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
          Funciona com as ferramentas que você já usa
        </h2>
        <p className="mt-3 text-lg text-zinc-400">
          Conexão via API oficial. Seus dados sempre atualizados.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {plataformas.map((nome) => (
            <Badge
              key={nome}
              variant="outline"
              className="h-auto rounded-full border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300"
            >
              {nome}
            </Badge>
          ))}
        </div>

        <p className="mt-6 text-sm text-zinc-600">
          Mais integrações chegando em breve.
        </p>
      </div>
    </section>
  );
}
