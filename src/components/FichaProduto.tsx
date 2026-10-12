"use client";

import { useEffect, useRef, useState } from "react";
import { CONFIG } from "@/lib/config";
import { brl, desconto, mensagemConsulta, parcela, precoPix, produtoPorId, waUrl } from "@/lib/loja";
import { CORES, CUIDADOS, type CorId } from "@/lib/produtos";
import { FotoProduto } from "./FotoProduto";
import { useLoja } from "./LojaProvider";

/** Ficha da peça em <dialog>: folha que sobe no celular, janela no desktop. */
export function FichaProduto() {
  const { produtoAberto, fecharProduto, adicionar, abrirSacola, toast } = useLoja();
  const dlg = useRef<HTMLDialogElement>(null);
  const p = produtoAberto ? produtoPorId(produtoAberto.id) : undefined;

  const [cor, setCor] = useState<CorId>("preto");
  const [tamanho, setTamanho] = useState<string | null>(null);
  const [tamanhoCalcinha, setTamanhoCalcinha] = useState<string | null>(null);
  const [qtd, setQtd] = useState(1);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (p && !d.open) {
      setCor(produtoAberto?.cor && p.cores.includes(produtoAberto.cor) ? produtoAberto.cor : p.cores[0]);
      setTamanho(null); setTamanhoCalcinha(null); setQtd(1); setErro("");
      d.showModal();
    } else if (!p && d.open) {
      d.close();
    }
  }, [p, produtoAberto]);

  const adicionarSacola = () => {
    if (!p) return;
    if (!tamanho || (p.tamanhosCalcinha && !tamanhoCalcinha)) {
      setErro(p.tamanhosCalcinha ? "Escolha o tamanho do sutiã e o da calcinha." : "Escolha um tamanho.");
      return;
    }
    adicionar({ id: p.id, cor, tamanho, tamanhoCalcinha: tamanhoCalcinha ?? undefined, qtd });
    toast(`${p.nome} na sacola`);
    fecharProduto();
    abrirSacola();
  };

  const pedirWhats = () => {
    if (!p) return;
    if (!tamanho) { setErro("Escolha um tamanho."); return; }
    window.open(waUrl(mensagemConsulta(p, cor, tamanho, qtd)), "_blank", "noopener");
  };

  const irProvador = () => {
    fecharProduto();
    setTimeout(() => document.getElementById("provador")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <dialog
      ref={dlg}
      className="folha centro bg-papel"
      aria-labelledby="ficha-nome"
      onClose={fecharProduto}
      onClick={(e) => e.target === dlg.current && fecharProduto()}
    >
      {p && (
        <div className="grid min-h-0 overflow-y-auto md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="relative bg-papel-2 p-6 md:p-10">
            <div className="arco relative mx-auto aspect-[3/4] w-full max-w-[400px] overflow-hidden bg-papel">
              <FotoProduto p={p} cor={cor} sizes="(min-width: 860px) 400px, 90vw" rotulo={`${p.nome} em ${CORES[cor].nome}, frente e costas`} />
            </div>
            {p.foto ? (
              p.post && (
                <a href={`${CONFIG.instagram}p/${p.post}/`} target="_blank" rel="noopener noreferrer" className="mt-3 block text-center text-xs text-tinta-2 underline underline-offset-4">
                  Ver o post no Instagram ↗
                </a>
              )
            ) : (
              <p className="mt-3 text-center font-mono text-[.68rem] tracking-[.1em] text-tinta-2 uppercase">Ilustração · foto em breve</p>
            )}
          </div>

          <div className="grid content-start gap-5 p-6 pb-[calc(24px+env(safe-area-inset-bottom,0px))] md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="rotulo">{p.ref ? `REF ${p.ref} · ` : ""}{p.tecido}</p>
                <h2 id="ficha-nome" className="mt-2 text-[clamp(1.8rem,3.4vw,2.4rem)]">{p.nome}</h2>
              </div>
              <button type="button" autoFocus onClick={fecharProduto} aria-label="Fechar" className="h-11 w-11 flex-none cursor-pointer rounded-full border border-linha text-xl leading-none">×</button>
            </div>

            {p.preco ? (
              <div>
                <p className="text-2xl">
                  {p.precoDe && <s className="mr-2 text-base text-tinta-2">{brl(p.precoDe)}</s>}
                  <b className="font-semibold">{brl(p.preco)}</b>
                  {desconto(p) > 0 && <span className="ml-2 rounded-full bg-pimenta px-2 py-0.5 align-middle font-mono text-xs text-sobre-pimenta">−{desconto(p)}%</span>}
                </p>
                <p className="mt-1 text-sm text-tinta-2">
                  <b className="font-semibold text-pimenta">{brl(precoPix(p.preco))} no Pix</b> ou {parcela(p.preco)}
                </p>
              </div>
            ) : (
              <p className="text-lg">Preço sob consulta <span className="block text-sm text-tinta-2">Escolha cor e tamanho e peça o valor pelo WhatsApp.</span></p>
            )}

            <p className="text-tinta-2">{p.descricao}</p>

            <fieldset>
              <legend className="mb-2 text-sm">Cor: <b className="font-semibold">{CORES[cor].nome}</b>{p.outrasCores && <span className="text-tinta-2"> · outras cores sob consulta</span>}</legend>
              <div className="flex gap-2">
                {p.cores.map((c) => (
                  <label key={c} className="relative cursor-pointer" title={CORES[c].nome}>
                    <input type="radio" name="ficha-cor" checked={cor === c} onChange={() => setCor(c)} className="peer sr-only" />
                    <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-transparent peer-checked:border-tinta peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pimenta">
                      <span className="swatch h-7! w-7!" style={{ background: CORES[c].hex }} />
                    </span>
                    <span className="sr-only">{CORES[c].nome}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <Grade titulo={p.tamanhosCalcinha ? "Tamanho do sutiã" : "Tamanho"} nome="ficha-tam" opcoes={p.tamanhos} valor={tamanho} onChange={(t) => { setTamanho(t); setErro(""); }} />
            {p.tamanhosCalcinha && (
              <Grade titulo="Tamanho da calcinha" nome="ficha-tam-calcinha" opcoes={p.tamanhosCalcinha} valor={tamanhoCalcinha} onChange={(t) => { setTamanhoCalcinha(t); setErro(""); }} />
            )}
            <button type="button" onClick={irProvador} className="-mt-2 w-fit cursor-pointer text-sm text-pimenta underline underline-offset-4">
              Não sabe seu tamanho? Use o provador de medidas
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-linha" role="group" aria-label="Quantidade">
                <button type="button" onClick={() => setQtd((q) => Math.max(1, q - 1))} aria-label="Diminuir quantidade" className="h-12 w-11 cursor-pointer text-lg">−</button>
                <span className="w-6 text-center font-mono" aria-live="polite">{qtd}</span>
                <button type="button" onClick={() => setQtd((q) => Math.min(10, q + 1))} aria-label="Aumentar quantidade" className="h-12 w-11 cursor-pointer text-lg">+</button>
              </div>
              {p.preco ? (
                <button type="button" className="btn flex-1" onClick={adicionarSacola}>Adicionar à sacola · {brl(p.preco * qtd)}</button>
              ) : (
                <button type="button" className="btn flex-1" onClick={pedirWhats}>Pedir pelo WhatsApp</button>
              )}
            </div>
            {erro && <p role="alert" className="-mt-2 text-sm font-medium text-pimenta">{erro}</p>}

            <details className="border-t border-linha pt-4 text-sm">
              <summary className="cursor-pointer font-semibold">Composição e cuidados</summary>
              <p className="mt-2 text-tinta-2">{p.tecido}. {CUIDADOS}</p>
            </details>
          </div>
        </div>
      )}
    </dialog>
  );
}

function Grade({ titulo, nome, opcoes, valor, onChange }: {
  titulo: string; nome: string; opcoes: string[]; valor: string | null; onChange: (t: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm">{titulo}</legend>
      <div className="flex flex-wrap gap-2">
        {opcoes.map((t) => (
          <label key={t} className="relative">
            <input type="radio" name={nome} checked={valor === t} onChange={() => onChange(t)} className="peer absolute inset-0 m-0 cursor-pointer opacity-0" />
            <span className="grid h-11 min-w-12 place-items-center rounded-full border border-linha px-3 font-mono text-sm peer-checked:border-tinta peer-checked:bg-tinta peer-checked:text-papel peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pimenta">
              {t}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
