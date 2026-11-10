import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("websites", "sitco-india");
export default function Page() {
  return <ProjectPage cat="websites" slug="sitco-india" />;
}
