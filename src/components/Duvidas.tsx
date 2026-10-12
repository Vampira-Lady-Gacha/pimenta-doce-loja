import { CONFIG } from "@/lib/config";
import { brl } from "@/lib/loja";
import { Titulo } from "./Titulo";

const PERGUNTAS: [string, string][] = [
  ["Como sei meu tamanho?", "Use o provador de medidas acima com a medida do quadril em centímetros. Se ficar entre dois tamanhos, mande suas medidas no WhatsApp e indicamos o modelo."],
  ["Por que algumas peças estão com preço sob consulta?", "Os valores variam por cor e modelo. Escolha a peça, o tamanho e a cor e toque em Pedir pelo WhatsApp: respondemos com o valor e as cores disponíveis."],
  ["Posso trocar peça íntima?", "Pode trocar o tamanho em até 7 dias após o recebimento, com a peça sem uso, com etiqueta e com o protetor higiênico da calcinha. Por higiene, não aceitamos peças usadas ou lavadas."],
  ["Como vem a embalagem?", "Em caixa ou envelope liso, sem o nome da loja nem a descrição do conteúdo por fora."],
  ["Quanto custa o frete?", `Frete fixo de ${brl(CONFIG.freteFixo)} para todo o Brasil, grátis em pedidos acima de ${brl(CONFIG.freteGratisAcima)}. O prazo depende da sua região e é informado no fechamento pelo WhatsApp.`],
  ["Quais as formas de pagamento?", `Pix com ${Math.round(CONFIG.descontoPix * 100)}% de desconto ou cartão de crédito em até ${CONFIG.parcelasSemJuros}x sem juros, com link de pagamento enviado no WhatsApp.`],
  ["Como lavar as peças?", "À mão, em água fria e com sabão neutro. Não torcer e secar à sombra, longe do sol direto."],
];

export function Duvidas() {
  return (
    <section id="duvidas" className="secao pt-0">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1fr)]">
        <Titulo rotulo="Dúvidas" titulo={<>Antes de <em>escolher</em></>} className="mb-0 self-start">
          Não achou a resposta? Chame no WhatsApp pelo botão verde.
        </Titulo>
        <div className="border-t border-linha">
          {PERGUNTAS.map(([p, r]) => (
            <details key={p} className="group border-b border-linha">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold [&::-webkit-details-marker]:hidden">
                {p}
                <span aria-hidden="true" className="font-mono text-xl text-pimenta transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-[62ch] pb-5 text-tinta-2">{r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
