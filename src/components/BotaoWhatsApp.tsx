"use client";

import { mensagemDuvida, produtoPorId, waUrl } from "@/lib/loja";
import { useLoja } from "./LojaProvider";

/** Botão flutuante: se uma peça estiver aberta, a mensagem já cita a peça. */
export function BotaoWhatsApp() {
  const { produtoAberto, sacolaAberta } = useLoja();
  const p = produtoAberto ? produtoPorId(produtoAberto.id) : undefined;
  if (sacolaAberta) return null;

  return (
    <a
      href={waUrl(mensagemDuvida(p))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tirar dúvida no WhatsApp"
      className="fixed right-4 bottom-[calc(16px+env(safe-area-inset-bottom,0px))] z-50 flex min-h-14 items-center gap-2.5 rounded-full bg-zap px-[15px] text-sm font-semibold text-white no-underline shadow-[0_14px_30px_-10px_rgba(0,0,0,.45)] transition-transform duration-300 hover:-translate-y-0.5 sm:pr-5"
    >
      <svg viewBox="0 0 24 24" className="h-[26px] w-[26px] flex-none" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20l1.3-3.8A8 8 0 1 1 8 19z" />
        <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.4-1.8-.9-.8.8c-1-.4-2-1.4-2.4-2.4l.8-.8-.9-1.8L9 9.5z" fill="currentColor" stroke="none" />
      </svg>
      <span className="hidden sm:inline">Dúvidas? Fale com a gente</span>
    </a>
  );
}
