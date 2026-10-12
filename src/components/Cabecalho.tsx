"use client";

import { useState } from "react";
import { CONFIG } from "@/lib/config";
import { brl } from "@/lib/loja";
import { useLoja } from "./LojaProvider";
import { Marca } from "./Marca";

const LINKS = [
  ["#colecao", "Coleção"],
  ["#provador", "Provador de medidas"],
  ["#duvidas", "Dúvidas"],
] as const;

export function Cabecalho() {
  const { qtdItens, abrirSacola } = useLoja();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      <p className="bg-pimenta px-4 py-2 text-center text-[.68rem] font-semibold tracking-[.14em] text-sobre-pimenta uppercase">
        Envio discreto para todo o Brasil · Frete grátis acima de {brl(CONFIG.freteGratisAcima)} · {Math.round(CONFIG.descontoPix * 100)}% off no Pix
      </p>
      <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 border-b border-linha bg-papel/90 backdrop-blur-md">
        <div className="wrap relative flex min-h-16 items-center gap-6">
          <a href="#inicio" className="mr-auto py-1.5 no-underline" aria-label="Pimenta Doce, moda íntima, início">
            <Marca />
          </a>

          <nav
            id="nav"
            aria-label="Principal"
            className={`${menuAberto ? "grid" : "hidden"} absolute inset-x-0 top-full border-b border-linha bg-papel px-4 pt-2 pb-4 md:static md:flex md:gap-7 md:border-0 md:bg-transparent md:p-0`}
            onClick={(e) => (e.target as HTMLElement).closest("a") && setMenuAberto(false)}
          >
            {LINKS.map(([href, txt]) => (
              <a key={href} href={href} className="border-b border-linha py-3.5 text-base no-underline decoration-pimenta decoration-2 underline-offset-8 hover:underline md:border-0 md:py-1 md:text-sm">
                {txt}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={abrirSacola}
            aria-label={`Abrir sacola, ${qtdItens} ${qtdItens === 1 ? "item" : "itens"}`}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-linha px-4 text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span className="hidden sm:inline">Sacola</span>
            <span key={qtdItens} className="inline-grid h-[22px] min-w-[22px] animate-[pulo_.45s] place-items-center rounded-full bg-pimenta px-1.5 font-mono text-[.72rem] font-medium text-sobre-pimenta">
              {qtdItens}
            </span>
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-linha px-4 text-sm md:hidden"
            aria-expanded={menuAberto}
            aria-controls="nav"
            onClick={() => setMenuAberto((v) => !v)}
          >
            Menu
          </button>
        </div>
      </header>
    </>
  );
}
