import { Section, SectionHeader } from "./section";

const converters = [
  { name: "blog", desc: "Long-form posts", example: "Engineering posts, customer stories" },
  { name: "case-study", desc: "Customer wins", example: "Logos with stats and pull-quote" },
  { name: "changelog", desc: "Release notes", example: "Keep-a-Changelog grouped sections" },
  { name: "compare", desc: "Us vs. competitor", example: '"Stripe alternative" pages' },
  { name: "docs", desc: "Documentation", example: "Getting started, API guides" },
  { name: "feature", desc: "Feature pages", example: "Problem/solution + FAQ + siblings" },
  { name: "glossary", desc: "Term definitions", example: '"What is a payment gateway?"' },
  { name: "legal", desc: "Policy pages", example: "Terms, Privacy, DPA" },
  { name: "pricing", desc: "Pricing tables", example: "Tiers with highlights and CTAs" },
  { name: "pseo", desc: "Programmatic SEO", example: '"SEO services in San Francisco"' },
  { name: "tool", desc: "Standalone calculators", example: '"Currency converter"' },
  { name: "video", desc: "Video landing pages", example: "Webinar replays" },
];

export function Converters() {
  return (
    <Section id="converters">
      <SectionHeader
        eyebrow="@dualmark/converters"
        title={
          <>
            12 page types,{" "}
            <span className="text-[var(--color-accent)]">one converter each.</span>
          </>
        }
        description="Every marketing site has the same shapes. We shipped them. Plug them into your collections — or write your own."
      />

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
        {converters.map((c) => (
          <div
            key={c.name}
            className="group relative flex flex-col gap-2 bg-[var(--color-bg)] p-5 transition-colors hover:bg-[var(--color-bg-elev-1)]"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-sm font-medium text-[var(--color-accent)]">
                {c.name}
              </span>
              <span
                aria-hidden
                className="font-mono text-xs text-[var(--color-fg-subtle)] opacity-0 transition-opacity group-hover:opacity-100"
              >
                .ts →
              </span>
            </div>
            <div className="text-base text-[var(--color-fg)]">{c.desc}</div>
            <div className="text-sm text-[var(--color-fg-subtle)]">{c.example}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
