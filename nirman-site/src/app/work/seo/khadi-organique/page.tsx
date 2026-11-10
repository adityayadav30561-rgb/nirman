import { ProjectPage, projectMetadata } from "@/components/work/project";

export const metadata = projectMetadata("seo", "khadi-organique");
export default function Page() {
  return <ProjectPage cat="seo" slug="khadi-organique" />;
}
