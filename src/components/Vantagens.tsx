import { CONFIG } from "@/lib/config";
import { brl } from "@/lib/loja";

const ITENS = [
  {
    titulo: "Embalagem discreta",
    texto: "Caixa lisa, sem o nome da loja por fora. Ninguém sabe o que chegou.",
    icone: <path d="M4 8l8-4 8 4v8l-8 4-8-4V8zM4 8l8 4 8-4M12 12v8" />,
  },
  {
    titulo: `Frete grátis acima de ${brl(CONFIG.freteGratisAcima)}`,
    texto: `Para todo o Brasil. Abaixo disso, frete fixo de ${brl(CONFIG.freteFixo)}.`,
    icone: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-.01M17 19a2 2 0 1 0 0-.01" />,
  },
  {
    titulo: `${Math.round(CONFIG.descontoPix * 100)}% off no Pix`,
    texto: `Ou em até ${CONFIG.parcelasSemJuros}x sem juros no cartão.`,
    icone: <path d="M12 3l4 4-4 4-4-4 4-4zM5 10l4 4-4 4M19 10l-4 4 4 4M12 13l4 4-4 4-4-4 4-4z" />,
  },
  {
    titulo: "Troca de tamanho",
    texto: "Em até 7 dias, com a peça sem uso, etiqueta e protetor higiênico.",
    icone: <path d="M4 9h13l-3-3M20 15H7l3 3" />,
  },
];

export function Vantagens() {
  return (
    <section aria-label="Vantagens" className="border-y border-linha py-10">
      <ul className="wrap grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {ITENS.map((i) => (
          <li key={i.titulo} className="flex gap-4">
            <svg viewBox="0 0 24 24" className="h-7 w-7 flex-none text-pimenta" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{i.icone}</svg>
            <div>
              <h3 className="font-texto text-base font-semibold tracking-normal">{i.titulo}</h3>
              <p className="mt-1 text-sm text-tinta-2">{i.texto}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
