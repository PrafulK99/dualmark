import { markdownResponse } from "@dualmark/core";
import { source } from "@/lib/source";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await ctx.params;
  const page = source.getPage(slug);
  if (!page) {
    return new Response("Not Found\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const absPath = join(process.cwd(), "content", "docs", page.file.path);
  let mdx: string;
  try {
    mdx = await readFile(absPath, "utf8");
  } catch {
    return new Response("Source unavailable\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return markdownResponse(mdx, {
    cacheControl: "public, max-age=3600",
    noindex: true,
    extraHeaders: { "X-Source-Path": page.file.path },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
