import type { ReactNode } from "react";

const sizes = {
  hero: "display text-[clamp(2.9rem,10.5vw,4.8rem)] lg:text-[min(5.4vw,8.5rem)]",
  section: "display text-[clamp(2.6rem,6vw,5.4rem)]",
  sub: "heading text-[clamp(1.8rem,3.4vw,2.9rem)]",
  card: "title text-[1.3rem]",
} as const;

/** Headings in the Mona Sans display voice. `level` sets the tag, `size` the look. */
export function Heading({
  level = 2,
  size = "section",
  id,
  className = "",
  children,
}: {
  level?: 1 | 2 | 3 | 4;
  size?: keyof typeof sizes;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag id={id} className={`${sizes[size]} ${className}`}>
      {children}
    </Tag>
  );
}
