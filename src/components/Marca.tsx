/** Logotipo em texto, no desenho do perfil: PÍMENTA em versais espaçadas, "doce" cursivo, MODA ÍNTIMA miúdo. */
export function Marca({ tamanho = "md", claro = false }: { tamanho?: "md" | "lg"; claro?: boolean }) {
  const lg = tamanho === "lg";
  return (
    <span className={`inline-grid justify-items-center leading-none ${claro ? "text-papel" : "text-tinta"}`}>
      <span className={`font-display font-medium tracking-[.28em] ${lg ? "text-[2rem]" : "text-[1.15rem]"}`}>PÍMENTA</span>
      <span className={`-mt-1.5 font-script ${claro ? "text-papel" : "text-pimenta"} ${lg ? "text-[3rem]" : "text-[1.85rem]"}`}>doce</span>
      <span className={`-mt-0.5 font-texto font-semibold tracking-[.32em] ${lg ? "text-[.62rem]" : "text-[.5rem]"} ${claro ? "opacity-75" : "text-ouro"}`}>
        ✦ MODA ÍNTIMA ✦
      </span>
    </span>
  );
}
