import { LojaProvider } from "@/components/LojaProvider";
import { Cabecalho } from "@/components/Cabecalho";
import { Hero } from "@/components/Hero";
import { Categorias } from "@/components/Categorias";
import { Colecao } from "@/components/Colecao";
import { Provador } from "@/components/Provador";
import { Vantagens } from "@/components/Vantagens";
import { InstagramChamada } from "@/components/InstagramChamada";
import { Duvidas } from "@/components/Duvidas";
import { Rodape } from "@/components/Rodape";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { FichaProduto } from "@/components/FichaProduto";
import { Sacola } from "@/components/Sacola";

export default function Home() {
  return (
    <LojaProvider>
      <Cabecalho />
      <main id="inicio">
        <Hero />
        <Categorias />
        <Colecao />
        <Provador />
        <Vantagens />
        <InstagramChamada />
        <Duvidas />
      </main>
      <Rodape />
      <BotaoWhatsApp />
      <FichaProduto />
      <Sacola />
    </LojaProvider>
  );
}
