"use client";

import Link from "next/link";
import { type FormEvent, type ReactNode, useState } from "react";
import { BrandMark } from "../_components/brand-mark";

type Severity = "required" | "recommended";
type Level = "Advanced" | "Standard" | "Basic" | "Below Basic";

interface CheckSummary {
  id: string;
  description: string;
  severity: Severity;
  weight: number;
  message: string;
}

interface ScoreResult {
  url: string;
  mdUrl: string;
  score: number;
  maxScore: number;
  percentage: number;
  ratio: number;
  level: Level;
  durationMs: number;
  skippedNegotiation: boolean;
  passed: CheckSummary[];
  failed: CheckSummary[];
}

const EXAMPLES = [
  { label: "dodopayments.com", url: "https://dodopayments.com" },
  { label: "developers.cloudflare.com", url: "https://developers.cloudflare.com" },
  { label: "docs.anthropic.com", url: "https://docs.anthropic.com/en/docs/get-started" },
  { label: "vercel.com", url: "https://vercel.com" },
  { label: "stripe.com", url: "https://stripe.com" },
  { label: "linear.app", url: "https://linear.app" },
];

const LEVEL_TONE: Record<Level, { color: string; bg: string; border: string }> =
  {
    Advanced: {
      color: "var(--color-success)",
      bg: "oklch(0.78 0.18 150 / 0.12)",
      border: "oklch(0.78 0.18 150 / 0.35)",
    },
    Standard: {
      color: "var(--color-accent-strong)",
      bg: "var(--color-accent-soft)",
      border: "rgba(198, 254, 30, 0.45)",
    },
    Basic: {
      color: "var(--color-warning)",
      bg: "oklch(0.82 0.16 85 / 0.12)",
      border: "oklch(0.82 0.16 85 / 0.35)",
    },
    "Below Basic": {
      color: "var(--color-danger)",
      bg: "oklch(0.68 0.22 27 / 0.12)",
      border: "oklch(0.68 0.22 27 / 0.35)",
    },
  };

const LEVEL_DESCRIPTION: Record<Level, string> = {
  Advanced:
    "Production-grade AI readiness. Your site will be cited by ChatGPT, Claude, and Perplexity reliably.",
  Standard:
    "Solid foundation. Most AI agents can read your content. A few tweaks unlock Advanced.",
  Basic:
    "AI agents can find some content, but you're leaving discoverability on the table.",
  "Below Basic":
    "AI agents likely struggle with this site. The fixes are well-scoped — let's go.",
};

export function PlaygroundClient() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runScore(url: string) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/play/score", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = (await res.json()) as ScoreResult | { error: string };
      if (!res.ok || "error" in data) {
        setError("error" in data ? data.error : `HTTP ${res.status}`);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    runScore(input.trim());
  }

  return (
    <main className="relative isolate min-h-[calc(100vh-3.5rem)]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(198,254,30,0.16),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 bg-grid mask-radial-fade opacity-25" />

      <div className="mx-auto w-full max-w-5xl px-5 py-10 md:px-8 md:py-16">
        <div className="mb-10 flex flex-col items-start gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
            Free · No signup
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-[var(--color-fg)] md:text-5xl">
            Is your site ready for{" "}
            <span className="bg-gradient-to-r from-[#e8ffa8] via-[#c6fe1e] to-[#9ee847] bg-clip-text text-transparent">
              AI agents?
            </span>
          </h1>
          <p className="max-w-2xl text-pretty text-base text-[var(--color-fg-muted)] md:text-lg">
            Paste any public URL. We&apos;ll score it 0–125 against the{" "}
            <Link
              href="/docs/spec/overview"
              className="text-[var(--color-fg)] underline-offset-2 hover:underline"
            >
              AEO Spec v1.0
            </Link>{" "}
            — the same checks ChatGPT, Claude, and Perplexity expect.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mb-3">
          <div className="flex flex-col gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] p-2 shadow-2xl shadow-black/30 sm:flex-row sm:gap-1.5">
            <div className="flex flex-1 items-center gap-2 px-3">
              <UrlIcon className="size-4 text-[var(--color-fg-subtle)]" />
              <input
                type="text"
                inputMode="url"
                placeholder="https://yourcompany.com"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="h-10 w-full bg-transparent font-mono text-sm text-[var(--color-fg)] outline-none placeholder:text-[var(--color-fg-subtle)] disabled:opacity-60"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-ink)] transition-all hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <SpinIcon className="size-4 animate-spin" />
                  Scoring…
                </>
              ) : (
                <>
                  Score it
                  <span aria-hidden>→</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mb-10 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
            Try:
          </span>
          {EXAMPLES.map((ex) => (
            <button
              type="button"
              key={ex.url}
              onClick={() => {
                setInput(ex.url);
                runScore(ex.url);
              }}
              disabled={loading}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] px-2.5 py-1 font-mono text-xs text-[var(--color-fg-muted)] transition-all hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)] disabled:opacity-50"
            >
              {ex.label}
            </button>
          ))}
        </div>

        {error && <ErrorPanel message={error} />}
        {loading && <LoadingPanel url={input.trim()} />}
        {result && !loading && <ResultPanel result={result} />}
        {!result && !loading && !error && <EmptyState />}

        <p className="mt-12 text-center text-xs text-[var(--color-fg-subtle)]">
          Same scoring engine as{" "}
          <Link
            href="/docs/packages/cli"
            className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:underline"
          >
            <code className="font-mono">@dualmark/cli</code>
          </Link>
          . We fetch from our server (not yours) — your URL is not stored or
          logged.
        </p>
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-elev-1)]/30 px-6 py-16 text-center">
      <BrandMark size={36} className="opacity-60" />
      <h3 className="text-base font-medium text-[var(--color-fg)]">
        Paste a URL to get started
      </h3>
      <p className="max-w-sm text-sm text-[var(--color-fg-muted)]">
        We&apos;ll run 14 checks against the AEO Spec and show you exactly
        what&apos;s working — and what to fix.
      </p>
    </div>
  );
}

