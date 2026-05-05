export interface Post {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  category: string;
  body: string;
}

export const POSTS: Post[] = [
  {
    slug: "hello",
    title: "Hello from Next.js + Dualmark",
    description: "First post on the Dualmark Next.js example.",
    author: "Sisyphus",
    publishedDate: "2026-05-05",
    category: "announcements",
    body: `This is the **first post** on the Dualmark Next.js example.

Every page on this site has a markdown twin. Append \`.md\` to any URL or send \`Accept: text/markdown\`.

## How it works

Next.js doesn't ship with a built-in Dualmark adapter — but the framework-agnostic \`@dualmark/core\` primitives plug straight into the App Router via \`middleware.ts\` and a catch-all \`[...slug]/route.ts\` handler.`,
  },
  {
    slug: "negotiation",
    title: "How content negotiation works",
    description: "A short tour of HTTP Accept negotiation as Dualmark uses it.",
    author: "Sisyphus",
    publishedDate: "2026-05-05",
    category: "explainers",
    body: `When a request arrives, Dualmark inspects the \`User-Agent\` and \`Accept\` headers.

- Known AI bot UA → respond with markdown
- \`Accept: text/markdown\` → respond with markdown
- Otherwise → respond with HTML, plus a \`Link: <…>; rel="alternate"\` header pointing to the markdown twin

This way the **same URL** serves the right content to the right consumer — no duplicate URLs, no robots-meta cloaking.`,
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
