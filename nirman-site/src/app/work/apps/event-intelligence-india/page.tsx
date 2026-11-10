import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("apps", "event-intelligence-india");
export default function Page() {
  return <ProjectPage cat="apps" slug="event-intelligence-india" />;
}
