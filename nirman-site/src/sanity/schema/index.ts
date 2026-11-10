import { defineArrayMember, defineField, defineType } from "sanity";

/*
 * What an editor fills in for the blog (docs/sections/p7-blog.md). Plain
 * words in every label and description: the people writing are not
 * developers. Required fields are the ones the page and search engines
 * cannot do without (title, address, summary, category, date, picture with a
 * description, text).
 */

const body = defineField({
  name: "body",
  title: "Article text",
  type: "array",
  validation: (r) => r.required(),
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal text", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Small heading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet list", value: "bullet" },
        { title: "Numbered list", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "Address",
                description: "A page on this site (/services/seo/) or a full address (https://...).",
                type: "string",
                validation: (r) => r.required().custom((v) => (!v || /^(\/|https?:\/\/|mailto:|tel:)/.test(v) ? true : "Start with / or https://")),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      name: "figure",
      title: "Picture",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "What the picture shows", description: "One plain sentence, for people who cannot see it and for search engines.", type: "string", validation: (r) => r.required() }),
        defineField({ name: "caption", title: "Caption (optional)", type: "string" }),
      ],
    }),
    defineArrayMember({
      name: "note",
      title: "Highlighted note",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title (optional)", type: "string" }),
        defineField({ name: "text", title: "Text", type: "text", rows: 3, validation: (r) => r.required() }),
      ],
      preview: { select: { title: "title", subtitle: "text" }, prepare: ({ title, subtitle }) => ({ title: title || "Note", subtitle }) },
    }),
  ],
});

export const post = defineType({
  name: "post",
  title: "Article",
  type: "document",
  groups: [
    { name: "article", title: "Article", default: true },
    { name: "search", title: "Search and sharing" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", group: "article", type: "string", validation: (r) => r.required().max(90).warning("Titles over 90 characters are cut short in search results.") }),
    defineField({
      name: "slug",
      title: "Address of the article",
      description: "Press Generate. Lowercase words with hyphens. Do not change it after publishing: links to the article would break.",
      group: "article",
      type: "slug",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required().custom((v) => (!v?.current || /^[a-z0-9]+(-[a-z0-9]+)*$/.test(v.current) ? true : "Use lowercase letters, numbers and hyphens only")),
    }),
    defineField({ name: "excerpt", title: "Summary", description: "Two sentences that answer the question the article is about. Shown on the blog page and under the title.", group: "article", type: "text", rows: 3, validation: (r) => r.required().min(60).max(220) }),
    defineField({ name: "category", title: "Category", group: "article", type: "reference", to: [{ type: "category" }], validation: (r) => r.required() }),
    defineField({ name: "author", title: "Written by", group: "article", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "publishedAt", title: "Date shown on the article", group: "article", type: "datetime", initialValue: () => new Date().toISOString(), validation: (r) => r.required() }),
    defineField({ name: "updatedAt", title: "Last updated (optional)", description: "Fill in when you make a real change to an old article.", group: "article", type: "datetime" }),
    defineField({
      name: "mainImage",
      title: "Main picture",
      description: "Wide picture, at least 1600 pixels across. No prices, and no logos of other companies.",
      group: "article",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
      fields: [defineField({ name: "alt", title: "What the picture shows", type: "string", validation: (r) => r.required() })],
    }),
    { ...body, group: "article" },
    defineField({
      name: "faq",
      title: "Questions and answers (optional)",
      description: "Short questions a reader may still have. They appear at the end of the article and can show in Google.",
      group: "article",
      type: "array",
      of: [
        defineArrayMember({
          name: "qa",
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
    defineField({ name: "seoTitle", title: "Title for Google (optional)", description: "Only if it should differ from the title. Up to 60 characters.", group: "search", type: "string", validation: (r) => r.max(60).warning("Longer titles are cut short in Google.") }),
    defineField({ name: "seoDescription", title: "Description for Google (optional)", description: "Only if it should differ from the summary. Up to 160 characters.", group: "search", type: "text", rows: 2, validation: (r) => r.max(160).warning("Longer descriptions are cut short in Google.") }),
    defineField({ name: "hidden", title: "Hide from Google", description: "The article stays on the site but search engines are asked not to list it.", group: "search", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category.title", media: "mainImage" } },
});

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Address", description: "Press Generate.", type: "slug", options: { source: "title", maxLength: 40 }, validation: (r) => r.required().custom((v) => (!v?.current || /^[a-z0-9]+(-[a-z0-9]+)*$/.test(v.current) ? true : "Use lowercase letters, numbers and hyphens only")) }),
    defineField({ name: "description", title: "One line about this category", description: "Shown at the top of the category page and to search engines.", type: "text", rows: 2, validation: (r) => r.required().max(160) }),
    defineField({ name: "order", title: "Position in the list", description: "1 comes first.", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "Position", name: "order", by: [{ field: "order", direction: "asc" }] }],
});

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", description: "For example: SEO lead, Nirman.", type: "string" }),
    defineField({ name: "photo", title: "Photo (optional)", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Two lines about the author (optional)", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

export const schemaTypes = [post, category, author];