function LoadingPanel({ url }: { url: string }) {
  const steps = [
    "Fetching markdown twin",
    "Verifying response headers",
    "Checking content negotiation",
    "Scoring against spec",
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev-1)]">
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-bg-elev-2)] px-5 py-3">
        <BrandMark size={18} />
        <span className="truncate font-mono text-xs text-[var(--color-fg-muted)]">
          {url || "Fetching…"}
        </span>
        <span className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)]">
          <SpinIcon className="size-3 animate-spin" />
          Running
        </span>
      </div>
      <ul className="divide-y divide-[var(--color-border)]">
        {steps.map((s, i) => (
          <li
            key={s}
            className="flex items-center gap-3 px-5 py-3 text-sm text-[var(--color-fg-muted)]"
            style={{
              animation: `var(--animate-fade-in)`,
              animationDelay: `${i * 0.4}s`,
              animationFillMode: "both",
            }}
          >
            <SpinIcon className="size-3.5 animate-spin text-[var(--color-accent)]" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ErrorPanel({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 px-5 py-4">
      <AlertIcon className="mt-0.5 size-4 shrink-0 text-[var(--color-danger)]" />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-[var(--color-fg)]">
          Couldn&apos;t score that URL
        </span>
        <span className="text-sm text-[var(--color-fg-muted)]">{message}</span>
      </div>
    </div>
  );
}

function ResultPanel({ result }: { result: ScoreResult }) {
  const tone = LEVEL_TONE[result.level];
  const required = result.failed.filter((c) => c.severity === "required");
  const recommended = result.failed.filter((c) => c.severity === "recommended");

  return (
    <div className="flex flex-col gap-4">
      <section
        className="overflow-hidden rounded-2xl border bg-[var(--color-bg-elev-1)] shadow-2xl shadow-black/30"
        style={{ borderColor: tone.border }}
      >
        <div className="grid gap-6 px-6 py-7 md:grid-cols-[auto_1fr] md:gap-8 md:px-8">
          <ScoreGauge result={result} tone={tone} />
          <div className="flex flex-col justify-center gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{
                  background: tone.bg,
                  color: tone.color,
                  borderColor: tone.border,
                }}
              >
                {result.level}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-subtle)]">
                {result.percentage}% conformance
              </span>
            </div>
            <a
              href={result.url}
              target="_blank"
              rel="noreferrer"
              className="break-all text-base font-medium text-[var(--color-fg)] hover:text-[var(--color-accent-strong)] hover:underline"
            >
              {result.url}
            </a>
            <p className="text-sm text-[var(--color-fg-muted)]">
              {LEVEL_DESCRIPTION[result.level]}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-subtle)]">
              <span>
                <span className="text-[var(--color-success)]">
                  {result.passed.length}
                </span>{" "}
                passed
              </span>
              <span>
                <span className="text-[var(--color-danger)]">
                  {required.length}
                </span>{" "}
                required failed
              </span>
              <span>
                <span className="text-[var(--color-warning)]">
                  {recommended.length}
                </span>{" "}
                recommended failed
              </span>
              <span>{result.durationMs}ms</span>
            </div>
          </div>
        </div>
      </section>

      <CheckList
        title="Failed — required"
        accent="var(--color-danger)"
        checks={required}
        emptyMessage="All required checks passed."
      />
      <CheckList
        title="Failed — recommended"
        accent="var(--color-warning)"
        checks={recommended}
        emptyMessage="All recommended checks passed."
      />
      <CheckList
        title={`Passed (${result.passed.length})`}
        accent="var(--color-success)"
        checks={result.passed}
        collapsible
        emptyMessage="No checks passed."
      />

      <NextStepsCard result={result} />
    </div>
  );
}

