import type { ElementType, ReactNode } from "react";

/** The site-wide content width (see `container-site` in globals.css). */
export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`container-site ${className}`}>{children}</Tag>;
}
