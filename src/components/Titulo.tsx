export function Titulo({ rotulo, titulo, children, className = "mb-[clamp(28px,5vw,48px)]" }: {
  rotulo: string;
  titulo: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid max-w-[60ch] gap-3.5 ${className}`}>
      <p className="rotulo">{rotulo}</p>
      <h2 className="titulo-secao">{titulo}</h2>
      {children && <p className="text-tinta-2">{children}</p>}
    </div>
  );
}
