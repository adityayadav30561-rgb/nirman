import { site } from "@/content/site";
import { indexedPages, type PageSection } from "@/content/pages";
import { absoluteUrl } from "@/lib/seo";

// /llms.txt (llmstxt.org): a plain Markdown map of the site for AI assistants.
// Built from content/pages.ts so it never drifts from the sitemap. Static at build.

const sections: { key: PageSection; heading: string }[] = [
  { key: "services", heading: "Services" },
  { key: "product", heading: "Product" },
  { key: "tools", heading: "Free tools" },
  { key: "core", heading: "Company" },
];

function body() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "We do not publish prices: every service is quoted after a short call (Get a quote). Nirman CRM is shown in a live demo (Book a demo).",
    "",
  ];
  for (const { key, heading } of sections) {
    lines.push(`## ${heading}`, "");
    for (const p of indexedPages.filter((pg) => pg.section === key && pg.path !== "/")) {
      lines.push(`- [${p.title}](${absoluteUrl(p.path)}): ${p.description}`);
    }
    lines.push("");
  }
  lines.push("## Optional", "");
  for (const p of indexedPages.filter((pg) => pg.section === "legal")) {
    lines.push(`- [${p.title}](${absoluteUrl(p.path)}): ${p.description}`);
  }
  return lines.join("\n") + "\n";
}

export function GET() {
  return new Response(body(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
