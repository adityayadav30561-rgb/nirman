import { CategoryPage, categoryMetadata } from "@/components/work/project";

export const metadata = categoryMetadata("seo");
export default function Page() {
  return <CategoryPage cat="seo" />;
}
