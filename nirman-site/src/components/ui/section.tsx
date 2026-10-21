import type { ReactNode } from "react";

const tones = {
  paper: "bg-paper text-ink",
  surface: "bg-surface text-ink",
  lilac: "bg-lilac-soft text-ink",
  mint: "bg-mint-soft text-ink",
  ink: "bg-ink text-paper",
  forest: "bg-forest-deep text-paper",
} as const;

const spacing = {
  none: "",
  md: "py-16 lg:py-20",
  lg: "py-24 lg:py-32",
} as const;

/**
 * A full-width page band. Pass `labelledBy` with the id of its heading so the
 * region is named for screen readers.
 */
export function Section({
  id,
  tone = "paper",
  space = "lg",
  labelledBy,
  className = "",
  children,
}: {
  id?: string;
  tone?: keyof typeof tones;
  space?: keyof typeof spacing;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`scroll-mt-20 ${tones[tone]} ${spacing[space]} ${className}`}>
      {children}
    </section>
  );
}
