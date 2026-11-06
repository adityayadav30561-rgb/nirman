import type { SampleQuote } from "@/content/results";

/** Borderless quote, as in the reference: quote mark, text, divider, who. Always shows a SAMPLE chip. */
export function QuoteCard({ q, size = "md" }: { q: SampleQuote; size?: "md" | "lg" }) {
  return (
    <figure className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <svg viewBox="0 0 32 24" aria-hidden className={size === "lg" ? "h-8 w-10 text-brand" : "h-5 w-7 text-brand"} fill="currentColor">
          <path d="M0 24V14C0 6.3 4.3 1.6 12 0l1.4 3.6C9 5 7 7.8 6.8 11H12v13H0Zm19 0V14c0-7.7 4.3-12.4 12-14l1 3.6c-4.4 1.4-6.4 4.2-6.6 7.4H31v13H19Z" />
        </svg>
        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider text-accent">SAMPLE</span>
      </div>
      <blockquote
        className={`mt-4 grow text-ink ${size === "lg" ? "text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.45] font-medium" : "text-[0.92rem] leading-[1.65]"}`}
      >
        “{q.quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span className={`grid size-10 shrink-0 place-items-center rounded-full text-[0.75rem] font-semibold ${q.tone}`} aria-hidden>
          {q.initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.85rem] font-semibold text-ink">
            {q.who}, {q.place}
          </span>
          <span className="block truncate text-[0.72rem] text-muted">{q.tags.join(" · ")}</span>
        </span>
      </figcaption>
    </figure>
  );
}
