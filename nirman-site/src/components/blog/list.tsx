import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ArticleCard, Chips, Meta, tag } from "@/components/blog/parts";
import { BlogPicture } from "@/components/blog/picture";
import { MoreGrid } from "@/components/blog/reading";
import { heroGrid } from "@/components/services/service-hero";
import { ServiceMotion } from "@/components/services/service-motion";
import { ButtonLink } from "@/components/ui/button";
import { blogIntro } from "@/content/blog";
import { site } from "@/content/site";
import type { BlogCategory, PostCard } from "@/sanity/types";

/*
 * The blog list, used by /blog/ and by each category page
 * (docs/sections/p7-blog.md, list variant A chosen per the design protocol):
 * ink hero with the category chips, the newest article large and hanging
 * over the band, the rest in a grid. With no articles yet it says so and
 * points to the work page (and asks search engines not to list the page).
 */

export function listMetadata(posts: PostCard[], category?: BlogCategory): Metadata {
  const url = category ? `/blog/category/${category.slug}/` : "/blog/";
  const title = category ? `${category.title} articles` : "Blog";
  const description = category?.description || blogIntro.description;
  return { title, description, alternates: { canonical: url }, robots: posts.length ? undefined : { index: false, follow: true }, openGraph: { type: "website", siteName: site.name, locale: "en_IN", url, title, description } };
}

const ld = (data: object) => <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;

export function BlogList({ posts, categories, category }: { posts: PostCard[]; categories: BlogCategory[]; category?: BlogCategory }) {
  const [first, ...rest] = posts;
  const path = category ? `/blog/category/${category.slug}/` : "/blog/";
  const crumbs = [["Home", "/"], ["Blog", "/blog/"], ...(category ? [[category.title, path]] : [])];
  return (
    <ServiceMotion>
      {ld({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": category ? "CollectionPage" : "Blog", name: category ? `${category.title} articles` : `${site.name} blog`, url: `${site.url}${path}`, publisher: { "@id": `${site.url}/#organization` }, ...(posts.length ? { mainEntity: { "@type": "ItemList", itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: `${site.url}/blog/${p.slug}/` })) } } : {}) },
          { "@type": "BreadcrumbList", itemListElement: crumbs.map(([name, href], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${site.url}${href}` })) },
        ],
      })}
      <section aria-labelledby="blog-title" className="relative overflow-hidden bg-band text-white">
        <div aria-hidden className={`absolute inset-0 ${heroGrid} [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]`} />
        <div aria-hidden className="absolute -top-64 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.18),transparent)]" />
        <div className={`container-page relative flex flex-col items-center pt-12 text-center lg:pt-16 ${first ? "pb-36 lg:pb-44" : "pb-16 lg:pb-20"}`}>
          {category ? (
            <nav aria-label="Breadcrumb" className="gs-hide">
              <ol className="flex items-center gap-1.5 text-[0.8rem] text-white/60">
                <li><Link href="/blog/" className="inline-flex min-h-11 items-center hover:text-white">Blog</Link></li>
                <li className="flex items-center gap-1.5 text-white" aria-current="page"><ChevronRight className="size-3.5" aria-hidden />{category.title}</li>
              </ol>
            </nav>
          ) : (
            <p className="gs-hide text-[0.78rem] font-semibold tracking-[0.08em] text-[#ff9a62] uppercase">Blog</p>
          )}
          <h1 id="blog-title" className="gs-hide mt-4 max-w-[46rem] text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.06] font-semibold tracking-[-0.035em]">{category ? `${category.title} articles` : blogIntro.title}</h1>
          <p className="gs-hide mt-5 max-w-[38rem] text-[1.05rem] text-white/75">{category?.description || blogIntro.line}</p>
          {categories.length > 0 && <div className="gs-hide mt-8 w-full"><Chips categories={categories} active={category?.slug} tone="light" center /></div>}
        </div>
      </section>

      {first ? (
        <section aria-label="Articles" className="pb-20 lg:pb-28">
          <div className="container-page">
            <article className="gs-hide group relative -mt-24 grid grid-cols-1 overflow-hidden rounded-[2rem] bg-white shadow-[0_2rem_4rem_-2rem_rgba(18,20,24,0.35)] ring-1 ring-line lg:-mt-32 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
              <div className="min-w-0 overflow-hidden">
                <BlogPicture image={first.image} priority sizes="(min-width: 64rem) 48rem, 100vw" className="aspect-[16/10] size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
              </div>
              <div className="flex min-w-0 flex-col justify-center p-7 sm:p-9 lg:p-12">
                <span className={`${tag} self-start`}>{first.category.title}</span>
                <h2 className="mt-4 text-[clamp(1.6rem,2.6vw,2.3rem)] leading-tight font-semibold tracking-[-0.025em]">
                  <Link href={`/blog/${first.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-[2rem] focus-visible:after:outline-2 focus-visible:after:outline-brand">{first.title}</Link>
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{first.excerpt}</p>
                <div className="mt-5"><Meta post={first} /></div>
                <span aria-hidden className="mt-6 inline-flex h-11 items-center gap-2 self-start rounded-full bg-ink-2 px-5 text-[0.88rem] font-medium text-white transition-colors group-hover:bg-brand">
                  Read the article
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
            {rest.length > 0 && (
              <div className="mt-6">
                <MoreGrid>{rest.map((p) => <ArticleCard key={p.slug} post={p} />)}</MoreGrid>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section aria-labelledby="blog-empty" className="py-20 lg:py-28">
          <div className="container-page">
            <div className="rv mx-auto max-w-[44rem] rounded-[2rem] bg-white p-9 text-center ring-1 ring-line sm:p-14">
              <h2 id="blog-empty" className="text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight font-semibold tracking-[-0.025em]">{blogIntro.emptyTitle}</h2>
              <p className="mx-auto mt-4 max-w-[32rem] text-muted">{blogIntro.emptyLine}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/work/">See our work</ButtonLink>
                <ButtonLink href="/get-a-quote/" variant="outline">Get a quote</ButtonLink>
              </div>
            </div>
          </div>
        </section>
      )}
    </ServiceMotion>
  );
}
