import { BlogList, listMetadata } from "@/components/blog/list";
import { getCategories, getPosts } from "@/sanity/blog";

// /blog/: every article, newest first (docs/sections/p7-blog.md).
export async function generateMetadata() {
  return listMetadata(await getPosts());
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  return <BlogList posts={posts} categories={categories} />;
}
