import { breadcrumbTrail, pageByPath } from "@/content/pages";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button-link";

/**
 * Placeholder for a page from content/pages.ts that is not built yet (P3.4).
 * Gives the route its real title, description and H1 so links, the sitemap and
 * metadata work now. Each later phase replaces the route's page.tsx.
 */
export function StubPage({ path }: { path: string }) {
  const page = pageByPath(path);
  if (!page) throw new Error(`StubPage: ${path} is not in content/pages.ts`);

  // Nirman CRM's only CTA is "Book a demo"; everything else ends in "Get a quote".
  const cta =
    page.section === "product"
      ? { label: "Book a demo", href: "/book-a-call/" }
      : path === "/get-a-quote/"
        ? { label: "Contact us", href: "/contact/" }
        : { label: "Get a quote", href: "/get-a-quote/" };

  return (
    <div className="container-site pb-20 pt-32 lg:pb-28 lg:pt-40">
      <Breadcrumbs items={breadcrumbTrail(path)} />
      <p className="mt-10 text-[0.95rem] text-ink-3">Coming soon</p>
      <h1 className="display mt-3 max-w-[20ch] text-[clamp(2.6rem,6vw,5.2rem)]">{page.title}</h1>
      <p className="mt-6 max-w-[38rem] text-[1.125rem] leading-[1.6] text-ink-2">{page.description}</p>
      <p className="mt-4 max-w-[38rem] text-ink-3">
        We are still writing this page. In the meantime, talk to us directly.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href={cta.href} size="lg">
          {cta.label}
        </ButtonLink>
        <ButtonLink href="/" variant="secondary" size="lg">
          Go to the homepage
        </ButtonLink>
      </div>
    </div>
  );
}
