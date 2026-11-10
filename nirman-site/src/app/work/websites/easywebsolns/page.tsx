import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("websites", "easywebsolns");
export default function Page() {
  return <ProjectPage cat="websites" slug="easywebsolns" />;
}
