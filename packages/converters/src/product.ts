import {
  cleanBody,
  normalizeUnicode,
  renderFAQSection,
  renderRelatedLinks,
  type FAQItem,
} from "@dualmark/core";
import type { BaseConverterConfig, CollectionEntry, Converter } from "./types.js";

export interface ProductSibling {
  slug: string;
  title: string;
}

export interface ProductSection {
  basePath: string;
  displayName: string;
  siblings: ProductSibling[];
}

export interface ProductConverterConfig extends BaseConverterConfig {
  section: ProductSection;
  platformContext?: (opts: {
    section: ProductSection;
    currentSlug: string;
    siteUrl: string;
  }) => string;
  autoFaq?: boolean;
}

export interface ProductEntryData {
  title: string;
  description?: string;
  theProblem?: Array<{ title: string; content: string }>;
  theSolution?: Array<{ title: string; content: string }>;
  solutionCards?: Array<{ title: string; content: string }>;
  sections?: Array<{ title: string; content: string }>;
  targetAudience?: string[];
  useCases?: string[];
  docsUrl?: string;
  faqs?: FAQItem[];
  relatedPages?: Array<{ title: string; href: string }>;
}

export function productConverter(
  config: ProductConverterConfig,
): Converter<CollectionEntry<ProductEntryData>> {
  const { section } = config;
  const autoFaq = config.autoFaq !== false;

  return (entry) => {
    const d = entry.data;
    const parts: string[] = [`# ${d.title}`];
    if (d.description) parts.push(`\n> ${d.description}`);
    parts.push(`\n- **URL**: ${config.siteUrl}${section.basePath}/${entry.id}`);
    parts.push(`- **Product area**: ${section.displayName}`);
    if (d.docsUrl) parts.push(`- **Documentation**: ${d.docsUrl}`);

    const renderItems = (heading: string, items?: Array<{ title: string; content: string }>) => {
      if (!items || items.length === 0) return;
      parts.push(`\n## ${heading}\n`);
      for (const item of items) {
        const title = item.title
          .replace(/<Highlighted>(.*?)<\/Highlighted>/g, "**$1**")
          .replace(/<br\s*\/?>/g, " ");
        parts.push(`### ${title}\n`);
        parts.push(`${item.content}\n`);
      }
    };

    renderItems("The Problem", d.theProblem);
    renderItems("The Solution", d.theSolution);
    renderItems("Features", d.solutionCards ?? d.sections);

    if (entry.body) {
      parts.push("---");
      parts.push(`\n${cleanBody(entry.body)}`);
    }

    if (d.targetAudience && d.targetAudience.length > 0) {
      parts.push("\n## Who This Is For\n");
      for (const a of d.targetAudience) parts.push(`- ${a}`);
    }
    if (d.useCases && d.useCases.length > 0) {
      parts.push("\n## Use Cases\n");
      for (const u of d.useCases) parts.push(`- ${u}`);
    }

    const manualFaqs = d.faqs ?? [];
    const autoFaqs: FAQItem[] = [];
    if (autoFaq) {
      const firstProblem = d.theProblem?.[0];
      if (firstProblem) {
        const cleanTitle = firstProblem.title
          .replace(/<[^>]+>/g, "")
          .replace(/\s+/g, " ")
          .trim();
        autoFaqs.push({
          question: `What problem does ${cleanTitle.toLowerCase()} solve?`,
          answer: firstProblem.content,
        });
      }
      const firstSolution = d.theSolution?.[0];
      if (firstSolution) {
        autoFaqs.push({
          question: "How does this work?",
          answer: firstSolution.content,
        });
      }
    }
    parts.push(renderFAQSection([...manualFaqs, ...autoFaqs]));

    const siblings = section.siblings
      .filter((s) => s.slug !== entry.id)
      .map((s) => ({ title: s.title, href: `${config.siteUrl}${section.basePath}/${s.slug}` }));

    parts.push(
      renderRelatedLinks({
        siblings,
        parent: { title: section.displayName, href: `${config.siteUrl}${section.basePath}` },
        custom: d.relatedPages?.map((p) => ({
          title: p.title,
          href: p.href.startsWith("http") ? p.href : `${config.siteUrl}${p.href}`,
        })),
        docs: d.docsUrl ? [{ title: "API Documentation", href: d.docsUrl }] : undefined,
      }),
    );

    if (config.platformContext) {
      parts.push(
        config.platformContext({
          section,
          currentSlug: entry.id,
          siteUrl: config.siteUrl,
        }),
      );
    }
    if (config.brandFooter) parts.push("\n---\n", config.brandFooter);

    return normalizeUnicode(parts.join("\n"));
  };
}
