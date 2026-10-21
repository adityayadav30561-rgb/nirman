import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { companyLinks, legalLinks, serviceGroups, site, toolLinks } from "@/content/site";
import { Logo } from "./logo";

// One segment per service colour (DESIGN.md).
const stripe = ["bg-cobalt", "bg-coral", "bg-forest-2", "bg-peacock", "bg-marigold", "bg-[#d9668f]"];
const pillarDots = ["bg-cobalt", "bg-coral", "bg-peacock", "bg-[#d9668f]"];

/** Site footer (handoff §3): 4 columns plus a bottom bar. */
export function SiteFooter() {
  return (
    <footer className="pb-5 pt-5">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink text-paper">
          <div className="flex h-2" aria-hidden>
            {stripe.map((c) => (
              <span key={c} className={`flex-1 ${c}`} />
            ))}
          </div>

          <div className="grid gap-x-10 gap-y-12 px-6 py-14 sm:px-12 lg:grid-cols-12 lg:px-16 lg:py-16">
            <div className="lg:col-span-3">
              <Logo tone="light" />
              <p className="mt-5 max-w-[22rem] leading-[1.65] text-paper/65">
                Websites, SEO, custom software and WhatsApp & email automation for businesses in India and worldwide, and
                the team behind Nirman CRM.
              </p>
              <Link
                href="/get-a-quote/"
                className="mt-7 inline-flex h-12 items-center rounded-full bg-marigold px-6 font-medium text-ink transition-colors hover:bg-[#ffc457]"
              >
                Get a quote
              </Link>
            </div>

            <FooterCol title="Services" className="lg:col-span-3">
              {serviceGroups.map((g, i) => (
                <li key={g.href}>
                  <Link href={g.href} className="inline-flex items-center gap-2.5 text-paper/85 transition-colors hover:text-paper">
                    <span className={`size-2 rounded-full ${pillarDots[i]}`} aria-hidden />
                    {g.title}
                  </Link>
                  <ul className="mt-1.5 space-y-1 pl-[1.125rem] text-[0.875rem]">
                    {g.links
                      .filter((l) => l.href !== g.href)
                      .slice(0, 3)
                      .map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="text-paper/55 transition-colors hover:text-paper">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </FooterCol>

            <FooterCol title="Product & tools" className="lg:col-span-2">
              <FooterLink href="/crm/">Nirman CRM</FooterLink>
              <FooterLink href="/book-a-call/?type=crm-demo">Book a CRM demo</FooterLink>
              {toolLinks.map((t) => (
                <FooterLink key={t.href} href={t.href}>
                  {t.label}
                </FooterLink>
              ))}
              <FooterLink href="/tools/">All free tools</FooterLink>
            </FooterCol>

            <FooterCol title="Company" className="lg:col-span-2">
              {companyLinks.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterCol>

            <FooterCol title="Contact" className="lg:col-span-2">
              <ContactLine icon={Phone} href={site.phoneHref}>
                {site.phone}
              </ContactLine>
              <ContactLine icon={MessageCircle} href={site.whatsappHref} external>
                WhatsApp us
              </ContactLine>
              <ContactLine icon={Mail} href={`mailto:${site.email}`}>
                {site.email}
              </ContactLine>
              <ContactLine icon={MapPin}>{site.address}</ContactLine>
              <li className="flex flex-wrap gap-2 pt-2">
                {site.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="rounded-full px-3 py-1 text-[0.85rem] text-paper/85 ring-1 ring-white/20 transition-colors hover:bg-white/10"
                  >
                    {s.label}
                  </a>
                ))}
              </li>
            </FooterCol>
          </div>

          <div className="mx-6 flex flex-col gap-3 border-t border-white/10 py-6 text-[0.875rem] text-paper/50 sm:mx-12 sm:flex-row sm:items-center sm:justify-between lg:mx-16">
            <p>
              © {site.copyrightYear} {site.name}. All rights reserved.
            </p>
            <ul className="flex gap-6">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  {l.href.endsWith(".xml") ? (
                    <a href={l.href} className="hover:text-paper">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="hover:text-paper">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="text-[0.9rem] text-paper/45">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[0.95rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="break-words text-paper/85 transition-colors hover:text-paper">
        {children}
      </Link>
    </li>
  );
}

function ContactLine({
  icon: Icon,
  href,
  external = false,
  children,
}: {
  icon: typeof Phone;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const inner = (
    <>
      <Icon className="mt-0.5 size-4 shrink-0 text-paper/45" aria-hidden />
      <span className="break-words">{children}</span>
    </>
  );
  return (
    <li>
      {href ? (
        <a
          href={href}
          className="flex gap-2.5 text-paper/85 transition-colors hover:text-paper"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {inner}
        </a>
      ) : (
        <span className="flex gap-2.5 text-paper/65">{inner}</span>
      )}
    </li>
  );
}
