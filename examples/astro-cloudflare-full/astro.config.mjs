import { defineConfig } from "astro/config";
import dualmark from "@dualmark/astro";

const SITE_URL = "https://astro-cf.dualmark.dev";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    dualmark({
      siteUrl: SITE_URL,
      collections: {
        blog: {
          converter: "blog",
          slugStrategy: "single",
          listingMetadata: {
            title: "Dualmark Blog",
            description: "Posts on the Cloudflare-deployed example.",
          },
        },
        glossary: {
          converter: "glossary",
          slugStrategy: "single",
          listingMetadata: {
            title: "Glossary",
            description: "Plain-language definitions for AEO terms.",
          },
        },
      },
      staticPages: [
        {
          pattern: "/",
          render: () => "# Dualmark on Cloudflare\n\nA full-stack example: static Astro at the edge, AI bots get markdown.",
        },
        {
          pattern: "/about",
          render: () => "# About\n\nThis example deploys to Cloudflare Workers with `@dualmark/cloudflare`.",
        },
      ],
      llmsTxt: {
        enabled: true,
        brandName: "Dualmark Cloudflare Example",
        description: "Full-stack Dualmark example deployed to Cloudflare Workers.",
        sections: [
          {
            title: "Pages",
            links: [
              { title: "Home", href: `${SITE_URL}/` },
              { title: "About", href: `${SITE_URL}/about` },
              { title: "Blog", href: `${SITE_URL}/blog` },
              { title: "Glossary", href: `${SITE_URL}/glossary` },
            ],
          },
        ],
      },
    }),
  ],
});
