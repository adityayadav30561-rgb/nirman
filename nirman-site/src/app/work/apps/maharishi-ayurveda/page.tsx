import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("apps", "maharishi-ayurveda");
export default function Page() {
  return <ProjectPage cat="apps" slug="maharishi-ayurveda" />;
}
