import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { PillarId } from "@/content/home";
import { breadcrumbTrail, pageByPath } from "@/content/pages";
import { site } from "@/content/site";
import {
  engagementModels,
  pillarChildren,
  pillarHub,
  serviceByPath,
  type Service,
  type ServiceContent,
  type ServiceVisual,
} from "@/content/services";
import { serviceLd } from "@/lib/seo";
import { JsonLd } from "./json-ld";
import { Faq } from "./faq";
import { StubPage } from "./stub-page";
import { Breadcrumbs } from "./ui/breadcrumbs";
import { ButtonLink } from "./ui/button-link";
import { SeoVisual } from "./services/seo";
import { WebVisual } from "./services/web";
import { AutomationVisual } from "./services/automation";
import { SoftwareVisual } from "./services/software";
import { AppsVisual } from "./services/apps";
import { MarketingVisual } from "./services/marketing";

// Pillar accents (DESIGN.md: SEO cobalt, Web coral, Software peacock,
// Marketing rose).
const accents: Record<PillarId, { dot: string; text: string; soft: string; check: string }> = {
  seo: { dot: "bg-cobalt", text: "text-cobalt", soft: "bg-cobalt-soft", check: "bg-cobalt text-white" },
  web: { dot: "bg-coral", text: "text-coral-2", soft: "bg-coral-soft", check: "bg-coral text-white" },
  software: { dot: "bg-peacock", text: "text-peacock", soft: "bg-peacock-soft", check: "bg-peacock text-white" },
  marketing: { dot: "bg-[#d9668f]", text: "text-[#b23f69]", soft: "bg-[#f8dde6]", check: "bg-[#d9668f] text-white" },
};

// The homepage card mockup and its panel colour, reused as the hero visual.
const visuals: Record<ServiceVisual, { panel: string; dots?: boolean; render: () => ReactNode }> = {
  seo: { panel: "bg-cobalt", dots: true, render: SeoVisual },
  web: { panel: "bg-coral-soft", render: WebVisual },
  automation: { panel: "bg-mint-soft", render: AutomationVisual },
  software: { panel: "bg-ink", render: SoftwareVisual },
  apps: { panel: "bg-marigold", render: AppsVisual },
  marketing: { panel: "bg-[#f8dde6]", render: MarketingVisual },
};

/**
 * Equal-size blocks in a 6-column grid (DESIGN.md): rows of three, with the
 * first one or two rows in pairs so no row is left with an orphan.
 */
function span(i: number, n: number) {
  const pairs = n % 3 === 0 ? 0 : n % 3 === 2 ? 2 : 4;
  return i < pairs ? "lg:col-span-3" : "lg:col-span-2";
}

/**
 * Service page template (handoff §5). Hubs show their child services in
 * place of deliverables. Until a page's content is written it renders the stub.
 */
export function ServicePage({ path }: { path: string }) {
  const service = serviceByPath(path);
  const page = pageByPath(path);
  if (!service || !page) throw new Error(`ServicePage: ${path} is not a registered service`);
  if (!service.content) return <StubPage path={path} />;

  const c = service.content;
  const a = accents[service.pillar];

  return (
    <>
      <JsonLd data={serviceLd({ name: page.title, description: page.description, path, serviceType: service.serviceType })} />
      <Hero service={service} title={page.title} content={c} />
      <Audience content={c} accent={a} />
      {service.kind === "hub" ? <Children service={service} /> : <Deliverables content={c} accent={a} />}
      <Process content={c} accent={a} />
      <ResultsAndStack content={c} accent={a} />
      <Engagement content={c} accent={a} />
      <Faq items={c.faqs} />
      <Related service={service} />
      <QuoteBand />
    </>
  );
}

