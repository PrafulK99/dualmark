import { cleanBody, normalizeUnicode } from "@dualmark/core";
import type { BaseConverterConfig, CollectionEntry, Converter } from "./types.js";

export interface CompareConverterConfig extends BaseConverterConfig {
  basePath?: string;
  ourBrandColumn: string;
}

export interface CompareEntryData {
  title: string;
  description?: string;
  competitorName?: string;
  featureCards?: Array<{ title: string; description: string }>;
  comparison?: Array<{ feature: string; ours: string; competitor: string }>;
}

export function compareConverter(
  config: CompareConverterConfig,
): Converter<CollectionEntry<CompareEntryData>> {
  const basePath = config.basePath ?? "/compare";
  return (entry) => {
    const d = entry.data;
    const parts: string[] = [`# ${d.title}`];
    if (d.description) parts.push(`\n> ${d.description}`);
    parts.push(`\n- **URL**: ${config.siteUrl}${basePath}/${entry.id}`);

    if (d.featureCards && d.featureCards.length > 0) {
      parts.push("\n## Key Advantages\n");
      for (const card of d.featureCards) {
        parts.push(`### ${card.title}\n`);
        parts.push(`${card.description}\n`);
      }
    }

    if (d.comparison && d.comparison.length > 0) {
      parts.push("## Comparison\n");
      const comp = d.competitorName || "Competitor";
      parts.push(`| Feature | ${config.ourBrandColumn} | ${comp} |`);
      parts.push("|---|---|---|");
      for (const row of d.comparison) {
        parts.push(`| ${row.feature} | ${row.ours} | ${row.competitor} |`);
      }
      parts.push("");
    }

    if (entry.body) {
      parts.push("---");
      parts.push(`\n${cleanBody(entry.body)}`);
    }

    if (config.brandFooter) {
      parts.push("\n---");
      parts.push(config.brandFooter);
    }

    return normalizeUnicode(parts.join("\n"));
  };
}
