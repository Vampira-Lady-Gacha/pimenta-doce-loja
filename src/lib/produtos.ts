// Catálogo. As peças com foto vieram dos posts do Instagram (out/2026); as marcadas com demo
// são exemplos ilustrados e só aparecem com CONFIG.mostrarDemonstracao = true.
import { CONFIG } from "./config";

export type Modelo =
  | "sutia-bojo" | "sutia-triangulo" | "top"
  | "calcinha-fio" | "calcinha-alta" | "calecon"
  | "conjunto" | "body" | "camisola" | "pijama" | "robe";

export type Acabamento = "renda" | "cetim" | "liso" | "canelado" | "tule";
export type CategoriaId = "sutias" | "calcinhas" | "conjuntos" | "bodies" | "noite";
export type CorId = "preto" | "vermelho" | "vinho" | "nude" | "caramelo" | "verde" | "rosa" | "offwhite";

export type Produto = {
  id: string;
  nome: string;
  categoria: CategoriaId;
  modelo: Modelo;
  acabamento: Acabamento;
  /** Sem preço: o site mostra "Preço sob consulta" e o pedido segue pelo WhatsApp ou Direct. */
  preco?: number;
  precoDe?: number;
  /** Referência usada nos posts (ex.: REF 2727). */
  ref?: string;
  /** Foto em /public/produtos. Sem foto, usa a ilustração. */
  foto?: string;
  /** Post de origem no Instagram. */
  post?: string;
  /** Além das cores listadas, há outras sob consulta. */
  outrasCores?: boolean;
  demo?: boolean;
  cores: CorId[];
  tamanhos: string[];
  /** Só conjuntos: a calcinha tem grade própria. */
  tamanhosCalcinha?: string[];
  tecido: string;
  descricao: string;
  novo?: boolean;
};

export const CORES: Record<CorId, { nome: string; hex: string }> = {
  preto: { nome: "Preto", hex: "#1D1719" },
  vermelho: { nome: "Vermelho pimenta", hex: "#A3101C" },
  vinho: { nome: "Vinho", hex: "#6A0A10" },
  nude: { nome: "Nude", hex: "#DDB894" },
  caramelo: { nome: "Caramelo", hex: "#9A5A35" },
  verde: { nome: "Verde menta", hex: "#7FB5A6" },
  rosa: { nome: "Rosa chá", hex: "#E4A9B2" },
  offwhite: { nome: "Off-white", hex: "#F2EADF" },
};

export const CATEGORIAS: Record<CategoriaId, { nome: string; modelo: Modelo; cor: CorId }> = {
  sutias: { nome: "Sutiãs", modelo: "sutia-bojo", cor: "nude" },
  calcinhas: { nome: "Calcinhas", modelo: "calcinha-alta", cor: "caramelo" },
  conjuntos: { nome: "Conjuntos", modelo: "conjunto", cor: "vermelho" },
  bodies: { nome: "Bodies", modelo: "body", cor: "vinho" },
  noite: { nome: "Pijamas & camisolas", modelo: "camisola", cor: "rosa" },
};

const SUTIA = ["40", "42", "44", "46", "48", "50"];
const PMG = ["P", "M", "G", "GG"];

