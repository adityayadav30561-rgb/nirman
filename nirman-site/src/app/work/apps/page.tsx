import { CategoryPage, categoryMetadata } from "@/components/work/project";

export const metadata = categoryMetadata("apps");
export default function Page() {
  return <CategoryPage cat="apps" />;
}
