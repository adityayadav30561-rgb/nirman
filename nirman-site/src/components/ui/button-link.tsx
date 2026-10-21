import Link from "next/link";
import type { ReactNode } from "react";
import { button } from "./button";

type Variant = Parameters<typeof button>[0];
type Size = Parameters<typeof button>[1];

/**
 * A link styled as a button. Internal paths use next/link; external URLs,
 * tel:, mailto: and in-page anchors render a plain <a>.
 */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  children: ReactNode;
}) {
  const cls = `${button(variant, size)} ${className}`;
  if (external || !href.startsWith("/")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
