import Link from "next/link";

const colunas = [
  {
    titulo: "Produto",
    links: [
      { label: "Recursos", href: "#funcionalidades", externo: false },
      { label: "Preços", href: "#planos", externo: false },
      { label: "FAQ", href: "#faq", externo: false },
    ],
  },
  {
    titulo: "Empresa",
    links: [
      { label: "Sobre nós", href: "/sobre", externo: false },
      { label: "Blog", href: "/blog", externo: false },
      { label: "Contato", href: "/contato", externo: false },
    ],
  },
  {
    titulo: "Legal",
    links: [
      { label: "Política de Privacidade", href: "/privacidade", externo: false },
      { label: "Termos de Uso", href: "/termos", externo: false },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Grid principal */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo + tagline */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-indigo-400"
            >
              GetDashia
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
              Atribuição multi-canal para gestores de tráfego e agências de
              marketing digital.
            </p>
          </div>

          {/* Colunas de links */}
          {colunas.map((coluna) => (
            <div key={coluna.titulo}>
              <p className="mb-4 text-sm font-semibold text-zinc-300">
                {coluna.titulo}
              </p>
              <ul className="space-y-3">
                {coluna.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Barra de copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-600">
            © 2026 GetDashia. Todos os direitos reservados.
          </p>
          <p className="text-sm text-zinc-600">Feito no Brasil 🇧🇷</p>
        </div>
      </div>
    </footer>
  );
}
