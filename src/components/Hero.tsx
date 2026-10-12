"use client";

import { CATALOGO } from "@/lib/produtos";
import { CANAL } from "@/lib/loja";
import { FotoProduto } from "./FotoProduto";
import { useLoja } from "./LojaProvider";

export function Hero() {
  const { abrirProduto } = useLoja();
  // Vitrine: as duas primeiras peças com foto (ou do catálogo, se ainda não houver fotos)
  const comFoto = CATALOGO.filter((p) => p.foto);
  const [grande, pequena] = comFoto.length >= 2 ? comFoto : CATALOGO;

  return (
    <section className="overflow-hidden pt-[clamp(32px,6vw,72px)] pb-[clamp(56px,8vw,96px)]">
      <div className="wrap grid items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
        <div>
          <p className="rotulo">Conforto · Estilo · Autoestima</p>
          <h1 className="mt-5 text-display leading-[.92]">
            Feita para você se{" "}
            <em className="font-script text-[1.2em] leading-none font-normal text-pimenta not-italic">amar</em>{" "}
            ainda mais.
          </h1>
          <p className="mt-6 max-w-[46ch] text-[clamp(1.02rem,1.5vw,1.15rem)] text-tinta-2">
            Calcinhas do P ao GG, macias e sem marcar a roupa. Escolha cor e tamanho aqui, peça pelo {CANAL} e receba em casa, ou passe na nossa loja no Mega Modas Shopping, em Goiânia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn" href="#colecao">Ver coleção</a>
            <a className="btn btn-linha" href="#provador">Descobrir meu tamanho</a>
          </div>
        </div>

        {/* Dois espelhos de provador com as peças da vitrine */}
        <div className="relative mx-auto grid w-full max-w-[460px] grid-cols-[1fr_.72fr] items-end gap-3">
          {[grande, pequena].map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => abrirProduto(p.id, p.cores[0])}
              className={`arco group relative cursor-pointer overflow-hidden bg-papel-2 ${i ? "mb-10 aspect-[3/4.6] animate-[flutua_7s_ease-in-out_infinite]" : "aspect-[3/4.3]"}`}
              aria-label={`Ver ${p.nome}${p.ref ? ` REF ${p.ref}` : ""}`}
            >
              <FotoProduto p={p} cor={p.cores[0]} sizes="(min-width: 768px) 260px, 55vw" prioridade className="transition-transform duration-500 group-hover:scale-[1.04]" />
              {!i && (
                <span className="absolute inset-x-3 bottom-3 rounded-full bg-papel-3/95 px-3 py-2 text-left text-xs shadow-suave">
                  <b className="block font-semibold">{p.nome}</b>
                  <span className="text-tinta-2">{p.ref ? `REF ${p.ref} · ` : ""}P ao GG</span>
                </span>
              )}
            </button>
          ))}
          <span aria-hidden="true" className="absolute -top-4 right-2 rotate-6 font-script text-3xl text-ouro">
            nova coleção
          </span>
        </div>
      </div>
    </section>
  );
}
