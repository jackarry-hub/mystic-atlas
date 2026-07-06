import type { CSSProperties, ReactNode } from "react";

interface PageBackgroundProps {
  background: string;
  children: ReactNode;
  className?: string;
}

export function PageBackground({
  background,
  children,
  className = ""
}: PageBackgroundProps) {
  const style = {
    "--page-bg": `url("${background}")`
  } as CSSProperties;

  return (
    <main className={`page-background ${className}`.trim()} style={style}>
      <div className="page-background__image" />
      <div className="page-background__veil" />
      <div className="page-background__stardust" />
      <div className="page-background__content page-fade">{children}</div>
    </main>
  );
}
