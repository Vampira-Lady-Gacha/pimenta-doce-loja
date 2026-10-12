// Dados da loja. Os marcados com PREENCHER ainda são provisórios.
export const CONFIG = {
  marca: "Pimenta Doce",
  segmento: "moda íntima",
  instagram: "https://www.instagram.com/intima.pimentadocemoda/",
  instagramUsuario: "@intima.pimentadocemoda",
  // PREENCHER: DDI + DDD + número, só dígitos (ex.: "5562999999999"). Vazio = pedidos e dúvidas vão para o Direct do Instagram.
  whatsapp: "",
  whatsappLabel: "", // ex.: "(62) 99999-9999"
  cidade: "Goiânia, GO",
  lojaFisica: "Mega Modas Shopping, Goiânia, GO, CEP 74063-320", // conforme o perfil do Instagram
  bordao: "Moda íntima feita para você se amar ainda mais.",
  freteFixo: 19.9, // PREENCHER
  freteGratisAcima: 199, // PREENCHER
  descontoPix: 0.05, // PREENCHER: 5% no Pix
  parcelasSemJuros: 3, // PREENCHER
  /** Mostra também as peças de exemplo ilustradas (sutiãs, conjuntos, pijamas...) e o aviso de demonstração no rodapé. */
  mostrarDemonstracao: false,
} as const;
