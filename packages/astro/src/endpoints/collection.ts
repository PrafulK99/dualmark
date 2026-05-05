import { markdownResponse, type MarkdownResponseOptions } from "@dualmark/core";
import type { Converter, CollectionEntry } from "@dualmark/converters";

export interface CollectionEndpointArgs<TEntry extends CollectionEntry<unknown>> {
  collectionName: string;
  converter: Converter<TEntry>;
  getCollection: (
    name: string,
    filter?: (entry: TEntry) => boolean,
  ) => Promise<TEntry[]>;
  filter?: (entry: TEntry) => boolean;
  responseOptions?: MarkdownResponseOptions;
}

export function makeCollectionDetailEndpoint<TEntry extends CollectionEntry<unknown>>(
  args: CollectionEndpointArgs<TEntry>,
): {
  getStaticPaths: () => Promise<Array<{ params: { slug: string }; props: { entry: TEntry } }>>;
  GET: (ctx: { props: { entry: TEntry } }) => Response;
} {
  return {
    async getStaticPaths() {
      const entries = await args.getCollection(args.collectionName, args.filter);
      return entries.map((entry) => ({
        params: { slug: entry.id },
        props: { entry },
      }));
    },
    GET(ctx) {
      const md = args.converter(ctx.props.entry);
      return markdownResponse(md, args.responseOptions);
    },
  };
}
