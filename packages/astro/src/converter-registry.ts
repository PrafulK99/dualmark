import {
  blogConverter,
  caseStudyConverter,
  glossaryConverter,
  legalConverter,
  compareConverter,
  toolConverter,
  videoConverter,
  taxConverter,
  countryConverter,
  paymentMethodConverter,
  currencyConverter,
  productConverter,
  type BaseConverterConfig,
  type Converter,
  type CollectionEntry,
} from "@dualmark/converters";

export type BuiltInConverterName =
  | "blog"
  | "case-study"
  | "glossary"
  | "legal"
  | "compare"
  | "tool"
  | "video"
  | "tax"
  | "country"
  | "payment-method"
  | "currency"
  | "product";

export interface ResolveConverterArgs {
  name: string;
  collectionName: string;
  baseConfig: BaseConverterConfig;
}

export function resolveBuiltInConverter(args: ResolveConverterArgs): Converter<CollectionEntry<unknown>> {
  switch (args.name as BuiltInConverterName) {
    case "blog":
      return blogConverter({ ...args.baseConfig, basePath: `/${args.collectionName}` }) as Converter<CollectionEntry<unknown>>;
    case "case-study":
      return caseStudyConverter({ ...args.baseConfig, basePath: `/${args.collectionName}` }) as Converter<CollectionEntry<unknown>>;
    case "glossary":
      return glossaryConverter({ ...args.baseConfig, basePath: `/${args.collectionName}` }) as Converter<CollectionEntry<unknown>>;
    case "legal":
      return legalConverter({ ...args.baseConfig, basePath: `/${args.collectionName}` }) as Converter<CollectionEntry<unknown>>;
    case "compare":
      return compareConverter({
        ...args.baseConfig,
        basePath: `/${args.collectionName}`,
        ourBrandColumn: "Us",
      }) as Converter<CollectionEntry<unknown>>;
    case "tool":
      return toolConverter({ ...args.baseConfig, basePath: `/${args.collectionName}` }) as Converter<CollectionEntry<unknown>>;
    case "video":
      return videoConverter({ ...args.baseConfig, basePath: `/${args.collectionName}` }) as Converter<CollectionEntry<unknown>>;
    case "tax":
      return taxConverter({ ...args.baseConfig, basePath: `/${args.collectionName}` }) as Converter<CollectionEntry<unknown>>;
    case "country":
      return countryConverter({ ...args.baseConfig, basePath: `/${args.collectionName}` }) as Converter<CollectionEntry<unknown>>;
    case "payment-method":
      return paymentMethodConverter({
        ...args.baseConfig,
        basePath: `/${args.collectionName}`,
      }) as Converter<CollectionEntry<unknown>>;
    case "currency":
      return currencyConverter({ ...args.baseConfig, basePath: `/${args.collectionName}` }) as Converter<CollectionEntry<unknown>>;
    case "product":
      return productConverter({
        ...args.baseConfig,
        section: { basePath: `/${args.collectionName}`, displayName: args.collectionName, siblings: [] },
      }) as Converter<CollectionEntry<unknown>>;
    default:
      throw new Error(
        `Dualmark: unknown built-in converter '${args.name}'. Valid names: blog, case-study, glossary, legal, compare, tool, video, tax, country, payment-method, currency, product. Or pass a function.`,
      );
  }
}
