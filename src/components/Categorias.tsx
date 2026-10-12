"use client";

import { CATALOGO, CATEGORIAS, CORES, type CategoriaId } from "@/lib/produtos";
import { Ilustracao } from "./Ilustracao";
import { useLoja } from "./LojaProvider";

export function Categorias() {
  const { escolherCategoria } = useLoja();
  const ir = (c: CategoriaId) => {
    escolherCategoria(c);
    document.getElementById("colecao")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const cats = (Object.keys(CATEGORIAS) as CategoriaId[]).filter((c) => CATALOGO.some((p) => p.categoria === c));
  if (cats.length < 2) return null;

  return (
    <section aria-label="Categorias" className="bg-papel-2 py-10">
      <div className="wrap">
        <ul className="sem-barra -mx-[clamp(16px,4vw,40px)] flex snap-x gap-3 overflow-x-auto px-[clamp(16px,4vw,40px)] md:mx-0 md:grid md:grid-cols-5 md:px-0">
          {cats.map((id) => [id, CATEGORIAS[id]] as const).map(([id, c]) => (
            <li key={id} className="w-[38%] flex-none snap-start sm:w-[26%] md:w-auto">
              <button type="button" onClick={() => ir(id)} className="group grid w-full cursor-pointer justify-items-center gap-2 text-center">
                <span className="arco grid aspect-[4/5] w-full place-items-center bg-papel p-3 transition-colors group-hover:bg-rosa/60">
                  <Ilustracao modelo={c.modelo} cor={CORES[c.cor].hex} acabamento="renda" className="h-full w-full transition-transform duration-500 group-hover:-translate-y-1" />
                </span>
                <span className="text-sm font-semibold">{c.nome}</span>
                <span className="-mt-2 font-mono text-[.7rem] text-tinta-2">{CATALOGO.filter((p) => p.categoria === id).length} peças</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
