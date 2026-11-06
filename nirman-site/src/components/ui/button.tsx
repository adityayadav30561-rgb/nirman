import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "dark" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const variants: Record<Variant, string> = {
  dark: "bg-ink-2 text-white hover:bg-brand",
  outline: "border border-ink-2/80 bg-white/70 text-ink-2 hover:border-brand hover:text-brand",
};

const sizes = {
  sm: "h-9 px-4.5 text-[0.8rem]",
  md: "h-12 px-7 text-[0.9rem]",
} as const;

export function ButtonLink({
  variant = "dark",
  size = "md",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: keyof typeof sizes }) {
  return <Link className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
