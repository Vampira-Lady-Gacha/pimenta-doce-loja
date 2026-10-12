"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { gravar, ler } from "@/lib/armazenamento";
import { chaveItem, type ItemSacola } from "@/lib/loja";
import type { CategoriaId, CorId } from "@/lib/produtos";

type Novo = Omit<ItemSacola, "chave">;

type LojaCtx = {
  sacola: ItemSacola[];
  qtdItens: number;
  adicionar: (item: Novo) => void;
  alterarQtd: (chave: string, delta: number) => void;
  remover: (chave: string) => void;
  esvaziar: () => void;
  produtoAberto: { id: string; cor?: CorId } | null;
  abrirProduto: (id: string, cor?: CorId) => void;
  fecharProduto: () => void;
  sacolaAberta: boolean;
  abrirSacola: () => void;
  fecharSacola: () => void;
  categoria: CategoriaId | "todas";
  escolherCategoria: (c: CategoriaId | "todas") => void;
  toast: (msg: string) => void;
};

const Ctx = createContext<LojaCtx | null>(null);

export function useLoja() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLoja fora do LojaProvider");
  return c;
}

const K_SACOLA = "pimentadoce.sacola";

export function LojaProvider({ children }: { children: React.ReactNode }) {
  const [sacola, setSacola] = useState<ItemSacola[]>([]);
  const [carregado, setCarregado] = useState(false);
  const [produtoAberto, setProdutoAberto] = useState<LojaCtx["produtoAberto"]>(null);
  const [sacolaAberta, setSacolaAberta] = useState(false);
  const [categoria, setCategoria] = useState<LojaCtx["categoria"]>("todas");
  const [toastMsg, setToastMsg] = useState<{ texto: string; n: number } | null>(null);

  // localStorage só existe no navegador: lê depois da hidratação
  useEffect(() => { setSacola(ler<ItemSacola[]>(K_SACOLA, [])); setCarregado(true); }, []);
  useEffect(() => { if (carregado) gravar(K_SACOLA, sacola); }, [sacola, carregado]);

  const toast = useCallback((texto: string) => setToastMsg((t) => ({ texto, n: (t?.n ?? 0) + 1 })), []);

  const adicionar = useCallback((item: Novo) => {
    const chave = chaveItem(item.id, item.cor, item.tamanho, item.tamanhoCalcinha);
    setSacola((s) => {
      const existe = s.find((i) => i.chave === chave);
      return existe ? s.map((i) => (i.chave === chave ? { ...i, qtd: i.qtd + item.qtd } : i)) : [...s, { ...item, chave }];
    });
  }, []);

  const valor = useMemo<LojaCtx>(() => ({
    sacola,
    qtdItens: sacola.reduce((a, i) => a + i.qtd, 0),
    adicionar,
    alterarQtd: (chave, delta) => setSacola((s) => s.map((i) => (i.chave === chave ? { ...i, qtd: Math.max(1, Math.min(10, i.qtd + delta)) } : i))),
    remover: (chave) => setSacola((s) => s.filter((i) => i.chave !== chave)),
    esvaziar: () => setSacola([]),
    produtoAberto,
    abrirProduto: (id, cor) => setProdutoAberto({ id, cor }),
    fecharProduto: () => setProdutoAberto(null),
    sacolaAberta,
    abrirSacola: () => setSacolaAberta(true),
    fecharSacola: () => setSacolaAberta(false),
    categoria,
    escolherCategoria: setCategoria,
    toast,
  }), [sacola, adicionar, produtoAberto, sacolaAberta, categoria, toast]);

  return (
    <Ctx.Provider value={valor}>
      {children}
      <Toast msg={toastMsg} />
    </Ctx.Provider>
  );
}

function Toast({ msg }: { msg: { texto: string; n: number } | null }) {
  const [visivel, setVisivel] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    if (!msg) return;
    setVisivel(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisivel(false), 2600);
    return () => clearTimeout(timer.current);
  }, [msg]);
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed left-1/2 z-[70] max-w-[calc(100%-32px)] -translate-x-1/2 rounded-full bg-tinta px-5 py-3 text-sm text-papel transition-all duration-300 bottom-[calc(88px+env(safe-area-inset-bottom,0px))] ${visivel ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
    >
      {msg?.texto}
    </div>
  );
}
