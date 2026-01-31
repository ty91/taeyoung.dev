import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import siteConfig from "../site.config";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: siteConfig.blog.contentPath,
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    draft: z.boolean(),
    slug: z.string(),
  }),
});

export const collections = { posts };
