import Link from "next/link";
import { site } from "@/content/site";
import { CookieSettingsButton } from "@/components/cookie-consent";
import { contactNote, footerColumns, legalLinks, servedNote, socialLinks, type SocialIcon } from "@/content/footer";

/* Footer pieces (docs/sections/08-footer.md, variant A). Links are quiet pill buttons (DESIGN-PROTOCOL principle 9). */

const quiet =
  "-ml-3 inline-flex min-h-11 items-center rounded-full px-3 text-[0.9rem] text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function Glyph({ icon }: { icon: SocialIcon }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5">
      {icon === "network" && (
        <g {...p}>
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.3 10.9l7.4-3.8M8.3 13.1l7.4 3.8" />
        </g>
      )}
      {icon === "video" && (
        <g {...p}>
          <rect x="3" y="5" width="18" height="14" rx="4" />
          <path d="M10 9.5v5l4.5-2.5z" />
        </g>
      )}
      {icon === "articles" && (
        <g {...p}>
          <path d="M6 4h9l3 3v13H6z" />
          <path d="M9 10h6M9 13.5h6M9 17h4" />
        </g>
      )}
    </svg>
  );
}

export function Socials({ className = "" }: { className?: string }) {
  const real = socialLinks.filter((s) => s.href !== "#");
  if (!real.length) return null;
  return (
    <ul className={`flex gap-3 ${className}`} aria-label="Social profiles">
      {real.map((s) => (
        <li key={s.icon} className="ft-in">
          <a
            href={s.href}
            aria-label={s.label}
            className="grid size-11 place-items-center rounded-full bg-white/12 text-white ring-1 ring-white/20 transition-colors hover:bg-white hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Glyph icon={s.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Columns({ withContact = true }: { withContact?: boolean }) {
  return (
    <>
      {footerColumns.map((c) => (
        <nav key={c.title} aria-label={c.title} className="ft-in">
          <h2 className="mb-3 text-[0.95rem] font-semibold text-white">{c.title}</h2>
          <ul className="flex flex-col">
            {c.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={quiet}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
      {withContact && <Contact />}
    </>
  );
}

export function Contact() {
  return (
    <div className="ft-in">
      <h2 className="mb-3 text-[0.95rem] font-semibold text-white">Contact info</h2>
      <ul className="flex flex-col">
        <li>
          <a href={`mailto:${site.email}`} className={quiet}>
            {site.email}
          </a>
        </li>
        <li>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={quiet}>
            {site.phone}
          </a>
        </li>
      </ul>
      <p className="mt-2 text-[0.85rem] leading-relaxed text-white/85">
        {contactNote}
        <br />
        {servedNote}
      </p>
    </div>
  );
}

export function BottomBar() {
  return (
    <div className="ft-in mt-14 flex flex-col gap-3 border-t border-white/20 pt-6 text-[0.85rem] text-white/85 sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {site.copyrightYear} {site.name}. All rights reserved.
      </p>
      <ul className="-ml-3 flex flex-wrap gap-x-2 sm:ml-0 sm:-mr-3">
        {legalLinks.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={quiet.replace("-ml-3 ", "").replace("text-[0.9rem]", "text-[0.85rem]")}>
              {l.label}
            </Link>
          </li>
        ))}
        {site.gtmIds.length > 0 && (
          <li>
            <CookieSettingsButton className={`${quiet.replace("-ml-3 ", "").replace("text-[0.9rem]", "text-[0.85rem]")} cursor-pointer`} />
          </li>
        )}
      </ul>
    </div>
  );
}
