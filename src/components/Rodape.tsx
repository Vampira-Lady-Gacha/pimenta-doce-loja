import { CONFIG } from "@/lib/config";
import { DIRECT, TEM_WHATSAPP, waUrl, mensagemDuvida } from "@/lib/loja";
import { Marca } from "./Marca";

export function Rodape() {
  return (
    <footer className="bg-tinta text-papel">
      <div className="renda-faixa [--cor:var(--papel)]" aria-hidden="true" />
      <div className="wrap grid gap-10 pt-14 pb-8 text-sm sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Marca tamanho="lg" claro />
          <p className="mt-5 max-w-[34ch] opacity-80">{CONFIG.bordao} Conforto, estilo e autoestima.</p>
          <p className="mt-4 max-w-[34ch]">
            <b className="block font-semibold">Loja física</b>
            <a className="opacity-80" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.lojaFisica)}`} target="_blank" rel="noopener noreferrer">
              {CONFIG.lojaFisica} ↗
            </a>
          </p>
        </div>
        <div>
          <h2 className="mb-3 font-mono text-[.7rem] tracking-[.16em] uppercase opacity-70">Loja</h2>
          <ul className="grid gap-2 opacity-90">
            <li><a href="#colecao">Coleção</a></li>
            <li><a href="#provador">Provador de medidas</a></li>
            <li><a href="#duvidas">Trocas e envio</a></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-mono text-[.7rem] tracking-[.16em] uppercase opacity-70">Contato</h2>
          <ul className="grid gap-2 opacity-90">
            {TEM_WHATSAPP && <li>WhatsApp <a className="font-mono" href={waUrl(mensagemDuvida())} target="_blank" rel="noopener noreferrer">{CONFIG.whatsappLabel}</a></li>}
            <li><a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer">Instagram {CONFIG.instagramUsuario}</a></li>
            {!TEM_WHATSAPP && <li><a href={DIRECT} target="_blank" rel="noopener noreferrer">Mandar mensagem no Direct ↗</a></li>}
            {CONFIG.cidade && <li>Envios de {CONFIG.cidade}</li>}
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-3 border-t border-papel/15 py-5 text-xs opacity-60">
        <span>© 2026 {CONFIG.marca}. Todos os direitos reservados.</span>
        {CONFIG.mostrarDemonstracao && <span>Algumas peças são exemplos ilustrativos.</span>}
      </div>
    </footer>
  );
}
