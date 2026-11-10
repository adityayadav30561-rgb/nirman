import type { ReactNode } from "react";

/** Heading block shared by Selected work and Results: spark, h2, line, and the section's buttons on the right. */
export function ProofHead({ id, title, line, children }: { id: string; title: string; line: string; children?: ReactNode }) {
  return (
    <div className="p-head flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-[36rem]">
        <svg viewBox="0 0 24 24" aria-hidden className="p-spark draw mb-2 size-6 text-[#ea580c]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path pathLength={1} d="M5 9 L10 14" />
          <path pathLength={1} d="M12 4 L13 12" />
        </svg>
        <h2 id={id} className="p-title text-[clamp(1.7rem,2.8vw,2.5rem)] leading-[1.25] font-semibold tracking-[-0.02em] text-ink">{title}</h2>
        <p className="p-sub mt-3 text-[0.95rem] leading-[1.7] text-muted">{line}</p>
      </div>
      {children && <div className="p-sub flex shrink-0 flex-wrap gap-2">{children}</div>}
    </div>
  );
}
