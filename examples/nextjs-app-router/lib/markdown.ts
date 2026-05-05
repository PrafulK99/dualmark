import { blogConverter } from "@dualmark/converters";
import { markdownResponse } from "@dualmark/core";
import { POSTS, type Post } from "./posts";

const SITE_URL = "https://nextjs.dualmark.dev";

const convertPost = blogConverter({
  siteUrl: SITE_URL,
  basePath: "/posts",
});

function postToConverterInput(post: Post) {
  return {
    id: post.slug,
    slug: post.slug,
    data: {
      title: post.title,
      description: post.description,
      author: post.author,
      publishedDate: new Date(post.publishedDate),
      category: post.category,
    },
    body: post.body,
  };
}

export function renderPostMarkdown(post: Post): string {
  return convertPost(postToConverterInput(post));
}

export function renderListingMarkdown(): string {
  const items = POSTS.map((p) => `- [${p.title}](/posts/${p.slug}): ${p.description}`).join("\n");
  return `# Posts

> All posts on the Dualmark Next.js example.

- **URL**: ${SITE_URL}/posts

---

${items}
`;
}

export function makeMarkdownResponse(body: string): Response {
  return markdownResponse(body, {
    cacheControl: "public, max-age=3600",
    noindex: true,
  });
}
