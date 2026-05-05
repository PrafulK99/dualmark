import {
  joinLines,
  cleanBody,
  normalizeUnicode,
  slugToTitle,
  renderRelatedLinks,
} from "@dualmark/core";
import type { BaseConverterConfig, CollectionEntry, Converter } from "./types.js";

export interface PseoTransformContext {
  config: { siteUrl: string };
  slug: string;
}

export interface PseoRelatedRef {
  slug: string;
  basePath: string;
  titleTransform?: "slug-to-title" | "uppercase" | ((slug: string) => string);
}

function applyTitleTransform(
  slug: string,
  transform: PseoRelatedRef["titleTransform"] | undefined,
): string {
  if (!transform) return slugToTitle(slug);
  if (transform === "slug-to-title") return slugToTitle(slug);
  if (transform === "uppercase") return slug.toUpperCase();
  return transform(slug);
}

export interface TaxConverterConfig extends BaseConverterConfig {
  basePath?: string;
  countryBasePath?: string;
  currencyBasePath?: string;
  paymentMethodBasePath?: string;
  parentTitle?: string;
  platformContext?: string;
}

export interface TaxEntryData {
  title: string;
  description?: string;
  jurisdiction: string;
  taxType: string;
  standardRate: string;
  relatedCountries?: string[];
  relatedCurrencies?: string[];
  relatedPaymentMethods?: string[];
}

export function taxConverter(
  config: TaxConverterConfig,
): Converter<CollectionEntry<TaxEntryData>> {
  const basePath = config.basePath ?? "/tax";
  return (entry) => {
    const d = entry.data;
    const parts: string[] = [];
    parts.push(
      joinLines(
        `# ${d.title}`,
        d.description && `\n> ${d.description}`,
        `\n- **Jurisdiction**: ${d.jurisdiction}`,
        `- **Tax Type**: ${d.taxType}`,
        `- **Standard Rate**: ${d.standardRate}`,
        `- **URL**: ${config.siteUrl}${basePath}/${entry.id}`,
        "\n---",
        entry.body && `\n${cleanBody(entry.body)}`,
      ),
    );

    const related: Array<{ title: string; href: string }> = [];
    if (d.relatedCountries && config.countryBasePath) {
      for (const slug of d.relatedCountries) {
        related.push({
          title: slugToTitle(slug),
          href: `${config.siteUrl}${config.countryBasePath}/${slug}`,
        });
      }
    }
    if (d.relatedCurrencies && config.currencyBasePath) {
      for (const slug of d.relatedCurrencies) {
        related.push({
          title: slug.toUpperCase(),
          href: `${config.siteUrl}${config.currencyBasePath}/${slug}`,
        });
      }
    }
    if (d.relatedPaymentMethods && config.paymentMethodBasePath) {
      for (const slug of d.relatedPaymentMethods) {
        related.push({
          title: slugToTitle(slug),
          href: `${config.siteUrl}${config.paymentMethodBasePath}/${slug}`,
        });
      }
    }
    if (related.length > 0) {
      parts.push(
        renderRelatedLinks({
          custom: related,
          parent: {
            title: config.parentTitle ?? "All Tax Guides",
            href: `${config.siteUrl}${basePath}`,
          },
        }),
      );
    }

    if (config.platformContext) parts.push("\n---\n", config.platformContext);
    if (config.brandFooter) parts.push("\n---\n", config.brandFooter);
    return normalizeUnicode(parts.join("\n"));
  };
}

export interface CountryConverterConfig extends BaseConverterConfig {
  basePath?: string;
  taxBasePath?: string;
  currencyBasePath?: string;
  paymentMethodBasePath?: string;
  parentTitle?: string;
  platformContext?: string;
}

export interface CountryEntryData {
  title: string;
  description?: string;
  countryName: string;
  currencyCode: string;
  localPaymentMethods?: string[];
  relatedTax?: string[];
  relatedCurrencies?: string[];
}

export function countryConverter(
  config: CountryConverterConfig,
): Converter<CollectionEntry<CountryEntryData>> {
  const basePath = config.basePath ?? "/country";
  return (entry) => {
    const d = entry.data;
    const parts: string[] = [];
    parts.push(
      joinLines(
        `# ${d.title}`,
        d.description && `\n> ${d.description}`,
        `\n- **Country**: ${d.countryName}`,
        `- **Currency**: ${d.currencyCode}`,
        `- **URL**: ${config.siteUrl}${basePath}/${entry.id}`,
        "\n---",
        entry.body && `\n${cleanBody(entry.body)}`,
      ),
    );

    const related: Array<{ title: string; href: string }> = [];
    if (d.relatedTax && config.taxBasePath) {
      for (const slug of d.relatedTax) {
        related.push({
          title: slugToTitle(slug),
          href: `${config.siteUrl}${config.taxBasePath}/${slug}`,
        });
      }
    }
    if (d.relatedCurrencies && config.currencyBasePath) {
      for (const slug of d.relatedCurrencies) {
        related.push({
          title: slug.toUpperCase(),
          href: `${config.siteUrl}${config.currencyBasePath}/${slug}`,
        });
      }
    }
    if (related.length > 0) {
      parts.push(
        renderRelatedLinks({
          custom: related,
          parent: {
            title: config.parentTitle ?? "All Countries",
            href: `${config.siteUrl}${basePath}`,
          },
        }),
      );
    }

    if (config.platformContext) parts.push("\n---\n", config.platformContext);
    if (config.brandFooter) parts.push("\n---\n", config.brandFooter);
    return normalizeUnicode(parts.join("\n"));
  };
}

