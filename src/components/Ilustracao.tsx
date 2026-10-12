import { useId } from "react";
import type { Acabamento, Modelo } from "@/lib/produtos";

// Ilustrações das peças em SVG, na cor escolhida. Ficam no lugar das fotos até existirem fotos reais.

type Grupo = { formas: string[]; alcas?: string[]; transform?: string };

const SUTIA_BOJO: Grupo = {
  formas: [
    "M66 196 Q150 212 234 196 L236 216 Q150 232 64 216 Z",
    "M72 196 C64 150 98 112 148 148 L150 196 Q110 204 72 196 Z",
    "M228 196 C236 150 202 112 152 148 L150 196 Q190 204 228 196 Z",
  ],
  alcas: ["M96 134 L90 50", "M204 134 L210 50"],
};
const SUTIA_TRIANGULO: Grupo = {
  formas: [
    "M70 200 Q150 212 230 200 L232 216 Q150 228 68 216 Z",
    "M78 200 L118 112 L150 200 Z",
    "M150 200 L182 112 L222 200 Z",
  ],
  alcas: ["M118 114 L104 46", "M182 114 L196 46"],
};
const CALCINHA_ALTA: Grupo = { formas: ["M72 72 Q150 86 228 72 L238 150 Q192 164 170 238 L130 238 Q108 164 62 150 Z"], alcas: ["M74 88 Q150 102 226 88"] };

const DESENHOS: Record<Modelo, Grupo[]> = {
  "sutia-bojo": [SUTIA_BOJO],
  "sutia-triangulo": [SUTIA_TRIANGULO],
  top: [{
    formas: ["M86 92 Q150 128 214 92 L230 214 Q150 230 70 214 Z"],
    alcas: ["M100 100 L116 40", "M200 100 L184 40", "M74 190 Q150 206 226 190"],
  }],
  "calcinha-fio": [{
    formas: ["M58 104 Q150 122 242 104 L240 122 Q190 140 166 232 Q150 242 134 232 Q110 140 60 122 Z"],
    alcas: ["M60 112 Q150 130 240 112"],
  }],
  "calcinha-alta": [CALCINHA_ALTA],
  calecon: [{ formas: ["M68 96 Q150 108 232 96 L244 206 L176 214 Q150 188 124 214 L56 206 Z"], alcas: ["M68 114 Q150 126 232 114"] }],
  conjunto: [
    { ...SUTIA_BOJO, transform: "translate(45 -20) scale(.7)" },
    { ...CALCINHA_ALTA, transform: "translate(60 118) scale(.6)" },
  ],
  body: [
    { formas: ["M70 150 Q150 166 230 150 L220 214 Q186 232 168 276 L132 276 Q114 232 80 214 Z"] },
    { formas: SUTIA_BOJO.formas.slice(1), alcas: SUTIA_BOJO.alcas, transform: "translate(0 -42)" },
  ],
  camisola: [{
    formas: ["M104 88 Q150 112 196 88 L240 268 Q150 284 60 268 Z"],
    alcas: ["M112 28 L118 92", "M188 28 L182 92"],
  }],
  pijama: [
    { formas: ["M102 30 Q150 58 198 30 L214 150 Q150 162 86 150 Z"] },
    { formas: ["M84 168 L216 168 L230 252 L162 258 L150 222 L138 258 L70 252 Z"], alcas: ["M84 180 L216 180"] },
  ],
  robe: [{
    formas: [
      "M98 40 L36 74 L22 168 L84 176 L100 96 Z",
      "M202 40 L264 74 L278 168 L216 176 L200 96 Z",
      "M98 40 L150 70 L202 40 L238 278 L62 278 Z",
      "M74 160 Q150 172 226 160 L228 176 Q150 188 72 176 Z",
    ],
    alcas: ["M98 40 L150 168", "M202 40 L150 168", "M150 174 L132 232", "M150 174 L170 238"],
  }],
};

/** Clareia (>0) ou escurece (<0) uma cor hex. */
function tom(hex: string, f: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f));
  return `rgb(${c.join(",")})`;
}
const ehClara = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) > 150;
};

export function Ilustracao({ modelo, cor, acabamento, className, rotulo }: {
  modelo: Modelo; cor: string; acabamento: Acabamento; className?: string; rotulo?: string;
}) {
  const id = useId().replace(/:/g, "");
  const clara = ehClara(cor);
  const fio = clara ? "rgba(60,30,40,.32)" : "rgba(255,255,255,.3)";
  const contorno = clara ? "rgba(60,30,40,.35)" : "rgba(0,0,0,.35)";
  const alca = tom(cor, clara ? -0.25 : 0.18);

  const textura =
    acabamento === "renda" ? (
      <pattern id={`t${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="8" cy="8" r="4.5" fill="none" stroke={fio} strokeWidth="1.2" />
        <circle cx="0" cy="0" r="2" fill={fio} /><circle cx="16" cy="16" r="2" fill={fio} />
        <circle cx="16" cy="0" r="2" fill={fio} /><circle cx="0" cy="16" r="2" fill={fio} />
      </pattern>
    ) : acabamento === "tule" ? (
      <pattern id={`t${id}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M0 0 H7 M0 0 V7" stroke={fio} strokeWidth=".8" />
      </pattern>
    ) : acabamento === "canelado" ? (
      <pattern id={`t${id}`} width="6" height="6" patternUnits="userSpaceOnUse">
        <path d="M3 0 V6" stroke={fio} strokeWidth="1.4" />
      </pattern>
    ) : acabamento === "cetim" ? (
      <linearGradient id={`t${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset=".15" stopColor="#fff" stopOpacity="0" />
        <stop offset=".4" stopColor="#fff" stopOpacity=".38" />
        <stop offset=".55" stopColor="#fff" stopOpacity="0" />
        <stop offset=".8" stopColor="#fff" stopOpacity=".16" />
      </linearGradient>
    ) : null;

  return (
    <svg viewBox="0 0 300 300" className={className} role={rotulo ? "img" : undefined} aria-label={rotulo} aria-hidden={rotulo ? undefined : true}>
      {textura && <defs>{textura}</defs>}
      {DESENHOS[modelo].map((g, gi) => (
        <g key={gi} transform={g.transform}>
          {g.formas.map((d, i) => (
            <g key={i}>
              <path d={d} fill={cor} stroke={contorno} strokeWidth="1.5" strokeLinejoin="round" />
              {textura && <path d={d} fill={`url(#t${id})`} />}
            </g>
          ))}
          {g.alcas?.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={alca} strokeWidth="5" strokeLinecap="round" />
          ))}
        </g>
      ))}
    </svg>
  );
}
