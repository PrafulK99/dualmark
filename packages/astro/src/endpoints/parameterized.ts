import { markdownResponse, type MarkdownResponseOptions } from "@dualmark/core";

export interface ParameterizedEndpointArgs {
  getStaticPaths: () =>
    | Promise<Array<{ params: Record<string, string> }>>
    | Array<{ params: Record<string, string> }>;
  render: (args: { params: Record<string, string> }) => string | Promise<string>;
  responseOptions?: MarkdownResponseOptions;
}

export function makeParameterizedEndpoint(args: ParameterizedEndpointArgs): {
  getStaticPaths: () =>
    | Promise<Array<{ params: Record<string, string> }>>
    | Array<{ params: Record<string, string> }>;
  GET: (ctx: { params: Record<string, string> }) => Promise<Response>;
} {
  return {
    getStaticPaths: args.getStaticPaths,
    async GET(ctx) {
      const body = await args.render({ params: ctx.params });
      return markdownResponse(body, args.responseOptions);
    },
  };
}
