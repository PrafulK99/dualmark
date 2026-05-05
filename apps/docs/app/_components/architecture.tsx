import { Section, SectionHeader } from "./section";

export function Architecture() {
  return (
    <Section id="how">
      <SectionHeader
        eyebrow="How it works"
        title={
          <>
            Same URL.{" "}
            <span className="text-[var(--color-accent)]">Two formats.</span>{" "}
            Picked by HTTP.
          </>
        }
        description="Dualmark intercepts the request, looks at the Accept header and User-Agent, and sends the right shape. No duplicate URLs. No content team retraining."
      />

      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg-elev-1)]/50">
          <div className="grid grid-cols-1 gap-px bg-[var(--color-border)] lg:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
            <Node
              label="Browser"
              ua="Mozilla/5.0 ..."
              accept="text/html"
              tone="neutral"
            />
            <Connector direction="right" tone="neutral" />
            <DualmarkCore />
            <Connector direction="left" tone="accent" />
            <Node
              label="ChatGPT crawler"
              ua="GPTBot/1.0"
              accept="text/markdown"
              tone="accent"
            />
          </div>

          <div className="grid grid-cols-1 gap-px border-t border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2">
            <ResponsePanel
              format="HTML"
              path="/pricing"
              tone="neutral"
              headers={[
                ["Content-Type", "text/html; charset=utf-8"],
                ["Link", '</pricing.md>; rel="alternate"; type="text/markdown"'],
                ["Vary", "Accept, User-Agent"],
              ]}
            />
            <ResponsePanel
              format="Markdown"
              path="/pricing.md"
              tone="accent"
              headers={[
                ["Content-Type", "text/markdown; charset=utf-8"],
                ["X-Markdown-Tokens", "1284"],
                ["X-Robots-Tag", "noindex"],
                ["Vary", "Accept, User-Agent"],
              ]}
            />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--color-fg-subtle)]">
          Detects 19 known AI bots out of the box. Falls back to{" "}
          <code className="rounded bg-[var(--color-bg-elev-2)] px-1.5 py-0.5 font-mono text-xs text-[var(--color-fg-muted)]">
            Accept
          </code>{" "}
          header for everyone else. Markdown twin sets{" "}
          <code className="rounded bg-[var(--color-bg-elev-2)] px-1.5 py-0.5 font-mono text-xs text-[var(--color-fg-muted)]">
            noindex
          </code>{" "}
          — no duplicate-content penalties.
        </p>
      </div>
    </Section>
  );
}

function Node({
  label,
  ua,
  accept,
  tone,
}: {
  label: string;
  ua: string;
  accept: string;
  tone: "neutral" | "accent";
}) {
  const accentClass =
    tone === "accent"
      ? "text-[var(--color-accent)]"
      : "text-[var(--color-fg-muted)]";
  return (
    <div className="flex flex-col gap-3 bg-[var(--color-bg)] p-6">
      <div className="flex items-center gap-2">
        <span className={`size-2 rounded-full ${tone === "accent" ? "bg-[var(--color-accent)]" : "bg-[var(--color-fg-subtle)]"}`} />
        <span className="text-sm font-semibold text-[var(--color-fg)]">{label}</span>
      </div>
      <div className="space-y-1 font-mono text-[11px] leading-relaxed">
        <div>
          <span className="text-[var(--color-fg-subtle)]">User-Agent: </span>
          <span className={accentClass}>{ua}</span>
        </div>
        <div>
          <span className="text-[var(--color-fg-subtle)]">Accept: </span>
          <span className={accentClass}>{accept}</span>
        </div>
      </div>
    </div>
  );
}

function Connector({
  direction,
  tone,
}: {
  direction: "left" | "right";
  tone: "neutral" | "accent";
}) {
  const color =
    tone === "accent" ? "var(--color-accent)" : "var(--color-fg-subtle)";
  return (
    <div className="hidden items-center justify-center bg-[var(--color-bg)] px-4 lg:flex">
      <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
        <line
          x1={direction === "right" ? "0" : "48"}
          y1="10"
          x2={direction === "right" ? "40" : "8"}
          y2="10"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <polygon
          points={direction === "right" ? "40,5 48,10 40,15" : "8,5 0,10 8,15"}
          fill={color}
        />
      </svg>
    </div>
  );
}

function DualmarkCore() {
  return (
    <div className="relative flex items-center justify-center bg-[var(--color-bg)] p-6">
      <div className="absolute inset-4 rounded-lg bg-[var(--color-accent-soft)]/30 blur-xl" />
      <div className="relative flex flex-col items-center gap-2 rounded-lg border border-[var(--color-accent)]/40 bg-[var(--color-bg-elev-2)] px-6 py-4 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
          @dualmark/core
        </span>
        <span className="text-sm font-semibold text-[var(--color-fg)]">
          Content negotiation
        </span>
        <span className="text-xs text-[var(--color-fg-muted)]">
          detectAIBot · negotiateFormat
        </span>
      </div>
    </div>
  );
}

function ResponsePanel({
  format,
  path,
  headers,
  tone,
}: {
  format: string;
  path: string;
  headers: [string, string][];
  tone: "neutral" | "accent";
}) {
  const labelColor =
    tone === "accent" ? "text-[var(--color-accent)]" : "text-[var(--color-fg-muted)]";
  return (
    <div className="bg-[var(--color-bg)] p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${labelColor}`}>
          → {format} response
        </span>
        <span className="font-mono text-xs text-[var(--color-fg-subtle)]">200 OK</span>
      </div>
      <div className="mb-3 font-mono text-sm text-[var(--color-fg)]">{path}</div>
      <div className="space-y-1 font-mono text-[11px] leading-relaxed">
        {headers.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[140px_1fr] gap-2">
            <span className="text-[var(--color-fg-subtle)]">{k}:</span>
            <span className="break-all text-[var(--color-fg-muted)]">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
