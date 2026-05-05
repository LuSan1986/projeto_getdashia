import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-indigo-400"
        >
          GetDashia
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#funcionalidades"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Recursos
          </a>
          <a
            href="#planos"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Preços
          </a>
          <a
            href="#faq"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-md border border-indigo-500 bg-transparent px-4 py-2 text-sm font-medium text-indigo-400 transition-colors hover:bg-indigo-600 hover:text-white"
          >
            Entrar
          </Link>
          <Button asChild>
            <a href="#waitlist">Garantir meu lugar</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
