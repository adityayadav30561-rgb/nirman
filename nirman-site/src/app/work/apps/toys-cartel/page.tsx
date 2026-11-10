import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("apps", "toys-cartel");
export default function Page() {
  return <ProjectPage cat="apps" slug="toys-cartel" />;
}
