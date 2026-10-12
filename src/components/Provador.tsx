"use client";

import { useState } from "react";
import { faixa, waUrl } from "@/lib/loja";
import { CATALOGO, TABELA_BOJO, TABELA_CALCINHA, TABELA_NOITE, TABELA_SUTIA, type CategoriaId } from "@/lib/produtos";
import { Titulo } from "./Titulo";

const tem = (...c: CategoriaId[]) => CATALOGO.some((p) => c.includes(p.categoria));
const USA_BUSTO = tem("sutias", "conjuntos", "bodies", "noite");
const USA_QUADRIL = tem("calcinhas", "conjuntos");

const TODAS_MEDIDAS = [
  { id: "busto", nome: "Busto", dica: "Na parte mais cheia dos seios, fita reta nas costas.", min: 70, max: 120 },
  { id: "sob", nome: "Sob o busto", dica: "Logo abaixo dos seios, onde fica o elástico do sutiã.", min: 60, max: 110 },
  { id: "quadril", nome: "Quadril", dica: "Na parte mais larga do bumbum, pés juntos.", min: 80, max: 130 },
] as const;

type Id = (typeof TODAS_MEDIDAS)[number]["id"];
const MEDIDAS = TODAS_MEDIDAS.filter((m) => (m.id === "quadril" ? USA_QUADRIL : USA_BUSTO));

export function Provador() {
  const [m, setM] = useState<Record<Id, number>>({ busto: 90, sob: 76, quadril: 98 });

  const sutia = faixa(TABELA_SUTIA, m.busto);
  const bojo = faixa(TABELA_BOJO, m.busto - m.sob);
  const calcinha = faixa(TABELA_CALCINHA, m.quadril);
  const noite = faixa(TABELA_NOITE, m.busto);
  const foraDaTabela = [USA_BUSTO && !sutia.exato, USA_QUADRIL && !calcinha.exato].some(Boolean);

  const resultados = [
    { nome: "Sutiã", valor: sutia.tamanho, extra: `bojo ${bojo.tamanho}`, mostra: tem("sutias", "conjuntos") },
    { nome: "Calcinha", valor: calcinha.tamanho, mostra: USA_QUADRIL },
    { nome: "Top e body", valor: noite.tamanho, mostra: tem("bodies") },
    { nome: "Pijama e camisola", valor: noite.tamanho, mostra: tem("noite") },
  ].filter((r) => r.mostra);

  return (
    <section id="provador" className="secao bg-papel-2">
      <div className="wrap grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Titulo rotulo="Provador de medidas" titulo={MEDIDAS.length === 1 ? <>Seu tamanho em <em>uma medida</em></> : <>Seu tamanho em <em>{MEDIDAS.length === 2 ? "duas" : "três"} medidas</em></>} className="mb-8">
            Com uma fita métrica, sem apertar. Os valores abaixo são de exemplo: troque pelos seus.
          </Titulo>
          <div className="grid gap-6">
            {MEDIDAS.map((x) => (
              <div key={x.id} className="grid gap-2">
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={`m-${x.id}`} className="font-semibold">{x.nome}</label>
                  <span className="flex items-baseline gap-1">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={x.min}
                      max={x.max}
                      value={m[x.id]}
                      onChange={(e) => setM((v) => ({ ...v, [x.id]: Number(e.target.value) || 0 }))}
                      aria-label={`${x.nome} em centímetros`}
                      className="w-20 rounded-full border border-linha bg-papel-3 px-3 py-1.5 text-right font-mono"
                    />
                    <span className="font-mono text-sm text-tinta-2">cm</span>
                  </span>
                </div>
                <input
                  id={`m-${x.id}`}
                  type="range"
                  min={x.min}
                  max={x.max}
                  value={m[x.id]}
                  onChange={(e) => setM((v) => ({ ...v, [x.id]: Number(e.target.value) }))}
                  className="w-full accent-[var(--pimenta)]"
                />
                <p className="text-sm text-tinta-2">{x.dica}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="renda-pe rounded-t-[28px] bg-papel-3 p-6 pb-10 shadow-suave sm:p-8 sm:pb-12 lg:sticky lg:top-28">
          <p className="rotulo">Seus tamanhos</p>
          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6" aria-live="polite">
            {resultados.map((r) => (
              <div key={r.nome}>
                <dt className="text-sm text-tinta-2">{r.nome}</dt>
                <dd className="mt-1 font-display text-5xl leading-none">
                  {r.valor}
                  {r.extra && <span className="ml-2 font-mono text-sm text-pimenta">{r.extra}</span>}
                </dd>
              </div>
            ))}
          </dl>
          {foraDaTabela && (
            <p className="mt-6 rounded-2xl bg-papel-2 p-4 text-sm">
              Alguma medida ficou fora da nossa tabela.{" "}
              <a className="text-pimenta underline underline-offset-4" href={waUrl(`Olá! Minhas medidas: busto ${m.busto} cm, sob o busto ${m.sob} cm, quadril ${m.quadril} cm. Qual tamanho vocês indicam?`)} target="_blank" rel="noopener noreferrer">
                Mande suas medidas no WhatsApp
              </a>{" "}
              e indicamos o modelo certo.
            </p>
          )}
          <p className="mt-6 text-xs text-tinta-2">Referência geral. Entre dois tamanhos, prefira o maior em peças de renda rígida e o menor em microfibra e tule.</p>
          <a href="#colecao" className="btn mt-6 w-full">Ver peças</a>

          <details className="mt-6 text-sm">
            <summary className="cursor-pointer font-semibold">Tabela de medidas</summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse font-mono text-xs tabular-nums">
                <thead>
                  <tr className="text-left text-tinta-2"><th className="py-1.5 pr-3 font-normal">Tamanho</th><th className="py-1.5 pr-3 font-normal">Medida (cm)</th></tr>
                </thead>
                <tbody>
                  {USA_BUSTO && TABELA_SUTIA.map(([t, a, b]) => <tr key={t} className="border-t border-linha"><td className="py-1.5 pr-3">Sutiã {t}</td><td>busto {a}–{b}</td></tr>)}
                  {TABELA_CALCINHA.map(([t, a, b]) => <tr key={t} className="border-t border-linha"><td className="py-1.5 pr-3">Calcinha {t}</td><td>quadril {a}–{b}</td></tr>)}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
