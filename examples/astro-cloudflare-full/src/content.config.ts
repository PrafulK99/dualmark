import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    publishedDate: z.coerce.date(),
    modifiedDate: z.coerce.date().optional(),
    category: z.union([z.string(), z.array(z.string())]).optional(),
  }),
});

const glossary = defineCollection({
  loader: glob({ base: "./src/content/glossary", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    term: z.string(),
    title: z.string().optional(),
    definition: z.string(),
    category: z.string().optional(),
    relatedTerms: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, glossary };