function ScoreGauge({
  result,
  tone,
}: {
  result: ScoreResult;
  tone: { color: string; bg: string; border: string };
}) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - result.ratio);

  return (
    <div className="flex shrink-0 items-center justify-center">
      <div className="relative size-[140px]">
        <svg
          viewBox="0 0 140 140"
          className="size-full -rotate-90"
          aria-hidden
        >
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="10"
          />
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={tone.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 800ms cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="font-mono text-3xl font-semibold tracking-tight"
            style={{ color: tone.color }}
          >
            {result.score}
          </div>
          <div className="font-mono text-xs text-[var(--color-fg-subtle)]">
            / {result.maxScore}
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckList({
  title,
  accent,
  checks,
  collapsible,
  emptyMessage,
}: {
  title: string;
  accent: string;
  checks: CheckSummary[];
  collapsible?: boolean;
  emptyMessage: string;
}) {
  const [open, setOpen] = useState(!collapsible);

  if (checks.length === 0) {
    return (
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev-1)]/40 px-5 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
            {title}
          </h3>
          <span className="text-xs text-[var(--color-fg-subtle)]">
            {emptyMessage}
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev-1)]/40">
      <button
        type="button"
        onClick={() => collapsible && setOpen((v) => !v)}
        className={`flex w-full items-center justify-between px-5 py-3 text-left ${collapsible ? "cursor-pointer hover:bg-[var(--color-bg-elev-2)]/40" : "cursor-default"}`}
      >
        <h3
          className="font-mono text-[11px] uppercase tracking-[0.16em]"
          style={{ color: accent }}
        >
          {title} · {checks.length}
        </h3>
        {collapsible && (
          <ChevronIcon
            className={`size-4 text-[var(--color-fg-subtle)] transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>
      {open && (
        <ul className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
          {checks.map((c) => (
            <li key={c.id} className="flex items-start gap-3 px-5 py-3">
              <span
                className="mt-1 inline-flex w-12 shrink-0 justify-center rounded px-1 py-0.5 font-mono text-[11px]"
                style={{ background: `${accent}1a`, color: accent }}
              >
                {accent === "var(--color-success)" ? "+" : ""}
                {c.weight}
              </span>
              <div className="flex flex-col gap-0.5">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-mono text-sm text-[var(--color-fg)]">
                    {c.id}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[var(--color-fg-subtle)]">
                    {c.severity}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-fg-muted)]">
                  {c.description}
                </p>
                <p className="font-mono text-xs text-[var(--color-fg-subtle)]">
                  {c.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function NextStepsCard({ result }: { result: ScoreResult }) {
  const requiredCount = result.failed.filter(
    (c) => c.severity === "required",
  ).length;
  const isPerfect = result.failed.length === 0;
  const isAdvanced = result.level === "Advanced";
  const noMarkdownTwin =
    result.failed.length === 1 &&
    result.failed[0]?.id === "md.fetch" &&
    result.passed.length === 0;

  let body: ReactNode;
  if (isPerfect) {
    body = (
      <p className="text-sm text-[var(--color-fg)]">
        Perfect score. Your site is fully AEO Spec v1.0 compliant. Now share
        this result.
      </p>
    );
  } else if (noMarkdownTwin) {
    body = (
      <p className="text-sm text-[var(--color-fg-muted)]">
        This site doesn&apos;t serve a markdown twin yet. Drop in Dualmark in
        ~30 seconds and AI agents will be able to read every page.
      </p>
    );
  } else if (isAdvanced) {
    body = (
      <p className="text-sm text-[var(--color-fg-muted)]">
        You&apos;re at Advanced level — but a few recommended checks would
        tighten the score.
      </p>
    );
  } else {
    body = (
      <p className="text-sm text-[var(--color-fg-muted)]">
        Fix the {requiredCount} required check{requiredCount === 1 ? "" : "s"}{" "}
        above to ship a markdown twin AI agents can actually consume.
      </p>
    );
  }

  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-bg-elev-1)] to-[var(--color-bg-elev-2)] px-6 py-5">
      <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
        Next steps
      </h3>
      {isPerfect ? (
        body
      ) : (
        <div className="flex flex-col gap-3 text-sm text-[var(--color-fg-muted)]">
          {body}
          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              href="/docs/quickstart"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--color-fg)] px-3.5 py-2 text-xs font-medium text-[var(--color-bg)] transition-opacity hover:opacity-90"
            >
              30-second quickstart →
            </Link>
            <Link
              href="/docs/conformance/scoring"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] px-3.5 py-2 text-xs font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-border-strong)]"
            >
              How scoring works
            </Link>
            <Link
              href="/docs/spec/overview"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] px-3.5 py-2 text-xs font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-border-strong)]"
            >
              Read the AEO Spec
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

function UrlIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1m-2 8a4 4 0 0 1-5.66 0 4 4 0 0 1 0-5.66l3-3a4 4 0 0 1 5.66 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function SpinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function AlertIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 8v4m0 3.5h.01"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
