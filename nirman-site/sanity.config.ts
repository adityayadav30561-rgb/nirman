import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schema";

/*
 * The editor ("Studio") for the blog, served by the site at /studio/
 * (docs/sections/p7-blog.md). Three lists: Articles, Categories, Authors.
 */
export default defineConfig({
  name: "nirman",
  title: "Nirman blog",
  basePath: "/studio",
  projectId: projectId || "missing",
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Blog")
          .items([
            S.documentTypeListItem("post").title("Articles"),
            S.documentTypeListItem("category").title("Categories"),
            S.documentTypeListItem("author").title("Authors"),
          ]),
    }),
  ],
});
