import { services, site } from "@/content/site";
import { Logo } from "./logo";

const stripe = ["bg-cobalt", "bg-coral", "bg-forest-2", "bg-peacock", "bg-marigold", "bg-[#d9668f]"];

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="pb-5">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink text-paper">
          {/* One segment per service colour */}
          <div className="flex h-2" aria-hidden>
            {stripe.map((c) => (
              <span key={c} className={`flex-1 ${c}`} />
            ))}
          </div>
          <div className="grid gap-x-10 gap-y-12 px-6 py-14 sm:px-12 lg:grid-cols-12 lg:px-16 lg:py-16">
            <div className="lg:col-span-4">
              <Logo tone="light" />
              <p className="mt-5 max-w-[22rem] leading-[1.65] text-paper/65">
                A digital technology agency building websites, growth systems and software for ambitious businesses, and the team
                behind Nirman CRM.
              </p>
              <a
                href={site.bookingUrl}
                className="mt-7 inline-flex h-12 items-center rounded-full bg-marigold px-6 font-medium text-ink transition-colors hover:bg-[#ffc457]"
              >
                Book a discovery call
              </a>
            </div>

            <FooterCol title="Services" className="lg:col-span-3 lg:col-start-6">
              {services.map((s, i) => (
                <li key={s.id}>
                  <a href={`#svc-${s.id}`} className="inline-flex items-center gap-2.5 text-paper/85 transition-colors hover:text-paper">
                    <span className={`size-2 rounded-full ${stripe[i]}`} aria-hidden />
                    {s.label}
                  </a>
                </li>
              ))}
            </FooterCol>

            <FooterCol title="Company" className="lg:col-span-2">
              <FooterLink href="#nirman-crm">Nirman CRM</FooterLink>
              <FooterLink href="#work">Portfolio</FooterLink>
              <FooterLink href="#about">About us</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </FooterCol>

            <FooterCol title="Get in touch" className="lg:col-span-2">
              <FooterLink href={`mailto:${site.email}`}>{site.email}</FooterLink>
              <FooterLink href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</FooterLink>
              <li className="text-paper/65">{site.address}</li>
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
              © {year} {site.name} {site.descriptor}. All rights reserved.
            </p>
            <ul className="flex gap-6">
              <li>
                <a href="/privacy" className="hover:text-paper">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-paper">
                  Terms of use
                </a>
              </li>
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
      <a href={href} className="break-words text-paper/85 transition-colors hover:text-paper">
        {children}
      </a>
    </li>
  );
}
