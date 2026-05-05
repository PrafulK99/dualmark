export { blogConverter, type BlogConverterConfig, type BlogEntryData } from "./blog.js";
export {
  caseStudyConverter,
  type CaseStudyConverterConfig,
  type CaseStudyEntryData,
} from "./case-study.js";
export {
  glossaryConverter,
  type GlossaryConverterConfig,
  type GlossaryEntryData,
} from "./glossary.js";
export { legalConverter, type LegalConverterConfig, type LegalEntryData } from "./legal.js";
export {
  compareConverter,
  type CompareConverterConfig,
  type CompareEntryData,
} from "./compare.js";
export { toolConverter, type ToolConverterConfig, type ToolEntryData } from "./tool.js";
export { videoConverter, type VideoConverterConfig, type VideoEntryData } from "./video.js";
export {
  taxConverter,
  countryConverter,
  paymentMethodConverter,
  currencyConverter,
  type TaxConverterConfig,
  type TaxEntryData,
  type CountryConverterConfig,
  type CountryEntryData,
  type PaymentMethodConverterConfig,
  type PaymentMethodEntryData,
  type CurrencyConverterConfig,
  type CurrencyEntryData,
} from "./pseo.js";
export {
  productConverter,
  type ProductConverterConfig,
  type ProductEntryData,
  type ProductSibling,
  type ProductSection,
} from "./product.js";
export type {
  BaseConverterConfig,
  CollectionEntry,
  Converter,
  ConverterFactory,
  RelatedLinkRef,
} from "./types.js";

export const BUILT_IN_CONVERTERS = [
  "blog",
  "case-study",
  "glossary",
  "legal",
  "compare",
  "product",
  "tool",
  "video",
  "tax",
  "country",
  "payment-method",
  "currency",
] as const;

export type BuiltInConverterName = (typeof BUILT_IN_CONVERTERS)[number];
