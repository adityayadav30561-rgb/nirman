import type { ReactNode } from "react";

/** A small pill label with an optional colour dot (e.g. a service colour). */
export function Chip({ dot, className = "", children }: { dot?: string; className?: string; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[0.875rem] ring-1 ring-ink/8 ${className}`}>
      {dot && <span className={`size-2 rounded-full ${dot}`} aria-hidden />}
      {children}
    </span>
  );
}
