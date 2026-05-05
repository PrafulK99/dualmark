import { normalizeUnicode } from "./text.js";

export interface ListingItem {
  title: string;
  href: string;
  description?: string;
}

export interface ListingOptions {
  title: string;
  description: string;
  url: string;
  items: ListingItem[];
  groupBy?: (item: ListingItem) => string;
  footer?: string;
}

export function listingToMarkdown(opts: ListingOptions): string {
  const parts: string[] = [
    `# ${opts.title}`,
    `\n> ${opts.description}`,
    `\n- **URL**: ${opts.url}`,
    "\n---\n",
  ];

  if (opts.groupBy) {
    const groups = new Map<string, ListingItem[]>();
    for (const item of opts.items) {
      const key = opts.groupBy(item);
      const existing = groups.get(key);
      if (existing) {
        existing.push(item);
      } else {
        groups.set(key, [item]);
      }
    }
    for (const [groupName, items] of groups) {
      parts.push(`\n## ${groupName}\n`);
      for (const item of items) {
        parts.push(formatItem(item));
      }
    }
  } else {
    for (const item of opts.items) {
      parts.push(formatItem(item));
    }
  }

  if (opts.footer) {
    parts.push("");
    parts.push(opts.footer);
  }

  return normalizeUnicode(parts.join("\n"));
}

function formatItem(item: ListingItem): string {
  return item.description
    ? `- [${item.title}](${item.href}): ${item.description}`
    : `- [${item.title}](${item.href})`;
}

export interface RelatedLinksGroup {
  title: string;
  href: string;
}

export interface RelatedLinks {
  siblings?: RelatedLinksGroup[];
  parent?: RelatedLinksGroup;
  comparisons?: RelatedLinksGroup[];
  glossary?: RelatedLinksGroup[];
  blogs?: RelatedLinksGroup[];
  docs?: RelatedLinksGroup[];
  custom?: RelatedLinksGroup[];
}

export function renderRelatedLinks(related: RelatedLinks): string {
  const sections: string[] = [];

  const renderGroup = (label: string, links?: RelatedLinksGroup[]) => {
    if (!links || links.length === 0) return;
    const formatted = links.map((l) => `[${l.title}](${l.href})`).join(" | ");
    sections.push(`**${label}:** ${formatted}`);
  };

  renderGroup("Related features", related.siblings);
  if (related.parent) {
    sections.push(`**Section:** [${related.parent.title}](${related.parent.href})`);
  }
  renderGroup("Comparisons", related.comparisons);
  renderGroup("Glossary", related.glossary);
  renderGroup("Further reading", related.blogs);
  renderGroup("Documentation", related.docs);
  renderGroup("See also", related.custom);

  if (sections.length === 0) return "";
  return ["\n## Related Pages\n", ...sections].join("\n");
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function renderFAQSection(faqs: FAQItem[]): string {
  if (!faqs || faqs.length === 0) return "";
  const parts = ["\n## FAQ\n"];
  for (const faq of faqs) {
    parts.push(`### ${faq.question}\n`);
    parts.push(`${faq.answer}\n`);
  }
  return parts.join("\n");
}

export interface PlatformFooter {
  brand: string;
  tagline?: string;
  links: Array<{ title: string; href: string }>;
}

export function renderPlatformFooter(footer: PlatformFooter): string {
  const linkLine = footer.links.map((l) => `[${l.title}](${l.href})`).join(" | ");
  const parts = ["\n---\n"];
  if (footer.tagline) {
    parts.push(`**${footer.brand}** -- ${footer.tagline}`);
  } else {
    parts.push(`**${footer.brand}**`);
  }
  parts.push(linkLine);
  return parts.join("\n");
}
