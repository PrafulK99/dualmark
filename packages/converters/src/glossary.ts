import { joinLines, cleanBody, normalizeUnicode } from "@dualmark/core";
import type { BaseConverterConfig, CollectionEntry, Converter } from "./types.js";

export interface GlossaryConverterConfig extends BaseConverterConfig {
  basePath?: string;
}

export interface GlossaryEntryData {
  title: string;
  summary?: string;
  learnMore?: Array<{ title: string; href: string }>;
  canonicalBlog?: string;
}

export function glossaryConverter(
  config: GlossaryConverterConfig,
): Converter<CollectionEntry<GlossaryEntryData>> {
  const basePath = config.basePath ?? "/glossary";
  return (entry) => {
    const parts: string[] = [];
    parts.push(
      joinLines(
        `# ${entry.data.title}`,
        entry.data.summary && `\n> ${entry.data.summary}`,
        `\n- **URL**: ${config.siteUrl}${basePath}/${entry.id}`,
        "\n---",
        entry.body && `\n${cleanBody(entry.body)}`,
      ),
    );

    const learnMore = entry.data.learnMore;
    if (learnMore && learnMore.length > 0) {
      parts.push("\n## Learn More\n");
      for (const link of learnMore) {
        const href = link.href.startsWith("http") ? link.href : `${config.siteUrl}${link.href}`;
        parts.push(`- [${link.title}](${href})`);
      }
    }

    if (entry.data.canonicalBlog) {
      const href = entry.data.canonicalBlog.startsWith("http")
        ? entry.data.canonicalBlog
        : `${config.siteUrl}${entry.data.canonicalBlog}`;
      parts.push(`\n- [Read the full guide](${href})`);
    }

    if (config.brandFooter) parts.push("", "---", config.brandFooter);

    return normalizeUnicode(parts.join("\n"));
  };
}
