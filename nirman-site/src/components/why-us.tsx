import { CircleCheck, Clock3, Compass, Handshake, LifeBuoy, MessageSquareText, Paperclip, PenTool, Ruler, Wrench } from "lucide-react";
import { Stage } from "./stage";
import { Photo } from "./photo";

const reasons = [
  { icon: Compass, c: "bg-cobalt text-white", t: "Business goals first", d: "Every recommendation starts from what you need more of: enquiries, sales, time back. Technology follows." },
  { icon: PenTool, c: "bg-coral text-white", t: "Design with a reason", d: "Layouts, words and visuals are chosen to help your customers decide, not to follow trends." },
  { icon: Wrench, c: "bg-peacock text-white", t: "Practical technology", d: "Proven tools your team can run, priced for your stage, with no lock-in to us." },
  { icon: MessageSquareText, c: "bg-marigold text-ink", t: "Clear communication", d: "One point of contact, a weekly written update, and decisions documented where you can find them." },
  { icon: Ruler, c: "bg-lilac text-ink", t: "Built for your requirements", d: "We scope from your actual processes and constraints rather than squeezing you into a template." },
  { icon: LifeBuoy, c: "bg-forest text-mint", t: "Here after launch", d: "Support, monitoring and monthly improvements, so the work keeps paying off after go-live." },
];

export function WhyUs() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 py-24 lg:py-32">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
          <h2 id="about-title" className="display text-[clamp(2.6rem,6vw,5.4rem)] lg:col-span-8">
            What working with us is like.
          </h2>
          <p className="leading-[1.65] text-ink-2 lg:col-span-4">
            You should always know what we&apos;re doing, why, and what it&apos;s costing. Here is an example of the weekly
            written update we share during a project.
          </p>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <div className="relative h-[22rem] overflow-hidden rounded-[2.5rem] sm:h-[30rem] lg:h-[40rem]">
              <Photo name="laptopTeam" sizes="(min-width: 1024px) 45vw, 100vw" position="50% 40%" />
            </div>
            <div className="relative z-10 mx-3 -mt-24 sm:mx-auto sm:-mt-40 sm:w-[78%] lg:absolute lg:-bottom-10 lg:-right-8 lg:mx-0 lg:mt-0 lg:w-[64%]">
              <Stage w={420} h={430} label="A sample weekly project update with completed work, next steps and a decision needed">
                <WeeklyUpdate />
              </Stage>
            </div>
          </div>

          <div className="lg:col-span-6">
            <ul className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {reasons.map((r) => (
                <li key={r.t}>
                  <span className={`grid size-12 place-items-center rounded-2xl ${r.c}`}>
                    <r.icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="title mt-4 text-[1.3rem]">{r.t}</h3>
                  <p className="mt-2 leading-[1.6] text-ink-2">{r.d}</p>
                </li>
              ))}
            </ul>

            {/* Social proof placeholders: replace with genuine material only. */}
            <figure className="mt-12 rounded-[2rem] border-2 border-dashed border-peacock/35 bg-peacock-soft/60 p-6 sm:p-8">
              <p className="inline-flex items-center gap-2 text-[0.85rem] font-medium text-peacock">
                <Handshake className="size-4" />
                Client testimonial placeholder
              </p>
              <blockquote className="heading mt-4 text-[clamp(1.4rem,2.4vw,1.9rem)] text-ink/40">
                Add a short, genuine quote from a client describing a specific result or experience.
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-[0.95rem] text-ink-3">
                <span className="size-10 rounded-full border-2 border-dashed border-ink/25" />
                Name, role, company
              </figcaption>
            </figure>
            <div className="mt-6">
              <p className="text-[0.85rem] text-ink-3">Client and partner logos, once approved for use</p>
              <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {Array.from({ length: 6 }, (_, i) => (
                  <li key={i} className="grid h-14 place-items-center rounded-2xl border-2 border-dashed border-ink/15 text-[0.75rem] text-ink-3">
                    Logo
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WeeklyUpdate() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl bg-surface shadow-scene">
      <div className="bg-ink px-20 py-14 text-white">
        <div className="flex items-center justify-between fs-10 text-white/60">
          <span>Weekly update</span>
          <span className="flex items-center gap-4">
            <Clock3 className="size-10" />
            Friday, 5:30 pm
          </span>
        </div>
        <p className="mock-display mt-6 fs-20">Week 6: website rebuild</p>
        <div className="mt-10 flex items-center gap-8">
          <div className="h-6 flex-1 rounded-full bg-white/15">
            <div className="h-full w-[62%] rounded-full bg-marigold" />
          </div>
          <span className="fs-10 text-white/75 tnum">62%, on schedule</span>
        </div>
      </div>
      <div className="space-y-14 px-20 py-14">
        <div>
          <p className="fs-11 font-semibold">Done this week</p>
          <ul className="mt-6 space-y-5 fs-11 text-ink-2">
            {["Project pages built and connected to the CMS", "Enquiry form now creates leads in your CRM", "Page speed checks passing on mobile"].map((t) => (
              <li key={t} className="flex gap-6">
                <CircleCheck className="mt-1 size-11 shrink-0 text-forest-2" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="fs-11 font-semibold">Next week</p>
          <ul className="mt-6 list-disc space-y-4 pl-16 fs-11 text-ink-2 marker:text-ink-3">
            <li>Journal and blog templates</li>
            <li>Content migration from the old site</li>
          </ul>
        </div>
        <div className="rounded-xl bg-marigold-soft p-12">
          <p className="flex items-center gap-6 fs-11 font-semibold text-[#7a5200]">
            <MessageSquareText className="size-12" />
            Decision needed from you
          </p>
          <p className="mt-4 fs-11 leading-snug text-[#7a5200]/90">Approve the two homepage photo options by Tuesday so content entry can start.</p>
          <p className="mt-8 flex items-center gap-4 fs-10 text-[#7a5200]/80">
            <Paperclip className="size-10" />
            homepage-options.pdf
          </p>
        </div>
      </div>
    </div>
  );
}
