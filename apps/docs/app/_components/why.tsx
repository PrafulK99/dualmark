import { Section, SectionHeader } from "./section";

const rows = [
  {
    problem: "AI cites competitors instead of you",
    without: "Bots scrape your HTML, get nav menus + JS errors, pick the cleaner source.",
    with: "Same URL serves clean markdown to bots, polished HTML to humans.",
  },
  {
    problem: "No way to know if you're discoverable",
    without: '"We hope ChatGPT can read this."',
    with: "dualmark verify returns a 0–125 score with line-item failures.",
  },
  {
    problem: "llms.txt proposal keeps changing",
    without: "Hand-maintained, drifts from sitemap.",
    with: "Auto-generated from the same config that drives your routes.",
  },
  {
    problem: "Every team rebuilds this",
    without: "Custom middleware in every repo, none of them quite right.",
    with: "One battle-tested package, conforms to a public spec.",
  },
  {
    problem: "No analytics for AI traffic",
    without: '"Was that a bot or a human?"',
    with: "onAIRequest hook + Cloudflare Analytics: bot name, page, tokens, country.",
  },
];

export function Why() {
  return (
    <Section id="why">
      <SectionHeader
        eyebrow="Why marketing teams need this"
        title={
          <>
            You already invested in SEO.
            <br />
            Now invest in <span className="text-[var(--color-accent)]">AEO</span>.
          </>
        }
        description="For a fraction of the effort. Drop in alongside your existing stack — your HTML pages don't change."
      />

      <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)]">
        <div className="hidden grid-cols-[1.2fr_1fr_1fr] border-b border-[var(--color-border)] bg-[var(--color-bg-elev-2)] lg:grid">
          <div className="px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-subtle)]">
            Problem
          </div>
          <div className="border-l border-[var(--color-border)] px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-subtle)]">
            Without Dualmark
          </div>
          <div className="border-l border-[var(--color-border)] px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)]">
            With Dualmark
          </div>
        </div>

        {rows.map((row, i) => (
          <div
            key={row.problem}
            className={`grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] ${
              i > 0 ? "border-t border-[var(--color-border)]" : ""
            } ${i % 2 === 0 ? "bg-[var(--color-bg)]" : "bg-[var(--color-bg-elev-1)]/30"}`}
          >
            <div className="px-6 py-5 text-base font-medium text-[var(--color-fg)]">
              {row.problem}
            </div>
            <div className="border-[var(--color-border)] px-6 py-5 text-sm text-[var(--color-fg-muted)] lg:border-l">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg-subtle)] lg:hidden">
                Without —{" "}
              </span>
              {row.without}
            </div>
            <div className="border-[var(--color-border)] bg-[var(--color-accent-soft)]/40 px-6 py-5 text-sm text-[var(--color-fg)] lg:border-l">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)] lg:hidden">
                With —{" "}
              </span>
              {row.with}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
