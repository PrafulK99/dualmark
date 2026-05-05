import { markdownResponse, type MarkdownResponseOptions } from "@dualmark/core";

export interface StaticEndpointArgs {
  render: () => string | Promise<string>;
  responseOptions?: MarkdownResponseOptions;
}

export function makeStaticEndpoint(args: StaticEndpointArgs): {
  GET: () => Promise<Response>;
} {
  return {
    async GET() {
      const body = await args.render();
      return markdownResponse(body, args.responseOptions);
    },
  };
}
