import { makeMarkdownResponse, renderListingMarkdown, renderPostMarkdown } from "@/lib/markdown";
import { getPost, POSTS } from "@/lib/posts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { path: ["index"] },
    { path: ["posts"] },
    ...POSTS.map((p) => ({ path: ["posts", p.slug] })),
  ];
}

export async function GET(_req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const joined = "/" + path.join("/");

  if (joined === "/index") {
    return makeMarkdownResponse(`# Dualmark Next.js Example

> Reference implementation of Dualmark on Next.js 15 App Router.

A minimal site demonstrating how to plug \`@dualmark/core\` into Next.js — middleware handles negotiation, route handlers serve markdown twins.

## Posts

- [Hello from Next.js + Dualmark](/posts/hello)
- [How content negotiation works](/posts/negotiation)
`);
  }

  if (joined === "/posts") {
    return makeMarkdownResponse(renderListingMarkdown());
  }

  const postMatch = /^\/posts\/([^/]+)$/.exec(joined);
  if (postMatch && postMatch[1]) {
    const post = getPost(postMatch[1]);
    if (!post) return new Response("Not Found", { status: 404 });
    return makeMarkdownResponse(renderPostMarkdown(post));
  }

  return new Response("Not Found", { status: 404 });
}
