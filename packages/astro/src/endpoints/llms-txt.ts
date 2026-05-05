import { renderLlmsTxt, type LlmsTxtSection } from "@dualmark/core";

export interface LlmsTxtEndpointArgs {
  brandName: string;
  description?: string;
  sections: LlmsTxtSection[];
}

export function makeLlmsTxtEndpoint(args: LlmsTxtEndpointArgs): {
  GET: () => Response;
} {
  return {
    GET() {
      const body = renderLlmsTxt(args);
      return new Response(body, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Robots-Tag": "noindex",
          "Cache-Control": "public, max-age=3600",
        },
      });
    },
  };
}
