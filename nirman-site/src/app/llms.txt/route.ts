import { fixedPages, workPages } from "@/content/pages-index";
import { site } from "@/content/site";
import { getPosts } from "@/sanity/blog";

/*
 * /llms.txt: a plain-text guide to the site for AI assistants (the llms.txt
 * convention): what Nirman is, then its pages with one line each.
 */
export async function GET() {
  const posts = (await getPosts()).filter((p) => !p.hidden);
  const link = (p: { path: string; title: string; line: string }) => `- [${p.title}](${site.url}${p.path}): ${p.line}`;
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Nirman does not publish prices; every project is quoted individually. It does not offer paid advertising (PPC) or social media marketing. Nirman CRM is shown by demo on request.",
    "",
    "## Pages",
    ...fixedPages.filter((p) => p.path !== "/blog/" || posts.length > 0).map(link),
    "",
    "## Work",
    ...workPages.map(link),
    ...(posts.length ? ["", "## Articles", ...posts.map((p) => link({ path: `/blog/${p.slug}/`, title: p.title, line: p.excerpt }))] : []),
    "",
    "## Contact",
    `- Email: ${site.email}`,
    `- Phone: ${site.phones.join(", ")}`,
    `- WhatsApp: +${site.whatsapp}`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
