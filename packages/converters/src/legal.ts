import { joinLines, fmtDate, cleanBody } from "@dualmark/core";
import type { BaseConverterConfig, CollectionEntry, Converter } from "./types.js";

export interface LegalConverterConfig extends BaseConverterConfig {
  basePath?: string;
}

export interface LegalEntryData {
  title: string;
  lastUpdated?: Date;
}

export function legalConverter(
  config: LegalConverterConfig,
): Converter<CollectionEntry<LegalEntryData>> {
  const basePath = config.basePath ?? "/legal";
  return (entry) =>
    joinLines(
      `# ${entry.data.title}`,
      entry.data.lastUpdated && `\n- **Last Updated**: ${fmtDate(entry.data.lastUpdated)}`,
      `- **URL**: ${config.siteUrl}${basePath}/${entry.id}`,
      "\n---",
      entry.body && `\n${cleanBody(entry.body)}`,
      config.brandFooter && "\n---",
      config.brandFooter && `\n${config.brandFooter}`,
    );
}
