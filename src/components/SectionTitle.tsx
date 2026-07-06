import type { ReactNode } from "react";

interface SectionTitleProps {
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
  eyebrow?: string;
  subtitle?: string;
  title: string;
}

export function SectionTitle({
  align = "left",
  children,
  className = "",
  eyebrow,
  subtitle,
  title
}: SectionTitleProps) {
  return (
    <header
      className={`section-title section-title--${align} ${className}`.trim()}
    >
      {eyebrow ? <p className="section-title__eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
      <span className="section-title__rule" />
      {children}
    </header>
  );
}
