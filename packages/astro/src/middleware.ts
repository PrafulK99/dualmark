import { injectMarkdownAlternateLink } from "@dualmark/core";

interface MiddlewareContext {
  url: URL;
  request: Request;
}

type Next = () => Promise<Response>;

export async function dualmarkOnRequest(
  context: MiddlewareContext,
  next: Next,
): Promise<Response> {
  const response = await next();
  const ct = response.headers.get("content-type") ?? "";
  if (!ct.toLowerCase().includes("text/html")) return response;
  if (context.url.pathname.endsWith(".md")) return response;
  const trimmed = context.url.pathname.replace(/\/$/, "");
  const mdPath = trimmed === "" ? "/index.md" : trimmed + ".md";
  return injectMarkdownAlternateLink(response, context.url.pathname, mdPath);
}

export const onRequest = dualmarkOnRequest;
