import { SeoService } from "./seo";
import { WebService } from "./web";
import { AutomationService } from "./automation";
import { SoftwareService } from "./software";
import { AppsService } from "./apps";
import { MarketingService } from "./marketing";

// Logos from Simple Icons (https://simpleicons.org), CC0. They name the
// tools we build with; they do not imply a partnership. Decision C2: no
// Meta, WhatsApp, Instagram or Facebook logos, and no ads platforms.
const stack = [
  ["nextdotjs", "Next.js"],
  ["react", "React"],
  ["nodedotjs", "Node.js"],
  ["flutter", "Flutter"],
  ["postgresql", "PostgreSQL"],
  ["figma", "Figma"],
  ["shopify", "Shopify"],
  ["wordpress", "WordPress"],
  ["googleanalytics", "Google Analytics"],
  ["razorpay", "Razorpay"],
  ["vercel", "Vercel"],
] as const;

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 pb-6">
      <div className="container-site pb-10 pt-24 lg:pb-12 lg:pt-32">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
          <h2 id="services-title" className="display text-[clamp(2.6rem,6vw,5.4rem)] lg:col-span-8">
            Six disciplines. One team building them together.
          </h2>
          <p className="text-[1.075rem] leading-[1.65] text-ink-2 lg:col-span-4">
            Most growth problems cross more than one specialism. A slow website hurts SEO; a missing CRM lets enquiries go cold. We plan
            the pieces together so each one makes the others work harder.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-y border-ink/10 py-5 sm:flex-row sm:items-center sm:gap-8">
          <p className="shrink-0 text-[0.9rem] text-ink-3">Tools we build with</p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-4" aria-label="Tools we build with">
            {stack.map(([slug, name]) => (
              <li key={slug} title={name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://cdn.simpleicons.org/${slug}/16181b`}
                  alt={name}
                  width={22}
                  height={22}
                  loading="lazy"
                  className="size-[22px] opacity-55 transition-opacity hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-[0.85rem] text-ink-3">Interfaces on this page are design mockups with sample data. Brands inside them are concepts.</p>
      </div>

      <div className="container-site grid auto-rows-fr gap-4 sm:gap-5 lg:grid-cols-2">
        <SeoService />
        <WebService />
        <AutomationService />
        <SoftwareService />
        <AppsService />
        <MarketingService />
      </div>
    </section>
  );
}
