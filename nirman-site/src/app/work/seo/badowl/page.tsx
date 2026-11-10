import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("seo", "badowl");
export default function Page() {
  return <ProjectPage cat="seo" slug="badowl" />;
}
