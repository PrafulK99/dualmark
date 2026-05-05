export interface LlmsTxtSection {
  title: string;
  description?: string;
  links: Array<{ title: string; href: string; description?: string }>;
}

export interface LlmsTxtOptions {
  brandName: string;
  description?: string;
  sections: LlmsTxtSection[];
}

export function renderLlmsTxt(opts: LlmsTxtOptions): string {
  const lines: string[] = [`# ${opts.brandName}`, ""];

  if (opts.description) {
    lines.push(`> ${opts.description}`);
    lines.push("");
  }

  for (const section of opts.sections) {
    lines.push(`## ${section.title}`);
    lines.push("");
    if (section.description) {
      lines.push(section.description);
      lines.push("");
    }
    for (const link of section.links) {
      const desc = link.description ? `: ${link.description}` : "";
      lines.push(`- [${link.title}](${link.href})${desc}`);
    }
    lines.push("");
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