function Hero({ service, title, content }: { service: Service; title: string; content: ServiceContent }) {
  const hub = pillarHub(service.pillar)!;
  const a = accents[service.pillar];
  const v = visuals[service.visual];
  const Visual = v.render;
  // Handoff §5: Get a quote / Free audit. The audit only fits SEO and web work.
  const second =
    service.pillar === "seo" || service.pillar === "web"
      ? { label: "Free SEO audit", href: "/tools/seo-audit/" }
      : { label: "Book a call", href: site.bookingUrl };

  return (
    <section aria-labelledby="service-title" className="pb-16 pt-28 lg:pb-24 lg:pt-36">
      <div className="container-site">
        <Breadcrumbs items={breadcrumbTrail(service.path)} />
        <div className="mt-8 grid gap-x-12 gap-y-10 lg:mt-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink-2">
              <span className={`size-2.5 rounded-full ${a.dot}`} aria-hidden />
              {service.kind === "hub" ? (
                `${hub.name} services`
              ) : (
                <>
                  Part of{" "}
                  <Link href={hub.path} className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                    {pageByPath(hub.path)!.title}
                  </Link>
                </>
              )}
            </p>
            <h1 id="service-title" className="display mt-5 text-[clamp(2.6rem,7vw,4.4rem)] lg:text-[min(4.4vw,6.5rem)]">
              {title}
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-[1.6] text-ink-2 lg:text-[1.2rem]">{content.outcome}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/get-a-quote/" size="lg">
                Get a quote
              </ButtonLink>
              <ButtonLink href={second.href} variant="secondary" size="lg">
                {second.label}
              </ButtonLink>
            </div>
          </div>
          {/* The mockup sits at the top and may bleed off the panel's bottom edge, as on the homepage cards. */}
          <div
            className={`relative min-h-[72vw] overflow-hidden rounded-[2rem] sm:min-h-[52vw] lg:col-span-7 lg:min-h-[34vw] lg:rounded-[2.5rem] ${v.panel}`}
          >
            {v.dots && <div className="dot-grid-light absolute inset-0" aria-hidden />}
            <div className="absolute inset-x-6 top-8 sm:inset-x-10 sm:top-10 lg:inset-x-12 lg:top-12">
              <Visual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Accent = (typeof accents)[PillarId];

function Audience({ content, accent }: { content: ServiceContent; accent: Accent }) {
  return (
    <section aria-labelledby="audience-title" className="pb-20 lg:pb-28">
      <div className="container-site grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="audience-title" className="heading text-[clamp(1.8rem,3.4vw,2.9rem)]">
            Who it&rsquo;s for
          </h2>
          <ul className="mt-6 space-y-3">
            {content.audience.map((x) => (
              <li key={x} className="flex items-start gap-3 text-[1.05rem] leading-snug">
                <span className={`mt-1.5 size-2 shrink-0 rounded-full ${accent.dot}`} aria-hidden />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className={`rounded-[2rem] p-7 sm:p-10 lg:col-span-7 ${accent.soft}`}>
          <h2 className="heading text-[clamp(1.6rem,2.6vw,2.2rem)]">What changes</h2>
          <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {content.changes.map((x) => (
              <li key={x} className="flex items-start gap-3 leading-snug">
                <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${accent.check}`}>
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Deliverables({ content, accent }: { content: ServiceContent; accent: Accent }) {
  const n = content.deliverables.length;
  return (
    <section aria-labelledby="included-title" className="pb-20 lg:pb-28">
      <div className="container-site">
        <h2 id="included-title" className="display text-[clamp(2.4rem,5vw,4.4rem)]">
          What&rsquo;s included
        </h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {content.deliverables.map((d, i) => (
            <li key={d.title} className={`rounded-[1.75rem] bg-surface p-7 shadow-panel ${span(i, n)}`}>
              <span className={`title text-[0.95rem] tnum ${accent.text}`}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="title mt-3 text-[1.3rem]">{d.title}</h3>
              <p className="mt-3 leading-[1.6] text-ink-2">{d.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Hub variant: one card per child service in place of deliverables. */
function Children({ service }: { service: Service }) {
  const children = pillarChildren(service.pillar);
  const a = accents[service.pillar];
  return (
    <section aria-labelledby="children-title" className="pb-20 lg:pb-28">
      <div className="container-site">
        <h2 id="children-title" className="display text-[clamp(2.4rem,5vw,4.4rem)]">
          {service.name} services
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {children.map((child, i) => (
            <li key={child.path} className={span(i, children.length)}>
              <Link
                href={child.path}
                className={`group flex h-full flex-col rounded-[1.75rem] p-7 transition-colors sm:p-8 ${a.soft} hover:bg-surface hover:shadow-panel`}
              >
                <h3 className="heading text-[clamp(1.5rem,2vw,2rem)]">{pageByPath(child.path)!.title}</h3>
                <p className="mt-3 flex-1 leading-[1.6] text-ink-2">
                  {child.content?.outcome ?? pageByPath(child.path)!.description}
                </p>
                <span className={`mt-6 inline-flex items-center gap-2 font-medium ${a.text}`}>
                  See the service
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process({ content, accent }: { content: ServiceContent; accent: Accent }) {
  return (
    <section aria-labelledby="process-title" className="bg-lilac-soft py-20 lg:py-28">
      <div className="container-site">
        <h2 id="process-title" className="display text-[clamp(2.4rem,5vw,4.4rem)]">
          How it works
        </h2>
        <ol className="mt-10 grid gap-4 lg:auto-cols-fr lg:grid-flow-col">
          {content.process.map((s, i) => (
            <li key={s.title} className="rounded-[1.75rem] bg-surface p-7">
              <div className="flex items-center justify-between gap-3">
                <span className={`grid size-9 place-items-center rounded-full title text-[0.95rem] tnum ${accent.check}`}>{i + 1}</span>
                <span className="rounded-full bg-paper px-3 py-1 text-[0.85rem] text-ink-2">{s.duration}</span>
              </div>
              <h3 className="title mt-5 text-[1.25rem]">{s.title}</h3>
              <p className="mt-2.5 leading-[1.6] text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ResultsAndStack({ content, accent }: { content: ServiceContent; accent: Accent }) {
  return (
    <section aria-labelledby="results-title" className="py-20 lg:py-28">
      <div className="container-site grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="results-title" className="heading text-[clamp(1.8rem,3.4vw,2.9rem)]">
            Results
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.results.map((r) => (
              <li key={r.label} className={`relative rounded-[1.75rem] p-7 ${accent.soft}`}>
                {r.sample && (
                  <span className="absolute right-5 top-5 rounded-full bg-surface px-2.5 py-1 text-[0.75rem] font-medium uppercase tracking-wide text-ink-2">
                    Sample
                  </span>
                )}
                <p className={`display text-[clamp(2.6rem,4vw,3.6rem)] tnum ${accent.text}`}>{r.metric}</p>
                <p className="mt-2 font-medium">{r.label}</p>
                <p className="mt-2 text-[0.95rem] leading-[1.55] text-ink-2">{r.context}</p>
              </li>
            ))}
          </ul>
          {content.results.some((r) => r.sample) && (
            <p className="mt-4 text-[0.875rem] text-ink-3">Sample figures show the kind of result we report. Real client results replace them soon.</p>
          )}
        </div>
        <div className="lg:col-span-5">
          <h2 className="heading text-[clamp(1.8rem,3.4vw,2.9rem)]">Platforms and tools</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {content.stack.map((t) => (
              <li key={t} className="rounded-full bg-surface px-4 py-2 text-[0.95rem] ring-1 ring-ink/10">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Engagement({ content, accent }: { content: ServiceContent; accent: Accent }) {
  return (
    <section aria-labelledby="engagement-title" className="pb-20 lg:pb-28">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
          <h2 id="engagement-title" className="display text-[clamp(2.4rem,5vw,4.4rem)] lg:col-span-7">
            Ways to work with us
          </h2>
          <p className="max-w-[34rem] text-[1.05rem] leading-[1.6] text-ink-2 lg:col-span-5">
            We quote every project after a short call, because scope varies too much for a price list. Here is how we can
            work together, and what moves the quote.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-none lg:auto-cols-fr lg:grid-flow-col">
            {content.engagement.map((e) => (
              <li key={e.model} className="flex flex-col rounded-[1.75rem] bg-surface p-7 shadow-panel">
                <h3 className="title text-[1.3rem]">{engagementModels[e.model].name}</h3>
                <p className="mt-3 leading-[1.6] text-ink-2">{engagementModels[e.model].body}</p>
                <p className={`mt-5 border-t border-ink/10 pt-4 text-[0.95rem] leading-[1.55] ${accent.text}`}>{e.fit}</p>
              </li>
            ))}
          </ul>
          <div className="rounded-[1.75rem] bg-ink p-7 text-paper lg:col-span-4">
            <h3 className="title text-[1.3rem]">What affects cost</h3>
            <ul className="mt-4 space-y-3">
              {content.costFactors.map((f) => (
                <li key={f} className="flex items-start gap-3 leading-snug text-white/80">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-marigold" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <ButtonLink href="/get-a-quote/" variant="accent" className="mt-7">
              Get a quote
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Related({ service }: { service: Service }) {
  const links = [
    ...service.related.map((p) => ({ path: p, kind: "Service" })),
    ...service.tools.map((p) => ({ path: p, kind: "Free tool" })),
  ];
  return (
    <section aria-labelledby="related-title" className="pb-20 lg:pb-28">
      <div className="container-site">
        <h2 id="related-title" className="heading text-[clamp(1.8rem,3.4vw,2.9rem)]">
          Related services and tools
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map(({ path, kind }) => {
            const page = pageByPath(path)!;
            return (
              <li key={path}>
                <Link href={path} className="group flex h-full flex-col rounded-[1.5rem] bg-paper-2 p-6 transition-colors hover:bg-surface hover:shadow-panel">
                  <span className="text-[0.85rem] text-ink-3">{kind}</span>
                  <span className="title mt-2 flex items-start justify-between gap-3 text-[1.15rem]">
                    {page.title}
                    <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                  <span className="mt-2 text-[0.95rem] leading-[1.55] text-ink-2">{page.description}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Closing call to action. P4.7 replaces it with the short quote form. */
function QuoteBand() {
  return (
    <section aria-labelledby="quote-title" className="pb-24 lg:pb-32">
      <div className="container-site">
        <div className="grid gap-8 rounded-[2rem] bg-coral p-8 text-ink sm:p-12 lg:grid-cols-12 lg:items-end lg:rounded-[2.5rem] lg:p-16">
          <div className="lg:col-span-8">
            <h2 id="quote-title" className="display text-[clamp(2.4rem,5vw,4.4rem)]">
              Tell us what you need
            </h2>
            <p className="mt-4 max-w-[38rem] text-[1.1rem] leading-[1.6] text-ink/80">
              Share a few details about your project. We reply within 2 working hours (IST) and send a written quote after
              a short call.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <ButtonLink href="/get-a-quote/" size="lg">
              Get a quote
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="light" size="lg">
              Email us
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
