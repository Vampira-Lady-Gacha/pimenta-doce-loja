"use client";

import { useState } from "react";
import { brl, desconto, precoPix } from "@/lib/loja";
import { CATALOGO, CATEGORIAS, CORES, type CategoriaId, type CorId, type Produto } from "@/lib/produtos";
import { FotoProduto } from "./FotoProduto";
import { useLoja } from "./LojaProvider";
import { Titulo } from "./Titulo";

type Ordem = "destaques" | "menor" | "maior" | "novidades";
const ORDEM_TAM = ["40", "42", "44", "46", "48", "50", "P", "M", "G", "GG"];
// Filtros só oferecem o que existe no catálogo
const TAMANHOS = ORDEM_TAM.filter((t) => CATALOGO.some((p) => p.tamanhos.includes(t) || p.tamanhosCalcinha?.includes(t)));
const CORES_CATALOGO = (Object.keys(CORES) as CorId[]).filter((c) => CATALOGO.some((p) => p.cores.includes(c)));
const CATS_CATALOGO = (Object.keys(CATEGORIAS) as CategoriaId[]).filter((c) => CATALOGO.some((p) => p.categoria === c));
const preco = (p: Produto) => p.preco ?? Infinity;

export function Colecao() {
  const { categoria, escolherCategoria } = useLoja();
  const [cor, setCor] = useState<CorId | null>(null);
  const [tamanho, setTamanho] = useState<string | null>(null);
  const [ordem, setOrdem] = useState<Ordem>("destaques");

  let lista = CATALOGO.filter(
    (p) =>
      (categoria === "todas" || p.categoria === categoria) &&
      (!cor || p.cores.includes(cor)) &&
      (!tamanho || p.tamanhos.includes(tamanho) || p.tamanhosCalcinha?.includes(tamanho)),
  );
  if (ordem === "menor") lista = [...lista].sort((a, b) => preco(a) - preco(b));
  if (ordem === "maior") lista = [...lista].sort((a, b) => (b.preco ?? -1) - (a.preco ?? -1));
  if (ordem === "novidades") lista = [...lista].sort((a, b) => Number(!!b.novo) - Number(!!a.novo));

  const temFiltro = categoria !== "todas" || cor || tamanho;
  const limpar = () => { escolherCategoria("todas"); setCor(null); setTamanho(null); };

  const chip = (ativo: boolean) =>
    `min-h-10 flex-none cursor-pointer rounded-full border px-4 text-sm whitespace-nowrap transition-colors ${ativo ? "border-tinta bg-tinta text-papel" : "border-linha hover:border-contorno"}`;

  return (
    <section id="colecao" className="secao">
      <div className="wrap">
        <Titulo rotulo="Coleção" titulo={<>Peças para <em>todo dia</em> e para a noite</>}>
          Fotos das nossas peças. Abra a que gostou, escolha cor e tamanho e peça pelo WhatsApp.
        </Titulo>

        <div className="mb-8 grid gap-3">
          <div role="group" aria-label="Categoria" className="sem-barra flex gap-2 overflow-x-auto">
            <button type="button" aria-pressed={categoria === "todas"} className={chip(categoria === "todas")} onClick={() => escolherCategoria("todas")}>Tudo</button>
            {CATS_CATALOGO.length > 1 && CATS_CATALOGO.map((id) => (
              <button key={id} type="button" aria-pressed={categoria === id} className={chip(categoria === id)} onClick={() => escolherCategoria(id)}>{CATEGORIAS[id].nome}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div role="group" aria-label="Cor" className="flex items-center gap-2">
              <span className="font-mono text-[.7rem] tracking-[.12em] text-tinta-2 uppercase">Cor</span>
              {CORES_CATALOGO.map((id) => [id, CORES[id]] as const).map(([id, c]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={cor === id}
                  aria-label={c.nome}
                  title={c.nome}
                  onClick={() => setCor(cor === id ? null : id)}
                  className={`grid h-9 w-9 cursor-pointer place-items-center rounded-full border-2 ${cor === id ? "border-tinta" : "border-transparent"}`}
                >
                  <span className="swatch" style={{ background: c.hex }} />
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <span className="font-mono text-[.7rem] tracking-[.12em] text-tinta-2 uppercase">Tamanho</span>
              <select value={tamanho ?? ""} onChange={(e) => setTamanho(e.target.value || null)} className="min-h-10 rounded-full border border-linha bg-papel-3 px-3">
                <option value="">Todos</option>
                {TAMANHOS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm md:ml-auto">
              <span className="font-mono text-[.7rem] tracking-[.12em] text-tinta-2 uppercase">Ordenar</span>
              <select value={ordem} onChange={(e) => setOrdem(e.target.value as Ordem)} className="min-h-10 rounded-full border border-linha bg-papel-3 px-3">
                <option value="destaques">Destaques</option>
                <option value="novidades">Novidades</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
              </select>
            </label>
          </div>
        </div>

        <p className="mb-4 text-sm text-tinta-2" aria-live="polite">
          {lista.length} {lista.length === 1 ? "peça" : "peças"}
          {temFiltro && <> · <button type="button" onClick={limpar} className="cursor-pointer underline underline-offset-4">limpar filtros</button></>}
        </p>

        {lista.length ? (
          <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
            {lista.map((p, i) => <Cartao key={p.id} p={p} corFiltro={cor} indice={i} />)}
          </ul>
        ) : (
          <div className="arco mx-auto grid max-w-md justify-items-center gap-3 bg-papel-2 px-6 py-12 text-center">
            <p className="font-display text-2xl">Nenhuma peça com esses filtros</p>
            <p className="text-sm text-tinta-2">Tente outra cor ou tamanho.</p>
            <button type="button" className="btn btn-linha" onClick={limpar}>Limpar filtros</button>
          </div>
        )}
      </div>
    </section>
  );
}

function Cartao({ p, corFiltro, indice }: { p: Produto; corFiltro: CorId | null; indice: number }) {
  const { abrirProduto } = useLoja();
  const [cor, setCor] = useState<CorId>(corFiltro && p.cores.includes(corFiltro) ? corFiltro : p.cores[0]);
  const off = desconto(p);

  return (
    <li className="grid min-w-0 animate-[entra_.45s_both] content-start gap-2.5" style={{ animationDelay: `${indice * 35}ms` }}>
      <button
        type="button"
        onClick={() => abrirProduto(p.id, cor)}
        className="arco group relative aspect-[3/4] cursor-pointer overflow-hidden bg-papel-2 transition-colors hover:bg-rosa/50"
        aria-label={`Ver ${p.nome}${p.ref ? ` REF ${p.ref}` : ""} em ${CORES[cor].nome}`}
      >
        <FotoProduto p={p} cor={cor} sizes="(min-width: 1024px) 280px, 48vw" prioridade={indice < 4} className="transition-transform duration-500 group-hover:scale-[1.04]" />
        <span className="absolute top-[18%] left-3 grid gap-1 text-left">
          {p.novo && <span className="rounded-full bg-tinta px-2.5 py-1 font-mono text-[.62rem] tracking-[.1em] text-papel uppercase">novo</span>}
          {off > 0 && <span className="rounded-full bg-pimenta px-2.5 py-1 font-mono text-[.62rem] tracking-[.1em] text-sobre-pimenta">−{off}%</span>}
        </span>
        <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-papel-3 py-2 text-xs font-semibold opacity-0 shadow-suave transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          Escolher tamanho
        </span>
      </button>
      {p.cores.length > 1 && <div className="flex items-center gap-1.5" role="group" aria-label={`Cores de ${p.nome}`}>
        {p.cores.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cor === c}
            aria-label={CORES[c].nome}
            title={CORES[c].nome}
            onClick={() => setCor(c)}
            className={`grid h-7 w-7 cursor-pointer place-items-center rounded-full border-[1.5px] ${cor === c ? "border-tinta" : "border-transparent"}`}
          >
            <span className="swatch h-[18px]! w-[18px]!" style={{ background: CORES[c].hex }} />
          </button>
        ))}
      </div>}
      <h3 className="font-texto text-[.95rem] leading-snug font-medium tracking-normal">
        {p.nome}
        {p.ref && <span className="ml-1.5 font-mono text-[.7rem] text-tinta-2">REF {p.ref}</span>}
      </h3>
      {p.preco ? (
        <p className="-mt-1 text-sm leading-snug">
          {p.precoDe && <s className="mr-1.5 text-tinta-2">{brl(p.precoDe)}</s>}
          <b className="font-semibold">{brl(p.preco)}</b>
          <span className="block font-mono text-[.72rem] text-pimenta">{brl(precoPix(p.preco))} no Pix</span>
        </p>
      ) : (
        <p className="-mt-1 text-sm leading-snug text-tinta-2">
          Preço sob consulta
          <span className="block text-[.72rem]">P, M, G e GG{p.outrasCores ? " · outras cores" : ""}</span>
        </p>
      )}
    </li>
  );
}
