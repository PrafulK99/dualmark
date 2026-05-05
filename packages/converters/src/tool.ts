import { joinLines, cleanBody } from "@dualmark/core";
import type { BaseConverterConfig, CollectionEntry, Converter } from "./types.js";

export interface ToolConverterConfig extends BaseConverterConfig {
  basePath?: string;
}

export interface ToolEntryData {
  title: string;
  description: string;
}

export function toolConverter(
  config: ToolConverterConfig,
): Converter<CollectionEntry<ToolEntryData>> {
  const basePath = config.basePath ?? "/tools";
  return (entry) =>
    joinLines(
      `# ${entry.data.title}`,
      `\n> ${entry.data.description}`,
      `\n- **URL**: ${config.siteUrl}${basePath}/${entry.id}`,
      "\n---",
      entry.body && `\n${cleanBody(entry.body)}`,
      config.brandFooter && "\n---",
      config.brandFooter && `\n${config.brandFooter}`,
    );
}
