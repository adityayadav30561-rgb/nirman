import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("websites", "ashville-homes");
export default function Page() {
  return <ProjectPage cat="websites" slug="ashville-homes" />;
}
