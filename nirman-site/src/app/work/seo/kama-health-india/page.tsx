import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("seo", "kama-health-india");
export default function Page() {
  return <ProjectPage cat="seo" slug="kama-health-india" />;
}