export interface PaymentMethodConverterConfig extends BaseConverterConfig {
  basePath?: string;
  countryBasePath?: string;
  currencyBasePath?: string;
  parentTitle?: string;
  platformContext?: string;
}

export interface PaymentMethodEntryData {
  title: string;
  description?: string;
  methodType: string;
  relatedCountries?: string[];
  relatedCurrencies?: string[];
}

export function paymentMethodConverter(
  config: PaymentMethodConverterConfig,
): Converter<CollectionEntry<PaymentMethodEntryData>> {
  const basePath = config.basePath ?? "/payment-methods";
  return (entry) => {
    const d = entry.data;
    const parts: string[] = [];
    parts.push(
      joinLines(
        `# ${d.title}`,
        d.description && `\n> ${d.description}`,
        `\n- **Type**: ${d.methodType}`,
        `- **URL**: ${config.siteUrl}${basePath}/${entry.id}`,
        "\n---",
        entry.body && `\n${cleanBody(entry.body)}`,
      ),
    );

    const related: Array<{ title: string; href: string }> = [];
    if (d.relatedCountries && config.countryBasePath) {
      for (const slug of d.relatedCountries) {
        related.push({
          title: slugToTitle(slug),
          href: `${config.siteUrl}${config.countryBasePath}/${slug}`,
        });
      }
    }
    if (d.relatedCurrencies && config.currencyBasePath) {
      for (const slug of d.relatedCurrencies) {
        related.push({
          title: slug.toUpperCase(),
          href: `${config.siteUrl}${config.currencyBasePath}/${slug}`,
        });
      }
    }
    if (related.length > 0) {
      parts.push(
        renderRelatedLinks({
          custom: related,
          parent: {
            title: config.parentTitle ?? "All Payment Methods",
            href: `${config.siteUrl}${basePath}`,
          },
        }),
      );
    }

    if (config.platformContext) parts.push("\n---\n", config.platformContext);
    if (config.brandFooter) parts.push("\n---\n", config.brandFooter);
    return normalizeUnicode(parts.join("\n"));
  };
}

export interface CurrencyConverterConfig extends BaseConverterConfig {
  basePath?: string;
  countryBasePath?: string;
  paymentMethodBasePath?: string;
  parentTitle?: string;
  platformContext?: string;
}

export interface CurrencyEntryData {
  title: string;
  description?: string;
  currencyCode: string;
  currencySymbol: string;
  relatedCountries?: string[];
  relatedPaymentMethods?: string[];
}

export function currencyConverter(
  config: CurrencyConverterConfig,
): Converter<CollectionEntry<CurrencyEntryData>> {
  const basePath = config.basePath ?? "/currency";
  return (entry) => {
    const d = entry.data;
    const parts: string[] = [];
    parts.push(
      joinLines(
        `# ${d.title}`,
        d.description && `\n> ${d.description}`,
        `\n- **Currency**: ${d.currencyCode} (${d.currencySymbol})`,
        `- **URL**: ${config.siteUrl}${basePath}/${entry.id}`,
        "\n---",
        entry.body && `\n${cleanBody(entry.body)}`,
      ),
    );

    const related: Array<{ title: string; href: string }> = [];
    if (d.relatedCountries && config.countryBasePath) {
      for (const slug of d.relatedCountries) {
        related.push({
          title: slugToTitle(slug),
          href: `${config.siteUrl}${config.countryBasePath}/${slug}`,
        });
      }
    }
    if (d.relatedPaymentMethods && config.paymentMethodBasePath) {
      for (const slug of d.relatedPaymentMethods) {
        related.push({
          title: slugToTitle(slug),
          href: `${config.siteUrl}${config.paymentMethodBasePath}/${slug}`,
        });
      }
    }
    if (related.length > 0) {
      parts.push(
        renderRelatedLinks({
          custom: related,
          parent: {
            title: config.parentTitle ?? "All Currencies",
            href: `${config.siteUrl}${basePath}`,
          },
        }),
      );
    }

    if (config.platformContext) parts.push("\n---\n", config.platformContext);
    if (config.brandFooter) parts.push("\n---\n", config.brandFooter);
    return normalizeUnicode(parts.join("\n"));
  };
}

void applyTitleTransform;
