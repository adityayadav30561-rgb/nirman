import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { PillarId } from "@/content/home";
import { breadcrumbTrail, pageByPath } from "@/content/pages";
import { site } from "@/content/site";
import { toolLogos } from "@/content/tool-logos";
import { pillarChildren, serviceByPath, type Service, type ServiceContent, type ServiceVisual } from "@/content/services";
import { serviceLd } from "@/lib/seo";
import { JsonLd } from "./json-ld";
import { Faq } from "./faq";
import { Photo } from "./photo";
import { StubPage } from "./stub-page";
import { Artefact } from "./service-art";
import { ServiceAudience } from "./service-audience";
import { ServiceProcess } from "./service-process";
import { ServiceReports } from "./service-reports";
import { QuoteSection } from "./quote-section";
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
const accents: Record<PillarId, { dot: string; bar: string; text: string; soft: string; check: string }> = {
  seo: { dot: "bg-cobalt", bar: "bg-cobalt", text: "text-cobalt", soft: "bg-cobalt-soft", check: "bg-cobalt text-white" },
  web: { dot: "bg-coral", bar: "bg-coral", text: "text-coral-2", soft: "bg-coral-soft", check: "bg-coral text-white" },
  software: { dot: "bg-peacock", bar: "bg-peacock", text: "text-peacock", soft: "bg-peacock-soft", check: "bg-peacock text-white" },
  marketing: { dot: "bg-[#d9668f]", bar: "bg-[#d9668f]", text: "text-[#b23f69]", soft: "bg-[#f8dde6]", check: "bg-[#d9668f] text-white" },
};

type Accent = (typeof accents)[PillarId];

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
 * Service page template (handoff §5, redesigned 2026-10-21). Hubs show their
 * child services in place of deliverables. Until a page's content is written
 * it renders the stub.
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
      <ServiceAudience segments={c.segments} accent={a} />
      {service.kind === "hub" ? <Children service={service} /> : <Deliverables content={c} accent={a} />}
      <ServiceProcess
        check={a.check}
        steps={c.process.map((s) => ({ ...s, visual: <StepVisual photo={s.photo} art={s.art} /> }))}
      />
      <ServiceReports
        accent={a}
        reports={c.reports.map((r) => ({ ...r, visual: <Artefact id={r.art} /> }))}
        footer={<ResultsAndTools content={c} accent={a} />}
      />
      <Faq items={c.faqs} />
      <QuoteSection service={page.title} path={path} />
    </>
  );
}

function Hero({ service, title, content }: { service: Service; title: string; content: ServiceContent }) {
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
            {/* No label above the H1: the breadcrumb and the title already name the page. */}
            <h1 id="service-title" className="display text-[clamp(2.6rem,7vw,4.4rem)] lg:text-[min(4.4vw,6.5rem)]">
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
            className={`relative min-h-[72vw] overflow-hidden rounded-[2rem] sm:min-h-[52vw] lg:col-span-7 lg:min-h-[min(34vw,33rem)] lg:rounded-[2.5rem] ${v.panel}`}
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

/** A process step's picture: the photo, with a mockup of what the step produces on top. */
function StepVisual({ photo, art }: { photo: ServiceContent["process"][number]["photo"]; art: ServiceContent["process"][number]["art"] }) {
  return (
    <div className="absolute inset-0">
      <Photo name={photo} sizes="(min-width: 1024px) 55vw, 90vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent" aria-hidden />
      <div className="absolute inset-x-5 bottom-5 sm:inset-x-auto sm:right-6 sm:w-[72%] lg:bottom-8 lg:right-8 lg:w-[78%]">
        <Artefact id={art} />
      </div>
    </div>
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

/** Hub variant: one photo card per child service in place of deliverables. */
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
          {children.map((child, i) => {
            const page = pageByPath(child.path)!;
            return (
              <li key={child.path} className={span(i, children.length)}>
                <Link
                  href={child.path}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-surface shadow-panel transition-shadow hover:shadow-lift"
                >
                  {/* A mockup of the service itself, bleeding off the panel's bottom edge as on the homepage cards. */}
                  <div className={`relative aspect-[16/10] overflow-hidden ${a.soft}`}>
                    {child.card && (
                      <div className="absolute inset-x-6 top-6 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 motion-reduce:transition-none sm:inset-x-8 sm:top-8">
                        <Artefact id={child.card.art} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <h3 className="heading text-[clamp(1.5rem,2vw,2rem)] leading-tight">{page.title}</h3>
                    <p className="mt-3 flex-1 leading-[1.6] text-ink-2">{child.content?.outcome ?? page.description}</p>
                    <span className={`mt-6 inline-flex items-center gap-2 font-medium ${a.text}`}>
                      See the service
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Under the reports: sample results, then the tools we use with their logos. */
function ResultsAndTools({ content, accent }: { content: ServiceContent; accent: Accent }) {
  return (
    <div className="mt-16 grid gap-x-12 gap-y-12 lg:mt-20 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <h3 className="heading text-[clamp(1.6rem,2.6vw,2.2rem)]">Results</h3>
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
        <p className="mt-4 text-[0.875rem] text-ink-3">
          Reports and results on this page are design mockups with sample data. Real client results replace them soon.
        </p>
      </div>
      <div className="lg:col-span-6">
        <h3 className="heading text-[clamp(1.6rem,2.6vw,2.2rem)]">Tools we use</h3>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {content.stack.map((t) => (
            <li key={t} className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 shadow-panel">
              <ToolLogo name={t} />
              <span className="text-[0.95rem] leading-tight">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ToolLogo({ name }: { name: string }) {
  const slug = toolLogos[name];
  if (!slug) {
    return (
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-paper-2 text-[0.85rem] font-semibold text-ink-2" aria-hidden>
        {name.replace(/[^A-Za-z0-9]/g, "").slice(0, 1)}
      </span>
    );
  }
  return (
    <span className="grid size-8 shrink-0 place-items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://cdn.simpleicons.org/${slug}`} alt="" width={24} height={24} loading="lazy" className="size-6" />
    </span>
  );
}
