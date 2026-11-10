import { notFound } from "next/navigation";
import { BlogList, listMetadata } from "@/components/blog/list";
import { getCategories, getPosts } from "@/sanity/blog";

/*
 * /blog/category/<name>/: the articles of one category
 * (docs/sections/p7-blog.md). A category with no article has no page (404).
 * Next needs at least one address at build time; with no categories yet the
 * placeholder below is used and answers 404.
 */
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.length ? categories.map((c) => ({ category: c.slug })) : [{ category: "none-yet" }];
}

async function load(slug: string) {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const category = categories.find((c) => c.slug === slug);
  return category ? { category, categories, posts: posts.filter((p) => p.category.slug === slug) } : null;
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[category]">) {
  const data = await load((await params).category);
  return data ? listMetadata(data.posts, data.category) : {};
}

export default async function CategoryPage({ params }: PageProps<"/blog/category/[category]">) {
  const data = await load((await params).category);
  if (!data) notFound();
  return <BlogList posts={data.posts} categories={data.categories} category={data.category} />;
}
