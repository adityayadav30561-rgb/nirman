import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ArticleBody, outline } from "@/components/blog/body";
import { ArticleCard, Meta } from "@/components/blog/parts";
import { BlogPicture } from "@/components/blog/picture";
import { Contents, ReadProgress } from "@/components/blog/reading";
import { ServiceMotion } from "@/components/services/service-motion";
import { site } from "@/content/site";
import { formatDate, getPost, getPosts, getRelated } from "@/sanity/blog";

/*
 * /blog/<article>/ (docs/sections/p7-blog.md, article variant B chosen per
 * the design protocol): title, summary, author and date; a wide picture;
 * the text on the left with the contents list and a "Get a quote" box
 * staying in view on the right; then questions, the author, more articles.
 * An address with no article answers 404. Next needs at least one address at
 * build time; with no articles yet the placeholder below is used.
 */
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "none-yet" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const url = `/blog/${post.slug}/`;
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const picture = post.image.url.startsWith("http") ? `${post.image.url}?w=1200&h=630&fit=crop&auto=format` : post.image.url;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: post.hidden ? { index: false, follow: true } : undefined,
    openGraph: { type: "article", siteName: site.name, locale: "en_IN", url, title, description, publishedTime: post.publishedAt, modifiedTime: post.updatedAt || post.publishedAt, authors: post.author ? [post.author.name] : undefined, images: [{ url: picture, width: 1200, height: 630, alt: post.image.alt }] },
    twitter: { card: "summary_large_image", title, description, images: [picture] },
  };
}

const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const related = await getRelated(post);
  const contents = outline(post.body);
  const url = `${site.url}/blog/${post.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.image.url.startsWith("http") ? post.image.url : `${site.url}${post.image.url}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        mainEntityOfPage: url,
        articleSection: post.category.title,
        author: post.author ? { "@type": "Person", name: post.author.name, ...(post.author.role ? { jobTitle: post.author.role } : {}) } : { "@id": `${site.url}/#organization` },
        publisher: { "@id": `${site.url}/#organization` },
      },
      { "@type": "BreadcrumbList", itemListElement: [["Home", "/"], ["Blog", "/blog/"], [post.category.title, `/blog/category/${post.category.slug}/`], [post.title, `/blog/${post.slug}/`]].map(([name, href], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${site.url}${href}` })) },
      ...(post.faq?.length ? [{ "@type": "FAQPage", mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }] : []),
    ],
  };
  return (
    <ServiceMotion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ReadProgress target="article-text" />
      <article aria-labelledby="article-title" className="pt-8 pb-16 lg:pt-12 lg:pb-24">
        <div className="container-page">
          <header className="max-w-[56rem]">
            <nav aria-label="Breadcrumb" className="gs-hide">
              <ol className="flex flex-wrap items-center gap-1.5 text-[0.8rem] text-muted">
                <li><Link href="/blog/" className="inline-flex min-h-11 items-center hover:text-ink">Blog</Link></li>
                <li className="flex items-center gap-1.5"><ChevronRight className="size-3.5" aria-hidden /><Link href={`/blog/category/${post.category.slug}/`} className="inline-flex min-h-11 items-center hover:text-ink">{post.category.title}</Link></li>
              </ol>
            </nav>
            <h1 id="article-title" className="gs-hide mt-3 text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.08] font-semibold tracking-[-0.035em]">{post.title}</h1>
            <p className="gs-hide mt-5 max-w-[46rem] text-[1.15rem] leading-relaxed text-muted">{post.excerpt}</p>
            <div className="gs-hide mt-6 flex items-center gap-3">
              {post.author && (
                post.author.photo
                  ? <Image src={`${post.author.photo}?w=96&h=96&fit=crop&auto=format`} alt="" width={48} height={48} unoptimized className="size-11 rounded-full object-cover" />
                  : <span aria-hidden className="grid size-11 place-items-center rounded-full bg-wash text-[0.8rem] font-semibold text-brand">{initials(post.author.name)}</span>
              )}
              <div>
                {post.author && <p className="text-[0.92rem] font-medium">{post.author.name}{post.author.role ? <span className="font-normal text-muted">, {post.author.role}</span> : null}</p>}
                <Meta post={post} />
              </div>
            </div>
          </header>

          <BlogPicture image={post.image} priority sizes="(min-width: 84rem) 80rem, 100vw" className="gs-hide mt-10 aspect-[16/10] w-full rounded-[1.5rem] object-cover ring-1 ring-black/5 sm:aspect-[21/9] sm:rounded-[2rem]" />

          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
            <div id="article-text" className="max-w-[46rem]">
              <ArticleBody body={post.body} />
              {post.updatedAt && <p className="mt-10 text-[0.85rem] text-muted">Last updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>.</p>}

              {post.faq && post.faq.length > 0 && (
                <section aria-labelledby="article-faq" className="mt-14 border-t border-line pt-10">
                  <h2 id="article-faq" className="text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight font-semibold tracking-[-0.025em]">Questions and answers</h2>
                  <dl className="mt-6 flex flex-col gap-4">
                    {post.faq.map((f) => (
                      <div key={f.question} className="rounded-[1.25rem] bg-white p-6 ring-1 ring-line">
                        <dt className="text-[1.05rem] font-semibold">{f.question}</dt>
                        <dd className="mt-2 leading-relaxed text-ink/80">{f.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {post.author?.bio && (
                <aside aria-label="About the author" className="mt-12 flex gap-4 rounded-[1.25rem] bg-wash p-6">
                  <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[0.85rem] font-semibold text-brand">{initials(post.author.name)}</span>
                  <div>
                    <p className="font-semibold">{post.author.name}</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-ink/80">{post.author.bio}</p>
                  </div>
                </aside>
              )}
            </div>

            <aside className="flex flex-col gap-7 lg:sticky lg:top-28 lg:self-start">
              <div className="hidden lg:block"><Contents items={contents} /></div>
              <div className="rv relative overflow-hidden rounded-[1.5rem] bg-band p-7 text-white">
                <div aria-hidden className="absolute -right-20 -bottom-24 size-[16rem] rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.35),transparent)]" />
                <p className="relative text-[1.2rem] leading-snug font-semibold tracking-[-0.01em]">Want this done for your business?</p>
                <p className="relative mt-2 text-[0.9rem] text-white/70">Tell us what you need. We reply within 2 working hours (IST).</p>
                <Link href="/get-a-quote/" className="relative mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[0.9rem] font-medium text-ink transition-colors hover:bg-[#ffe3d1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Get a quote
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="article-more" className="bg-wash py-16 lg:py-24">
          <div className="container-page">
            <div className="rv flex flex-wrap items-end justify-between gap-4">
              <h2 id="article-more" className="text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.03em]">Keep reading</h2>
              <Link href="/blog/" className="group inline-flex h-12 items-center gap-2 rounded-full border border-ink-2/80 bg-white/70 px-6 text-[0.9rem] font-medium transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                All articles
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <li key={p.slug}><ArticleCard post={p} /></li>)}
            </ul>
          </div>
        </section>
      )}
    </ServiceMotion>
  );
}
