import Image from "next/image";

/*
 * Brand (user, 2026-11-12): the Nirman wordmark over a gold mandala, from the
 * user's logo file. Transparent PNGs in public/images/brand/: the original
 * (black wordmark) for light backgrounds, and a light version (white
 * wordmark, stronger gold) for the ink bands. The browser-tab icon is a
 * monogram made from the same logo (src/app/icon.png, favicon.ico,
 * apple-icon.png). Making them again: docs/sections/s6-brand-contact.md.
 */
export function Logo({ tone = "dark", className = "h-[2.9rem] lg:h-[3.3rem]", priority = false }: { tone?: "dark" | "light"; className?: string; priority?: boolean }) {
  return (
    <Image
      src={tone === "dark" ? "/images/brand/nirman-logo.png" : "/images/brand/nirman-logo-light.png"}
      alt=""
      width={496}
      height={330}
      priority={priority}
      sizes="10rem"
      className={`w-auto ${className}`}
    />
  );
}

/**
 * The square "n" mark of Nirman CRM, the product: its app icon in the CRM
 * screens (not the company logo). Plan view of walls and a doorway that read
 * as an "n", with an orange threshold.
 */
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
