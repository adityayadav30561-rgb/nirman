import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("websites", "blue-orbit-digi");
export default function Page() {
  return <ProjectPage cat="websites" slug="blue-orbit-digi" />;
}
