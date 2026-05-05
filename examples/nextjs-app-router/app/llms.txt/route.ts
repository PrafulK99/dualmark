import { renderLlmsTxt } from "@dualmark/core";

const SITE_URL = "https://nextjs.dualmark.dev";

export const dynamic = "force-static";

export function GET() {
  const body = renderLlmsTxt({
    brandName: "Dualmark Next.js Example",
    description: "Reference implementation of Dualmark on Next.js 15 App Router.",
    sections: [
      {
        title: "Pages",
        links: [
          { title: "Home", href: `${SITE_URL}/` },
          { title: "Posts", href: `${SITE_URL}/posts` },
        ],
      },
    ],
  });
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
