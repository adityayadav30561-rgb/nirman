import { site } from "@/content/site";
import { QuoteForm } from "./quote-form";
import { ButtonLink } from "./ui/button-link";

// Handoff §5 "what happens next" (get-a-quote side panel).
const nextSteps = [
  ["We reply within 2 working hours", "A real person reads your enquiry, during Indian working hours."],
  ["A short discovery call", "A free 15-minute call to understand your goals, at a time that suits you."],
  ["A written proposal in 48 hours", "Scope, timeline and how we would work together. No obligation."],
];

/** Closing section: what happens next, and the short quote form (P4.7). */
export function QuoteSection({
  service,
  path,
  title = "Tell us what you need",
  intro = "Share a few details and we’ll come back with questions, ideas and a written quote.",
}: {
  service: string;
  path: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section id="quote" aria-labelledby="quote-title" className="scroll-mt-24 pb-24 lg:pb-32">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-10 rounded-[2rem] bg-coral p-6 text-ink sm:p-10 lg:grid-cols-12 lg:rounded-[2.5rem] lg:p-14">
          <div className="lg:col-span-5 lg:py-4">
            <h2 id="quote-title" className="display text-[clamp(2.4rem,5vw,4.4rem)]">
              {title}
            </h2>
            <p className="mt-4 max-w-[30rem] text-[1.1rem] leading-[1.6] text-ink/80">{intro}</p>
            <ol className="mt-8 space-y-5">
              {nextSteps.map(([t, b], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink title text-[0.95rem] text-paper tnum">{i + 1}</span>
                  <span>
                    <span className="block font-medium">{t}</span>
                    <span className="mt-0.5 block text-[0.95rem] leading-[1.55] text-ink/75">{b}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-[0.95rem] text-ink/80">Prefer to talk first?</span>
              <ButtonLink href={site.bookingUrl} variant="light" size="sm">
                Book a call
              </ButtonLink>
              <ButtonLink href={`mailto:${site.email}`} variant="light" size="sm">
                Email us
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <QuoteForm service={service} source={path} />
          </div>
        </div>
      </div>
    </section>
  );
}
