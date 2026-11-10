import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("websites", "vana");
export default function Page() {
  return <ProjectPage cat="websites" slug="vana" />;
}
