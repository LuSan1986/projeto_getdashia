import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Problema from "@/components/landing/problema";
import ComoFunciona from "@/components/landing/como-funciona";
import Funcionalidades from "@/components/landing/funcionalidades";
import ProvaSocial from "@/components/landing/prova-social";
import Planos from "@/components/landing/planos";
import FAQ from "@/components/landing/faq";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problema />
        <ComoFunciona />
        <Funcionalidades />
        <ProvaSocial />
        <Planos />
        <FAQ />
      </main>
    </>
  );
}
