import { site } from "@/content/site";

/** Plan-view mark: walls and a doorway that read as an "n", with an orange threshold. */
export function LogoMark({ className = "size-8", tone = "ink" }: { className?: string; tone?: "ink" | "light" }) {
  const fill = tone === "light" ? "#ffffff" : "#05070c";
  const stroke = tone === "light" ? "#05070c" : "#ffffff";
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill={fill} />
      <path d="M9 24V11.5A3.5 3.5 0 0 1 12.5 8h7a3.5 3.5 0 0 1 3.5 3.5V24" fill="none" stroke={stroke} strokeWidth="3" />
      <rect x="13" y="20" width="6" height="4" rx="1" fill="#f26b2b" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className="size-8" tone={tone === "dark" ? "ink" : "light"} />
      <span className={`text-[1.3rem] leading-none font-semibold tracking-[-0.03em] ${tone === "dark" ? "text-ink" : "text-white"}`}>
        {site.name.toLowerCase()}
      </span>
    </span>
  );
}
