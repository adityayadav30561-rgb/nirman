import type { JsonLdNode } from "@/lib/seo";

/**
 * JSON-LD script tag. Several nodes go out as one @graph so @id references
 * resolve. `<` is escaped so content strings cannot close the script tag.
 */
export function JsonLd({ data }: { data: JsonLdNode | JsonLdNode[] }) {
  const doc = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(doc).replace(/</g, "\\u003c") }}
    />
  );
}
