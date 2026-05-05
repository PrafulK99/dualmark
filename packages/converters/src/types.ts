export interface BaseConverterConfig {
  siteUrl: string;
  brandFooter?: string;
}

export interface CollectionEntry<TData> {
  id: string;
  data: TData;
  body?: string;
}

export type Converter<TEntry> = (entry: TEntry) => string;
export type ConverterFactory<TConfig, TEntry> = (config: TConfig) => Converter<TEntry>;

export type RelatedLinkRef = {
  slug: string;
  collection: string;
  basePath?: string;
};
