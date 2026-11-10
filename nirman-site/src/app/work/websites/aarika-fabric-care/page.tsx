import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("websites", "aarika-fabric-care");
export default function Page() {
  return <ProjectPage cat="websites" slug="aarika-fabric-care" />;
}
