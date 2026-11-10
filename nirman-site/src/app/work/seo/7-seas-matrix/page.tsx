import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("seo", "7-seas-matrix");
export default function Page() {
  return <ProjectPage cat="seo" slug="7-seas-matrix" />;
}
