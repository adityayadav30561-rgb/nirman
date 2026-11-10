import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("websites", "gurus-indian-cuisine");
export default function Page() {
  return <ProjectPage cat="websites" slug="gurus-indian-cuisine" />;
}
