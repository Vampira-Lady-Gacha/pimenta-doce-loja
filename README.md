# Pimenta Doce · moda íntima

Loja online da Pimenta Doce (@intima.pimentadocemoda): coleção com filtros, ficha da peça com cor e tamanho, provador de medidas, sacola e fechamento do pedido pelo WhatsApp.

Next.js 15 (App Router) + React 19 + Tailwind CSS 4, sem outras dependências.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera o site estático em out/
```

## Publicação

O site é estático (`output: "export"`) e vai para o GitHub Pages pelo workflow `.github/workflows/pages.yml` a cada push na `main`. O workflow passa `BASE_PATH=/<nome do repositório>`, porque o Pages serve o site em `https://<usuário>.github.io/<repositório>/`. Para testar esse caminho localmente no Git Bash: `MSYS_NO_PATHCONV=1 BASE_PATH=/pimenta-doce-loja npm run build`.

## Antes de publicar

- **Dados da loja** em [`src/lib/config.ts`](src/lib/config.ts): WhatsApp, frete, desconto Pix, parcelas e cidade (campos PREENCHER).
- **Produtos** em [`src/lib/produtos.ts`](src/lib/produtos.ts). No ar: 4 calcinhas reais tiradas dos posts do Instagram (fio duplo verde, REF 1063 bege, REF 2727 marrom, REF 2407 vermelha), **sem preço** (o site mostra "Preço sob consulta" e o botão vira "Pedir pelo WhatsApp"). Preencha `preco` em cada uma para liberar sacola, Pix e frete. As 12 peças ilustradas de exemplo têm `demo: true` e só aparecem com `CONFIG.mostrarDemonstracao = true`.
- **Fotos** em `public/produtos/`, capturadas da tela dos posts (cerca de 580 × 760 px). Para mais nitidez, substitua pelos arquivos originais com o mesmo nome.
- **Políticas a confirmar** (estão no texto do site): embalagem discreta, troca em 7 dias com peça sem uso, frete fixo, desconto no Pix, parcelamento.
- **Identidade visual:** tirada do Instagram em out/2026. Vinho do logo (#6E0A10) para marca e botões, champanhe (#EFE2D3) e dourado (#A57A32) das molduras dos posts, logo em texto (`Marca.tsx`: PÍMENTA em versais, "doce" cursivo em Pinyon Script, MODA ÍNTIMA). O desenho em traço da mulher do logo não foi refeito: quando houver o arquivo do logo (SVG ou PNG), substituir em `Marca.tsx`.
- **Loja física:** Mega Modas Shopping, Goiânia (do perfil). Conferir endereço completo e horário em `config.ts`.

## Como o pedido funciona hoje

Não há servidor de pedidos. A sacola fica no navegador; ao enviar, o site abre o WhatsApp com o pedido (código PD-xxxx, itens, tamanhos, total, frete e endereço) e a loja responde com a chave Pix ou o link do cartão.

## Estrutura

| Arquivo | Faz |
| --- | --- |
| `app/globals.css` | Tokens claro/escuro, `@theme` do Tailwind, arco de provador, borda de renda, diálogos |
| `lib/config.ts`, `lib/produtos.ts` | Dados da loja e catálogo |
| `lib/loja.ts` | Preço no Pix, parcelas, totais, mensagem do pedido, faixas do provador |
| `components/LojaProvider.tsx` | Estado: sacola, peça aberta, gaveta, filtro de categoria, toast |
| `components/Ilustracao.tsx` | Peças em SVG na cor escolhida, com textura de renda, tule, canelado ou cetim |
| `components/Cabecalho.tsx` | Faixa de aviso, logo, menu, sacola |
| `components/Hero.tsx` | Chamada principal e vitrine em arcos |
| `components/Categorias.tsx` | Atalhos de categoria |
| `components/Colecao.tsx` | Filtros e cartões com troca de cor |
| `components/FichaProduto.tsx` | Cor, tamanho (conjunto com sutiã + calcinha), quantidade |
| `components/Provador.tsx` | Busto, sob o busto e quadril → tamanhos |
| `components/Vantagens.tsx`, `Duvidas.tsx`, `InstagramChamada.tsx`, `Rodape.tsx` | Conteúdo institucional |
| `components/Sacola.tsx` | Itens, pagamento, entrega e envio pelo WhatsApp |
| `components/BotaoWhatsApp.tsx` | Botão flutuante (cita a peça aberta) |

## Próximos passos

1. Fotos e produtos reais; cores da marca.
2. Pedidos gravados em servidor com painel (como nas lojas SCHEID e Vanuza Andrade), Pix com QR Code e controle de estoque por cor e tamanho.
