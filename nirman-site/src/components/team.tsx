import { CircleCheck, Clock3, Compass, LifeBuoy, MessageSquareText, Paperclip, PenTool, Ruler, Wrench } from "lucide-react";
import { Stage } from "./stage";
import { Photo } from "./photo";
import { team } from "@/content/home";

const avatarTones = ["bg-cobalt text-white", "bg-coral text-white", "bg-peacock text-white", "bg-marigold text-ink"];

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

const reasons = [
  { icon: Compass, c: "bg-cobalt text-white", t: "Business goals first", d: "Every recommendation starts from what you need more of: enquiries, sales, time back. Technology follows." },
  { icon: PenTool, c: "bg-coral text-white", t: "Design with a reason", d: "Layouts, words and visuals are chosen to help your customers decide, not to follow trends." },
  { icon: Wrench, c: "bg-peacock text-white", t: "Practical technology", d: "Proven tools your team can run, priced for your stage, with no lock-in to us." },
  { icon: MessageSquareText, c: "bg-marigold text-ink", t: "Clear communication", d: "One point of contact, a weekly written update, and decisions documented where you can find them." },
  { icon: Ruler, c: "bg-lilac text-ink", t: "Built for your requirements", d: "We scope from your actual processes and constraints rather than squeezing you into a template." },
  { icon: LifeBuoy, c: "bg-forest text-mint", t: "Here after launch", d: "Support, monitoring and monthly improvements, so the work keeps paying off after go-live." },
];

/**
 * Team (handoff §4, decision C9): the people, then what working with them is
 * like. Names and roles are SAMPLE placeholders until the real team is
 * supplied; avatars stay initials until real photos exist.
 */
export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="scroll-mt-20 py-24 lg:py-32">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
          <h2 id="team-title" className="display text-[clamp(2.6rem,6vw,5.4rem)] lg:col-span-8">
            Meet the team
          </h2>
          <p className="leading-[1.65] text-ink-2 lg:col-span-4">
            The people who will answer your call, write your code and send your reports. You talk to them directly, not
            through a salesperson.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-dashed border-ink/30 px-3 py-1 text-[0.8rem] font-medium text-ink-2">
            Sample team
          </span>
          <span className="text-[0.85rem] text-ink-3">Placeholder names and roles. Real people and photos coming soon.</span>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {team.map((p, i) => (
            <li key={p.name} className="flex flex-col items-start gap-4 rounded-[1.75rem] bg-surface p-5 shadow-panel sm:p-6">
              <span
                className={`grid size-14 place-items-center rounded-full text-[1.05rem] font-semibold tracking-[0.02em] ring-4 ring-paper sm:size-16 ${avatarTones[i % avatarTones.length]}`}
                aria-hidden
              >
                {initials(p.name)}
              </span>
              <span>
                <span className="title block text-[1.1rem] leading-tight">{p.name}</span>
                <span className="mt-1 block text-[0.9rem] text-ink-2">{p.role}</span>
              </span>
            </li>
          ))}
        </ul>

        <h3 className="heading mt-24 text-[clamp(1.9rem,3.6vw,3.2rem)] lg:mt-32">What working with us is like.</h3>
        <p className="mt-4 max-w-[38rem] leading-[1.65] text-ink-2">
          You should always know what we&apos;re doing and why. Here is an example of the weekly written update we share
          during a project.
        </p>

        <div className="mt-12 grid gap-x-12 gap-y-14 lg:grid-cols-12">
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
                  <h4 className="title mt-4 text-[1.3rem]">{r.t}</h4>
                  <p className="mt-2 leading-[1.6] text-ink-2">{r.d}</p>
                </li>
              ))}
            </ul>
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
