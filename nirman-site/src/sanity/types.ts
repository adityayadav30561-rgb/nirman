// Shapes of blog content as the pages use it (docs/sections/p7-blog.md).
export type BlogImage = { url: string; w: number; h: number; alt: string; lqip?: string };
export type BlogCategory = { title: string; slug: string; description?: string };
export type BlogAuthor = { name: string; role?: string; photo?: string; bio?: string };
export type Qa = { question: string; answer: string };

/** A block of the article text, as Sanity stores it (Portable Text). */
export type BodyBlock = { _type: string; _key: string; [key: string]: unknown };

export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  hidden?: boolean;
  category: BlogCategory;
  author?: BlogAuthor;
  image: BlogImage;
  minutes: number;
};
export type Post = PostCard & { body: BodyBlock[]; faq?: Qa[]; seoTitle?: string; seoDescription?: string };
