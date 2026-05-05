import { detectAIBot, negotiateFormat } from "@dualmark/core";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: [
    {
      source: "/((?!_next/|favicon.ico).*)",
      missing: [{ type: "header", key: "next-router-prefetch" }],
    },
  ],
};

function toMarkdownInternalPath(pathname: string): string {
  const clean = pathname.replace(/\.md$/, "").replace(/\/$/, "");
  if (clean === "" || clean === "/") return "/md/index";
  return `/md${clean}`;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/llms.txt") {
    return NextResponse.next();
  }

  if (pathname.endsWith(".md")) {
    const url = req.nextUrl.clone();
    url.pathname = toMarkdownInternalPath(pathname);
    return NextResponse.rewrite(url);
  }

  const ua = req.headers.get("user-agent") ?? "";
  const accept = req.headers.get("accept") ?? "";
  const bot = detectAIBot(ua);
  const fmt = negotiateFormat(accept);

  if (bot.isBot || fmt === "markdown") {
    const url = req.nextUrl.clone();
    url.pathname = toMarkdownInternalPath(pathname);
    return NextResponse.rewrite(url);
  }

  if (fmt === null && accept) {
    return new NextResponse("Not Acceptable\n\nSupported: text/html, text/markdown\n", {
      status: 406,
      headers: { "Content-Type": "text/plain; charset=utf-8", Vary: "Accept" },
    });
  }

  const res = NextResponse.next();
  const mdPath = pathname.replace(/\/$/, "") + ".md";
  res.headers.set("Link", `<${mdPath}>; rel="alternate"; type="text/markdown"`);
  res.headers.append("Vary", "Accept");
  return res;
}
