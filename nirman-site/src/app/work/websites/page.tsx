import { CategoryPage, categoryMetadata } from "@/components/work/project";

export const metadata = categoryMetadata("websites");
export default function Page() {
  return <CategoryPage cat="websites" />;
}
