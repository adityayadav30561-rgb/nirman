import type { ReactNode } from "react";

const tones = {
  surface: "bg-surface text-ink shadow-panel",
  paper: "bg-paper-2 text-ink",
  cobalt: "bg-cobalt text-white",
  coral: "bg-coral-soft text-ink",
  mint: "bg-mint-soft text-ink",
  marigold: "bg-marigold text-ink",
  rose: "bg-[#f8dde6] text-ink",
  ink: "bg-ink text-paper",
  forest: "bg-forest-deep text-paper",
} as const;

export type CardTone = keyof typeof tones;

/** A rounded colour block. Use the service colours from DESIGN.md. */
export function Card({
  tone = "surface",
  as: Tag = "div",
  className = "",
  children,
}: {
  tone?: CardTone;
  as?: "div" | "article" | "li";
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`relative overflow-hidden rounded-[2rem] ${tones[tone]} ${className}`}>{children}</Tag>;
}
