import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Mono, Hanken_Grotesk, Pinyon_Script } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-pinyon", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
const dmmono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dmmono", display: "swap" });

export const metadata: Metadata = {
  title: "Pimenta Doce · moda íntima",
  description: "Moda íntima feita para você se amar ainda mais. Calcinhas, sutiãs, conjuntos e pijamas, com provador de medidas e envio para todo o Brasil. Loja no Mega Modas Shopping, Goiânia.",
  openGraph: { locale: "pt_BR", type: "website", siteName: "Pimenta Doce" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F1EA" },
    { media: "(prefers-color-scheme: dark)", color: "#1A0B0D" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${pinyon.variable} ${hanken.variable} ${dmmono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
