import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface MysticCardProps {
  children: ReactNode;
  className?: string;
  compact?: boolean;
  interactive?: boolean;
  to?: string;
}

export function MysticCard({
  children,
  className = "",
  compact = false,
  interactive = true,
  to
}: MysticCardProps) {
  const classes = [
    "mystic-card",
    compact ? "mystic-card--compact" : "",
    interactive ? "mystic-card--interactive" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
