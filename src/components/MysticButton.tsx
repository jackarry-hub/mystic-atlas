import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface MysticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  to?: string;
  variant?: "primary" | "ghost" | "text";
}

export function MysticButton({
  children,
  className = "",
  icon,
  to,
  type = "button",
  variant = "primary",
  ...buttonProps
}: MysticButtonProps) {
  const classes = `mystic-button mystic-button--${variant} ${className}`.trim();
  const content = (
    <>
      {icon ? <span className="mystic-button__icon">{icon}</span> : null}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link className={classes} to={to}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...buttonProps}>
      {content}
    </button>
  );
}
