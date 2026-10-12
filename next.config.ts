import type { NextConfig } from "next";

// No GitHub Pages o site fica em /<repositório>/; o workflow passa BASE_PATH=/<repositório>.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  trailingSlash: true,
  // Pages é hospedagem estática: sem o otimizador de imagens do servidor Next
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Há um package-lock.json solto em C:\Users\User; fixa a raiz neste projeto
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