export const PRODUTOS: Produto[] = [
  // ---- Peças reais (posts do Instagram). PREENCHER: preço de cada uma.
  { id: "calcinha-fio-duplo", nome: "Calcinha Fio Duplo Sem Costura", categoria: "calcinhas", modelo: "calcinha-fio", acabamento: "liso", cores: ["verde"], outrasCores: true, tamanhos: PMG, foto: "/produtos/calcinha-fio-duplo-verde.jpg", post: "DY3RQ4ZjbeD", tecido: "Tecido sem costura, macio e leve", descricao: "Modelagem anatômica, cintura em V que valoriza a silhueta e fio duplo que realça sem apertar. Não marca na roupa: ideal para o dia a dia e para looks justinhos.", novo: true },
  { id: "calcinha-1063", nome: "Calcinha Bege", ref: "1063", categoria: "calcinhas", modelo: "calcinha-alta", acabamento: "liso", cores: ["nude"], outrasCores: true, tamanhos: PMG, foto: "/produtos/calcinha-1063-bege.jpg", post: "DYgL50XNYYz", tecido: "Tecido macio com acabamento em vivo", descricao: "Tom bege que valoriza as curvas com leveza, conforto e caimento perfeito. Porque se sentir linda começa nos detalhes." },
  { id: "calcinha-2727", nome: "Calcinha Marrom", ref: "2727", categoria: "calcinhas", modelo: "calcinha-alta", acabamento: "liso", cores: ["caramelo"], outrasCores: true, tamanhos: PMG, foto: "/produtos/calcinha-2727-marrom.jpg", post: "DYgLeEit3-v", tecido: "Toque macio, cós largo", descricao: "Caimento perfeito, toque macio e modelagem que valoriza o corpo com muito conforto." },
  { id: "calcinha-2407", nome: "Calcinha Fio Renda com Regulagem", ref: "2407", categoria: "calcinhas", modelo: "calcinha-fio", acabamento: "renda", cores: ["vermelho"], outrasCores: true, tamanhos: PMG, foto: "/produtos/calcinha-2407-vermelha.jpg", post: "DYTTVvMt4Ir", tecido: "Frente lisa, traseiro em renda, laterais reguláveis", descricao: "Modelagem perfeita e acabamento delicado, com tiras reguláveis e pingente dourado atrás. Disponível em várias cores." },

  // ---- Exemplos ilustrados (demo)
  { id: "conjunto-renda-pimenta", demo: true, nome: "Conjunto Renda Pimenta", categoria: "conjuntos", modelo: "conjunto", acabamento: "renda", preco: 159.9, precoDe: 189.9, cores: ["vermelho", "preto", "vinho"], tamanhos: SUTIA, tamanhosCalcinha: PMG, tecido: "Renda e microfibra, forro de algodão", descricao: "Sutiã com bojo e aro, calcinha de cós em renda. O vermelho que dá nome à casa." },
  { id: "sutia-bojo-chantilly", demo: true, nome: "Sutiã Bojo Renda Chantilly", categoria: "sutias", modelo: "sutia-bojo", acabamento: "renda", preco: 89.9, cores: ["preto", "nude", "vinho"], tamanhos: SUTIA, tecido: "Renda chantilly e microfibra", descricao: "Bojo de espuma fina, aro e alças reguláveis. Sustenta sem marcar a roupa." },
  { id: "sutia-triangulo-tule", demo: true, nome: "Sutiã Triângulo Tule", categoria: "sutias", modelo: "sutia-triangulo", acabamento: "tule", preco: 69.9, cores: ["preto", "rosa", "offwhite"], tamanhos: SUTIA, tecido: "Tule com elastano", descricao: "Sem bojo e sem aro, com bordas em elástico macio. Para os dias leves." },
  { id: "top-nadador-canelado", demo: true, nome: "Top Nadador Canelado", categoria: "sutias", modelo: "top", acabamento: "canelado", preco: 59.9, cores: ["preto", "offwhite", "nude"], tamanhos: PMG, tecido: "Algodão canelado com elastano", descricao: "Costas nadador e faixa larga embaixo do busto. Vai de casa à academia." },
  { id: "calcinha-fio-renda", demo: true, nome: "Calcinha Fio Renda", categoria: "calcinhas", modelo: "calcinha-fio", acabamento: "renda", preco: 29.9, cores: ["preto", "vermelho", "rosa", "nude"], tamanhos: PMG, tecido: "Renda com forro de algodão", descricao: "Fio dental com laterais finas em renda. Some debaixo da roupa." },
  { id: "calcinha-cintura-alta-tule", demo: true, nome: "Calcinha Cintura Alta Tule", categoria: "calcinhas", modelo: "calcinha-alta", acabamento: "tule", preco: 44.9, cores: ["nude", "caramelo", "preto", "vinho"], tamanhos: PMG, tecido: "Tule duplo com forro de algodão", descricao: "Cós alto que acompanha a cintura sem apertar." },
  { id: "calecon-algodao", demo: true, nome: "Caleçon Algodão", categoria: "calcinhas", modelo: "calecon", acabamento: "liso", preco: 34.9, cores: ["verde", "nude", "caramelo", "preto"], tamanhos: PMG, tecido: "Algodão penteado", descricao: "Modelo short, cobertura total e elástico embutido." },
  { id: "conjunto-segunda-pele", demo: true, nome: "Conjunto Segunda Pele", categoria: "conjuntos", modelo: "conjunto", acabamento: "liso", preco: 119.9, cores: ["nude", "preto", "rosa"], tamanhos: SUTIA, tamanhosCalcinha: PMG, tecido: "Microfibra com corte a laser", descricao: "Sem costura aparente: some debaixo de malha fina e roupa clara.", novo: true },
  { id: "body-renda-noite", demo: true, nome: "Body Renda Noite", categoria: "bodies", modelo: "body", acabamento: "renda", preco: 139.9, cores: ["preto", "vermelho"], tamanhos: PMG, tecido: "Renda elástica, forro no bojo", descricao: "Decote em V, costas abertas e fechamento de colchetes embaixo." },
  { id: "camisola-cetim-alcinha", demo: true, nome: "Camisola Cetim Alcinha", categoria: "noite", modelo: "camisola", acabamento: "cetim", preco: 129.9, cores: ["vinho", "preto", "rosa"], tamanhos: PMG, tecido: "Cetim de poliéster com barra em renda", descricao: "Alças finas reguláveis e caimento solto até o meio da coxa." },
  { id: "short-doll-viscose", demo: true, nome: "Short Doll Viscose", categoria: "noite", modelo: "pijama", acabamento: "liso", preco: 99.9, cores: ["rosa", "offwhite", "preto"], tamanhos: PMG, tecido: "Viscose", descricao: "Regata e short de cós de elástico, fresco para noites quentes.", novo: true },
  { id: "robe-cetim-kimono", demo: true, nome: "Robe Cetim Kimono", categoria: "noite", modelo: "robe", acabamento: "cetim", preco: 169.9, cores: ["preto", "vinho", "offwhite"], tamanhos: PMG, tecido: "Cetim com faixa de amarrar", descricao: "Manga ampla e faixa na cintura. Combina com a camisola." },
];

/** O que a loja mostra: peças reais e, se ligado, os exemplos. */
export const CATALOGO = PRODUTOS.filter((p) => !p.demo || CONFIG.mostrarDemonstracao);

export const CUIDADOS = "Lavar à mão em água fria com sabão neutro. Não torcer, secar à sombra e não passar sobre a renda.";

/** Tabelas de referência do provador (cm). Ajuste às medidas reais dos fornecedores. */
export const TABELA_SUTIA: [string, number, number][] = [
  ["40", 78, 83], ["42", 84, 88], ["44", 89, 93], ["46", 94, 98], ["48", 99, 103], ["50", 104, 108],
];
export const TABELA_BOJO: [string, number, number][] = [["P", 0, 13], ["M", 14, 17], ["G", 18, 99]];
export const TABELA_CALCINHA: [string, number, number][] = [["P", 88, 94], ["M", 95, 100], ["G", 101, 106], ["GG", 107, 113]];
export const TABELA_NOITE: [string, number, number][] = [["P", 80, 88], ["M", 89, 94], ["G", 95, 100], ["GG", 101, 108]];
