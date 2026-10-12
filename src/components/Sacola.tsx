"use client";

import { useEffect, useRef, useState } from "react";
import { CONFIG } from "@/lib/config";
import { brl, mensagemPedido, produtoPorId, tamanhoTexto, totais, waUrl } from "@/lib/loja";
import { CORES } from "@/lib/produtos";
import { FotoProduto } from "./FotoProduto";
import { useLoja } from "./LojaProvider";

type Erros = Partial<Record<"nome" | "tel" | "cep" | "endereco", string>>;

const mascaraCep = (v: string) => { const d = v.replace(/\D/g, "").slice(0, 8); return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d; };
const mascaraTel = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length > 7) return `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
  return d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : d;
};

/** Gaveta da sacola: revisão, pagamento, entrega e envio do pedido pelo WhatsApp (ainda sem servidor). */
export function Sacola() {
  const { sacola, alterarQtd, remover, esvaziar, sacolaAberta, fecharSacola } = useLoja();
  const dlg = useRef<HTMLDialogElement>(null);
  const [pagamento, setPagamento] = useState<"pix" | "cartao">("pix");
  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [enviado, setEnviado] = useState<{ codigo: string; url: string } | null>(null);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (sacolaAberta && !d.open) { setEnviado(null); d.showModal(); }
    else if (!sacolaAberta && d.open) d.close();
  }, [sacolaAberta]);

  const t = totais(sacola, pagamento === "pix");

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const novos: Erros = {};
    if (nome.trim().length < 2) novos.nome = "Como podemos chamar você?";
    if (tel.replace(/\D/g, "").length < 10) novos.tel = "Digite o WhatsApp com DDD.";
    if (cep.replace(/\D/g, "").length !== 8) novos.cep = "Digite os 8 números do CEP.";
    if (endereco.trim().length < 5) novos.endereco = "Informe rua, número e complemento.";
    setErros(novos);
    const primeiro = Object.keys(novos)[0];
    if (primeiro) { document.getElementById(`sac-${primeiro}`)?.focus(); return; }

    const codigo = "PD-" + (1000 + Math.floor(Math.random() * 9000));
    const url = waUrl(mensagemPedido(sacola, { codigo, nome: nome.trim(), cep, endereco: endereco.trim(), pagamento }));
    window.open(url, "_blank", "noopener");
    setEnviado({ codigo, url });
    esvaziar();
  };

  const campo = (erro?: string, mono = false) =>
    `min-h-12 w-full rounded-xl border bg-papel-3 px-3.5 text-base focus:outline-2 focus:outline-offset-1 focus:outline-pimenta ${mono ? "font-mono" : ""} ${erro ? "border-pimenta" : "border-contorno"}`;

  return (
    <dialog ref={dlg} className="folha lateral bg-papel" aria-labelledby="sac-titulo" onClose={fecharSacola} onClick={(e) => e.target === dlg.current && fecharSacola()}>
      <div className="flex items-center justify-between gap-3 border-b border-linha px-5 pt-[calc(18px+env(safe-area-inset-top,0px))] pb-4">
        <h2 id="sac-titulo" className="text-[1.8rem]">Sacola</h2>
        <button type="button" onClick={fecharSacola} aria-label="Fechar" className="h-11 w-11 cursor-pointer rounded-full border border-linha text-xl leading-none">×</button>
      </div>

      {enviado ? (
        <div className="grid flex-1 place-content-center justify-items-center gap-4 px-6 text-center">
          <p className="rotulo">Pedido enviado</p>
          <p className="rounded-full border-[1.5px] border-dashed border-pimenta px-6 py-3 font-mono text-3xl">{enviado.codigo}</p>
          <p className="max-w-[34ch] text-tinta-2">Abrimos o WhatsApp com o resumo do pedido. Envie a mensagem para receber a chave Pix ou o link do cartão e o prazo de entrega.</p>
          <a className="btn" href={enviado.url} target="_blank" rel="noopener noreferrer">Abrir o WhatsApp de novo</a>
          <button type="button" className="btn btn-linha" onClick={fecharSacola}>Continuar comprando</button>
        </div>
      ) : !sacola.length ? (
        <div className="grid flex-1 place-content-center justify-items-center gap-4 px-6 text-center">
          <p className="font-display text-3xl">Sua sacola está vazia</p>
          <p className="text-tinta-2">Escolha uma peça na coleção.</p>
          <a className="btn" href="#colecao" onClick={fecharSacola}>Ver coleção</a>
        </div>
      ) : (
        <form noValidate onSubmit={enviar} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6">
            <p className="mt-4 rounded-full bg-papel-2 px-4 py-2.5 text-center text-sm">
              {t.faltaFreteGratis > 0 ? <>Faltam <b>{brl(t.faltaFreteGratis)}</b> para o frete grátis</> : <b className="text-ok">Você ganhou frete grátis</b>}
            </p>

            <ul className="mt-2">
              {sacola.map((i) => {
                const p = produtoPorId(i.id);
                if (!p) return null;
                return (
                  <li key={i.chave} className="grid grid-cols-[64px_minmax(0,1fr)_auto] gap-3 border-b border-linha py-4">
                    <span className="arco relative aspect-[3/4] overflow-hidden bg-papel-2">
                      <FotoProduto p={p} cor={i.cor} sizes="64px" rotulo="" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold leading-snug">{p.nome}</p>
                      <p className="text-xs text-tinta-2">{CORES[i.cor].nome} · {tamanhoTexto(i)}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="flex items-center rounded-full border border-linha">
                          <button type="button" onClick={() => alterarQtd(i.chave, -1)} aria-label={`Diminuir ${p.nome}`} className="h-9 w-9 cursor-pointer">−</button>
                          <span className="w-5 text-center font-mono text-sm">{i.qtd}</span>
                          <button type="button" onClick={() => alterarQtd(i.chave, 1)} aria-label={`Aumentar ${p.nome}`} className="h-9 w-9 cursor-pointer">+</button>
                        </span>
                        <button type="button" onClick={() => remover(i.chave)} className="cursor-pointer text-xs text-tinta-2 underline underline-offset-2 hover:text-pimenta">remover</button>
                      </div>
                    </div>
                    <span className="font-mono text-sm tabular-nums">{p.preco ? brl(p.preco * i.qtd) : "a confirmar"}</span>
                  </li>
                );
              })}
            </ul>

            <fieldset className="mt-6">
              <legend className="rotulo mb-3">Pagamento</legend>
              <div className="grid grid-cols-2 gap-2">
                {([["pix", "Pix", `${Math.round(CONFIG.descontoPix * 100)}% de desconto`], ["cartao", "Cartão", `até ${CONFIG.parcelasSemJuros}x sem juros`]] as const).map(([v, n, s]) => (
                  <label key={v} className="relative">
                    <input type="radio" name="pagamento" checked={pagamento === v} onChange={() => setPagamento(v)} className="peer absolute inset-0 m-0 cursor-pointer opacity-0" />
                    <span className="grid gap-0.5 rounded-xl border border-linha bg-papel-3 p-3.5 text-sm peer-checked:border-pimenta peer-checked:shadow-[inset_0_0_0_1px_var(--pimenta)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pimenta">
                      <b className="font-semibold">{n}</b><small className="text-xs text-tinta-2">{s}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6 grid gap-3">
              <legend className="rotulo mb-3">Entrega</legend>
              {([
                ["nome", "Nome", nome, (v: string) => setNome(v), "name", false],
                ["tel", "WhatsApp", tel, (v: string) => setTel(mascaraTel(v)), "tel", true],
                ["cep", "CEP", cep, (v: string) => setCep(mascaraCep(v)), "postal-code", true],
                ["endereco", "Endereço com número e complemento", endereco, (v: string) => setEndereco(v), "street-address", false],
              ] as const).map(([id, rotulo, valor, set, auto, mono]) => (
                <div key={id} className="grid gap-1.5">
                  <label htmlFor={`sac-${id}`} className="text-sm font-medium">{rotulo}</label>
                  <input
                    id={`sac-${id}`}
                    value={valor}
                    onChange={(e) => set(e.target.value)}
                    autoComplete={auto}
                    inputMode={id === "tel" ? "tel" : id === "cep" ? "numeric" : undefined}
                    aria-invalid={!!erros[id]}
                    className={campo(erros[id], mono)}
                  />
                  {erros[id] && <span className="text-xs font-medium text-pimenta">{erros[id]}</span>}
                </div>
              ))}
            </fieldset>
          </div>

          <div className="grid gap-2 border-t border-linha bg-papel-3 px-5 pt-4 pb-[calc(16px+env(safe-area-inset-bottom,0px))] text-sm">
            <dl className="grid gap-1 tabular-nums">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{brl(t.subtotal)}</dd></div>
              {t.descontoPix > 0 && <div className="flex justify-between text-pimenta"><dt>Desconto Pix</dt><dd>−{brl(t.descontoPix)}</dd></div>}
              <div className="flex justify-between"><dt>Frete</dt><dd>{t.frete ? brl(t.frete) : "grátis"}</dd></div>
              <div className="mt-1 flex items-baseline justify-between"><dt className="font-semibold">Total</dt><dd className="font-display text-3xl">{brl(t.total)}</dd></div>
            </dl>
            <button className="btn mt-1" type="submit">Enviar pedido pelo WhatsApp</button>
          </div>
        </form>
      )}
    </dialog>
  );
}
