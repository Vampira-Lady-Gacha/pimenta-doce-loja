import Image from "next/image";
import { CORES, type CorId, type Produto } from "@/lib/produtos";
import { Ilustracao } from "./Ilustracao";

/**
 * Foto real da peça quando existe (preenche o quadro), senão a ilustração na cor escolhida.
 * O contêiner define o tamanho; a foto usa object-cover.
 */
export function FotoProduto({ p, cor, sizes, prioridade, className = "", rotulo }: {
  p: Produto; cor: CorId; sizes: string; prioridade?: boolean; className?: string; rotulo?: string;
}) {
  if (p.foto) {
    return (
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p.foto}`}
        alt={rotulo ?? `${p.nome}${p.ref ? ` REF ${p.ref}` : ""}, frente e costas`}
        fill
        sizes={sizes}
        priority={prioridade}
        className={`object-cover object-top ${className}`}
      />
    );
  }
  return (
    <span className="absolute inset-0 grid place-items-center p-[10%]">
      <Ilustracao modelo={p.modelo} cor={CORES[cor].hex} acabamento={p.acabamento} rotulo={rotulo} className={`h-full w-full ${className}`} />
    </span>
  );
}
