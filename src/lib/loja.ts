import { CONFIG } from "./config";
import { CORES, PRODUTOS, type CorId, type Produto } from "./produtos";

export type ItemSacola = {
  chave: string;
  id: string;
  cor: CorId;
  tamanho: string;
  tamanhoCalcinha?: string;
  qtd: number;
};

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const produtoPorId = (id: string): Produto | undefined => PRODUTOS.find((p) => p.id === id);
export const precoPix = (n: number) => Math.round(n * (1 - CONFIG.descontoPix) * 100) / 100;
export const parcela = (n: number) => `${CONFIG.parcelasSemJuros}x de ${brl(n / CONFIG.parcelasSemJuros)} sem juros`;
export const desconto = (p: Produto) => (p.preco && p.precoDe ? Math.round((1 - p.preco / p.precoDe) * 100) : 0);
export const nomeComRef = (p: Produto) => (p.ref ? `${p.nome} REF ${p.ref}` : p.nome);

export const chaveItem = (id: string, cor: CorId, tamanho: string, tamanhoCalcinha?: string) =>
  [id, cor, tamanho, tamanhoCalcinha].filter(Boolean).join("|");

export const tamanhoTexto = (i: Pick<ItemSacola, "tamanho" | "tamanhoCalcinha">) =>
  i.tamanhoCalcinha ? `sutiã ${i.tamanho} · calcinha ${i.tamanhoCalcinha}` : `tam. ${i.tamanho}`;

export function totais(itens: ItemSacola[], pix: boolean) {
  const subtotal = itens.reduce((a, i) => a + (produtoPorId(i.id)?.preco ?? 0) * i.qtd, 0);
  const semPreco = itens.some((i) => produtoPorId(i.id)?.preco === undefined);
  const frete = !itens.length || subtotal >= CONFIG.freteGratisAcima ? 0 : CONFIG.freteFixo;
  const descontoPix = pix ? Math.round(subtotal * CONFIG.descontoPix * 100) / 100 : 0;
  return { subtotal, frete, descontoPix, total: subtotal - descontoPix + frete, faltaFreteGratis: Math.max(0, CONFIG.freteGratisAcima - subtotal), semPreco };
}

export const waUrl = (texto: string) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;

/** Canal de pedidos: WhatsApp se houver número em CONFIG, senão o Direct do Instagram. */
export const TEM_WHATSAPP = CONFIG.whatsapp.length >= 12;
export const CANAL = TEM_WHATSAPP ? "WhatsApp" : "Instagram";
export const DIRECT = `https://ig.me/m/${CONFIG.instagramUsuario.replace("@", "")}`;
/** O Direct não aceita texto pronto: abrirContato copia a mensagem antes. */
export const contatoUrl = (texto: string) => (TEM_WHATSAPP ? waUrl(texto) : DIRECT);

/** Abre o canal; no Instagram copia a mensagem para a pessoa colar. Devolve true se copiou. */
export async function abrirContato(texto: string) {
  let copiou = false;
  if (!TEM_WHATSAPP) {
    try {
      await navigator.clipboard.writeText(texto);
      copiou = true;
    } catch {
      /* sem permissão de cópia: abre o Direct mesmo assim */
    }
  }
  window.open(contatoUrl(texto), "_blank", "noopener");
  return copiou;
}

const linha = (i: ItemSacola) => {
  const p = produtoPorId(i.id);
  return p ? `• ${i.qtd}x ${nomeComRef(p)} (${CORES[i.cor].nome}, ${tamanhoTexto(i)}): ${p.preco ? brl(p.preco * i.qtd) : "preço a confirmar"}` : "";
};

export function mensagemPedido(
  itens: ItemSacola[],
  d: { codigo: string; nome: string; cep: string; endereco: string; pagamento: "pix" | "cartao" },
) {
  const t = totais(itens, d.pagamento === "pix");
  return [
    `Olá, ${CONFIG.marca}! Quero fechar o pedido ${d.codigo}:`,
    ...itens.map(linha),
    `Subtotal: ${brl(t.subtotal)}`,
    d.pagamento === "pix" ? `Desconto Pix: −${brl(t.descontoPix)}` : `Pagamento: cartão (${CONFIG.parcelasSemJuros}x sem juros)`,
    `Frete: ${t.frete ? brl(t.frete) : "grátis"}`,
    t.semPreco ? `Total parcial: ${brl(t.total)} (há peças com preço a confirmar)` : `Total: ${brl(t.total)}`,
    "",
    `Nome: ${d.nome}`,
    `Entrega: ${d.endereco}, CEP ${d.cep}`,
  ].join("\n");
}

export const mensagemDuvida = (p?: Produto) =>
  p ? `Olá, ${CONFIG.marca}! Tenho uma dúvida sobre a ${nomeComRef(p)}.` : `Olá, ${CONFIG.marca}! Vim pelo site e tenho uma dúvida.`;

/** Peça sem preço no site: pede preço e disponibilidade direto. */
export const mensagemConsulta = (p: Produto, cor: CorId, tamanho: string, qtd: number) =>
  `Olá, ${CONFIG.marca}! Vi no site a ${nomeComRef(p)} e quero ${qtd} no tamanho ${tamanho}, cor ${CORES[cor].nome}. Qual o valor e quais cores estão disponíveis?`;

/** Procura a faixa da tabela que contém a medida; fora das faixas, devolve a mais próxima. */
export function faixa(tabela: [string, number, number][], medida: number) {
  const dentro = tabela.find(([, a, b]) => medida >= a && medida <= b);
  if (dentro) return { tamanho: dentro[0], exato: true };
  const ultima = tabela[tabela.length - 1];
  return { tamanho: medida < tabela[0][1] ? tabela[0][0] : ultima[0], exato: false };
}
