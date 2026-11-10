import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("seo", "fresh-light-photography");
export default function Page() {
  return <ProjectPage cat="seo" slug="fresh-light-photography" />;
}
