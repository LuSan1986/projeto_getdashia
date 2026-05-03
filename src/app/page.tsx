import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Problema from "@/components/landing/problema";
import ComoFunciona from "@/components/landing/como-funciona";
import Funcionalidades from "@/components/landing/funcionalidades";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problema />
        <ComoFunciona />
        <Funcionalidades />
      </main>
    </>
  );
}
