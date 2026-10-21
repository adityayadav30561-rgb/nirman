import { Plus } from "lucide-react";
import { faqs } from "@/content/home";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** FAQ (handoff §4), followed on the page by the final CTA. Outputs FAQPage JSON-LD. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 pb-24 lg:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-site grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="display text-[clamp(2.6rem,5vw,4.4rem)] lg:sticky lg:top-28">
            Questions we get asked
          </h2>
        </div>
        <div className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[1.15rem] font-medium leading-snug [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface ring-1 ring-ink/10 transition-[transform,background-color] group-open:rotate-45 group-open:bg-ink group-open:text-paper">
                  <Plus className="size-4.5" aria-hidden />
                </span>
              </summary>
              <p className="-mt-1 max-w-[44rem] pb-6 pr-16 leading-[1.65] text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
