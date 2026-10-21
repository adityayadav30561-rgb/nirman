import { Quote } from "lucide-react";
import { testimonials } from "@/content/home";

const tones = ["bg-peacock text-white", "bg-surface text-ink", "bg-lilac-soft text-ink"];

/**
 * Testimonials (handoff §4). Every quote is a SAMPLE until real, approved
 * quotes are supplied; the section says so on the page.
 */
export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="quotes-title" className="scroll-mt-20 py-24 lg:py-32">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
          <h2 id="quotes-title" className="display text-[clamp(2.6rem,6vw,5.4rem)] lg:col-span-8">
            What clients say
          </h2>
          <div className="lg:col-span-4">
            <span className="inline-flex items-center rounded-full border border-dashed border-ink/30 px-3 py-1 text-[0.8rem] font-medium text-ink-2">
              Sample quotes
            </span>
            <p className="mt-3 leading-[1.65] text-ink-2">
              These show where client quotes will go. They are placeholders, not words from real clients.
            </p>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const dark = i === 0;
            return (
              <li key={t.quote}>
                <figure className={`flex h-full flex-col rounded-[2rem] p-7 shadow-panel sm:p-8 ${tones[i % tones.length]}`}>
                  <Quote className={`size-7 ${dark ? "text-mint" : "text-peacock"}`} strokeWidth={1.8} aria-hidden />
                  <blockquote className="heading mt-5 flex-1 text-[clamp(1.35rem,2vw,1.7rem)] leading-[1.3]">{t.quote}</blockquote>
                  <figcaption className={`mt-8 flex items-center gap-3 text-[0.95rem] ${dark ? "text-white/75" : "text-ink-2"}`}>
                    <span className={`size-11 shrink-0 rounded-full border-2 border-dashed ${dark ? "border-white/35" : "border-ink/25"}`} aria-hidden />
                    <span>
                      <span className={`block font-medium ${dark ? "text-white" : "text-ink"}`}>{t.name}</span>
                      {t.role}
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        <div className="mt-10">
          <p className="text-[0.85rem] text-ink-3">Client logos, once approved for use</p>
          <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {Array.from({ length: 6 }, (_, i) => (
              <li key={i} className="grid h-14 place-items-center rounded-2xl border-2 border-dashed border-ink/15 text-[0.75rem] text-ink-3">
                Logo
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
