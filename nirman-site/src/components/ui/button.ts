const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const sizes = {
  sm: "h-10 px-4.5 text-[0.9rem]",
  md: "h-12 px-6 text-[0.975rem]",
  lg: "h-14 px-7 text-[1.05rem]",
} as const;

const variants = {
  primary: "bg-ink text-paper hover:bg-cobalt",
  accent: "bg-marigold text-ink hover:bg-[#ffc457]",
  secondary: "bg-surface/70 text-ink ring-1 ring-ink/15 hover:bg-surface hover:ring-ink/35",
  light: "bg-surface text-ink hover:bg-paper",
  ghostLight: "text-white ring-1 ring-white/35 hover:bg-white/10 hover:ring-white/70",
} as const;

export function button(variant: keyof typeof variants = "primary", size: keyof typeof sizes = "md") {
  return `${base} ${sizes[size]} ${variants[variant]}`;
}
