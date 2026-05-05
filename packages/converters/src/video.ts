import { joinLines, cleanBody } from "@dualmark/core";
import type { BaseConverterConfig, CollectionEntry, Converter } from "./types.js";

export interface VideoConverterConfig extends BaseConverterConfig {
  basePath?: string;
}

export interface VideoEntryData {
  title: string;
  description?: string;
  videoUrl: string;
}

export function videoConverter(
  config: VideoConverterConfig,
): Converter<CollectionEntry<VideoEntryData>> {
  const basePath = config.basePath ?? "/videos";
  return (entry) =>
    joinLines(
      `# ${entry.data.title}`,
      entry.data.description && `\n> ${entry.data.description}`,
      `\n- **URL**: ${config.siteUrl}${basePath}/${entry.id}`,
      `- **Video**: ${entry.data.videoUrl}`,
      "\n---",
      entry.body && `\n${cleanBody(entry.body)}`,
      config.brandFooter && "\n---",
      config.brandFooter && `\n${config.brandFooter}`,
    );
}
