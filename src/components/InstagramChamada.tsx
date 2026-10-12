import { CONFIG } from "@/lib/config";
import { produtoPorId } from "@/lib/loja";
import { FotoProduto } from "./FotoProduto";

/** Bloco no estilo dos posts de frase do perfil: fundo vinho, traço claro, frase em versais. */
export function InstagramChamada() {
  const a = produtoPorId("calcinha-2407")!;
  const b = produtoPorId("calcinha-2727")!;
  return (
    <section aria-label="Instagram" className="secao">
      <div className="wrap">
        <div className="relative grid items-center gap-8 overflow-hidden rounded-[28px] bg-[#6E0A10] px-6 py-14 text-[#FFF7F0] sm:px-12 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="relative z-[1] max-w-[38ch]">
            <p className="font-display text-[clamp(1.4rem,3vw,2rem)] leading-snug tracking-[.18em] uppercase">
              Vestir-se bem é uma forma de cuidado e amor
            </p>
            <p className="mt-2 font-script text-3xl text-[#E6CFB5]">Pimenta Doce</p>
            <p className="mt-5 opacity-85">Lançamentos, cores disponíveis e as peças vestidas no nosso perfil.</p>
            <a
              href={CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#FFF7F0] px-6 font-semibold text-[#6E0A10] no-underline transition-transform hover:-translate-y-0.5"
            >
              {CONFIG.instagramUsuario} ↗
            </a>
          </div>
          <div aria-hidden="true" className="relative hidden h-56 w-72 md:block">
            <div className="arco absolute right-24 bottom-0 h-52 w-40 rotate-[-6deg] overflow-hidden bg-white/10">
              <FotoProduto p={a} cor={a.cores[0]} sizes="160px" rotulo="" />
            </div>
            <div className="arco absolute right-0 bottom-4 h-52 w-40 rotate-[5deg] overflow-hidden bg-[#E6CFB5]">
              <FotoProduto p={b} cor={b.cores[0]} sizes="160px" rotulo="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
