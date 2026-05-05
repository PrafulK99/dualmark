"use client";

import {
  detectAIBot,
  negotiateFormat,
  parseAcceptHeader,
} from "@dualmark/core";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type PresetKey =
  | "browser"
  | "gptbot"
  | "claudebot"
  | "perplexity"
  | "md-only"
  | "json-only";

const presets: Record<PresetKey, { accept: string; ua: string; label: string }> =
  {
    browser: {
      label: "Browser",
      accept:
        "text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8",
      ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
    },
    gptbot: {
      label: "GPTBot",
      accept: "*/*",
      ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.0; +https://openai.com/gptbot",
    },
    claudebot: {
      label: "ClaudeBot",
      accept: "*/*",
      ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ClaudeBot/1.0; +claudebot@anthropic.com",
    },
    perplexity: {
      label: "PerplexityBot",
      accept: "*/*",
      ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot",
    },
    "md-only": {
      label: "Accept: text/markdown",
      accept: "text/markdown",
      ua: "curl/8.0",
    },
    "json-only": {
      label: "Accept: application/json",
      accept: "application/json",
      ua: "curl/8.0",
    },
  };

type Verdict = "markdown" | "html" | "notacceptable";

const verdictMeta: Record<
  Verdict,
  { label: string; tone: string; chip: string }
> = {
  markdown: {
    label: "→ Serve text/markdown",
    tone: "var(--color-accent-strong)",
    chip:
      "border-[oklch(0.78_0.14_195/0.35)] bg-[oklch(0.78_0.14_195/0.12)] text-[var(--color-accent-strong)]",
  },
  html: {
    label: "→ Serve text/html",
    tone: "#c4b5fd",
    chip:
      "border-[oklch(0.78_0.14_300/0.35)] bg-[oklch(0.78_0.14_300/0.12)] text-[#c4b5fd]",
  },
  notacceptable: {
    label: "→ 406 Not Acceptable",
    tone: "var(--color-danger)",
    chip:
      "border-[var(--color-danger)]/35 bg-[var(--color-danger)]/12 text-[var(--color-danger)]",
  },
};

export function PlaygroundClient() {
  const [accept, setAccept] = useState(presets.browser.accept);
  const [ua, setUa] = useState(presets.browser.ua);
  const [activePreset, setActivePreset] = useState<PresetKey | null>("browser");

  const result = useMemo(() => {
    const a = accept.trim();
    const u = ua.trim();
    const bot = detectAIBot(u);
    const fmt = negotiateFormat(a);
    const parsed = parseAcceptHeader(a);

    let serveAs: Verdict;
    let reason: string;

    if (bot.isBot) {
      serveAs = "markdown";
      reason = `Bot UA detected (${bot.name ?? "unknown"} / ${
        bot.vendor ?? "?"
      }) — serve markdown regardless of Accept`;
    } else if (fmt === "markdown") {
      serveAs = "markdown";
      reason = "Accept negotiation prefers text/markdown";
    } else if (fmt === "html") {
      serveAs = "html";
      reason = "Accept negotiation prefers text/html (default)";
    } else {
      serveAs = "notacceptable";
      reason =
        "Accept header excludes both text/html and text/markdown — return 406";
    }

    return { bot, parsed, serveAs, reason };
  }, [accept, ua]);

  useEffect(() => {
    if (!activePreset) return;
    const p = presets[activePreset];
    if (p.accept !== accept || p.ua !== ua) setActivePreset(null);
  }, [accept, ua, activePreset]);

  const v = verdictMeta[result.serveAs];

  return (
    <main className="relative isolate min-h-[calc(100vh-3.5rem)]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,oklch(0.78_0.14_195/0.18),transparent_70%)]" />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-16">
        <div className="mb-10 flex flex-col items-start gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
            Playground
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-[var(--color-fg)] md:text-5xl">
            Try the negotiation algorithm.
          </h1>
          <p className="max-w-2xl text-pretty text-base text-[var(--color-fg-muted)] md:text-lg">
            Paste an{" "}
            <code className="rounded border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] px-1.5 py-0.5 font-mono text-sm text-[var(--color-fg)]">
              Accept
            </code>{" "}
            header and{" "}
            <code className="rounded border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] px-1.5 py-0.5 font-mono text-sm text-[var(--color-fg)]">
              User-Agent
            </code>{" "}
            below. See how{" "}
            <Link
              href="/docs/packages/core"
              className="text-[var(--color-accent)] hover:underline"
            >
              <code className="font-mono">@dualmark/core</code>
            </Link>{" "}
            would negotiate. All computation runs in your browser — same logic
            that runs on the edge.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Accept header" htmlFor="play-accept">
            <textarea
              id="play-accept"
              rows={3}
              value={accept}
              onChange={(e) => setAccept(e.target.value)}
              placeholder="text/markdown, text/html;q=0.9"
              className="w-full resize-y rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] px-3 py-2.5 font-mono text-sm text-[var(--color-fg)] outline-none transition-colors focus:border-[var(--color-accent)]"
            />
          </Field>
          <Field label="User-Agent" htmlFor="play-ua">
            <textarea
              id="play-ua"
              rows={3}
              value={ua}
              onChange={(e) => setUa(e.target.value)}
              placeholder="GPTBot/1.0"
              className="w-full resize-y rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] px-3 py-2.5 font-mono text-sm text-[var(--color-fg)] outline-none transition-colors focus:border-[var(--color-accent)]"
            />
          </Field>
        </div>

        <div className="my-6 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
            Presets:
          </span>
          {(Object.keys(presets) as PresetKey[]).map((k) => {
            const p = presets[k];
            const active = activePreset === k;
            return (
              <button
                type="button"
                key={k}
                onClick={() => {
                  setAccept(p.accept);
                  setUa(p.ua);
                  setActivePreset(k);
                }}
                className={`min-h-9 rounded-md border px-3 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]"
                    : "border-[var(--color-border)] bg-[var(--color-bg-elev-1)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <section className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-elev-2)] px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-[oklch(0.65_0.22_27)]/70" />
              <span className="size-3 rounded-full bg-[oklch(0.78_0.16_85)]/70" />
              <span className="size-3 rounded-full bg-[oklch(0.72_0.19_145)]/70" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-subtle)]">
              negotiation result
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-subtle)] opacity-60">
              live
            </span>
          </div>

          <div className="space-y-6 px-5 py-6 md:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span
                className={`inline-flex items-center self-start rounded-md border px-3 py-1.5 font-mono text-sm font-medium ${v.chip}`}
              >
                {v.label}
              </span>
              <p className="text-sm text-[var(--color-fg-muted)] sm:text-right">
                {result.reason}
              </p>
            </div>

            <ResultTable
              title="AI bot detection"
              rows={[
                {
                  k: "Is bot",
                  v: result.bot.isBot ? "yes" : "no",
                  tone: result.bot.isBot
                    ? "var(--color-success)"
                    : "var(--color-fg-subtle)",
                },
                { k: "Name", v: result.bot.name ?? "—" },
                { k: "Vendor", v: result.bot.vendor ?? "—" },
              ]}
            />

            <ResultTable
              title="Parsed Accept (sorted by q)"
              rows={
                result.parsed.length > 0
                  ? result.parsed.map((p) => ({
                      k: `${p.type}/${p.subtype}`,
                      v: `q=${p.quality.toFixed(2)}`,
                    }))
                  : [{ k: "(no media types parsed)", v: "" }]
              }
              monoKey
            />
          </div>
        </section>

        <p className="mt-10 text-center text-sm text-[var(--color-fg-subtle)]">
          Same negotiation logic ships in{" "}
          <Link
            href="/docs/packages/core"
            className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:underline"
          >
            @dualmark/core
          </Link>{" "}
          ·{" "}
          <Link
            href="/docs/packages/cloudflare"
            className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:underline"
          >
            @dualmark/cloudflare
          </Link>{" "}
          ·{" "}
          <Link
            href="/docs/packages/astro"
            className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:underline"
          >
            @dualmark/astro
          </Link>
        </p>
      </div>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-fg)]">
        {label}
      </span>
      {children}
    </label>
  );
}

function ResultTable({
  title,
  rows,
  monoKey,
}: {
  title: string;
  rows: { k: string; v: string; tone?: string }[];
  monoKey?: boolean;
}) {
  return (
    <div>
      <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
        {title}
      </h3>
      <div className="overflow-hidden rounded-md border border-[var(--color-border)]">
        {rows.map((r, i) => (
          <div
            key={`${r.k}-${i}`}
            className={`grid grid-cols-[140px_1fr] gap-3 px-3 py-2 text-sm ${
              i > 0 ? "border-t border-[var(--color-border)]" : ""
            } ${i % 2 === 0 ? "bg-[var(--color-bg)]" : "bg-[var(--color-bg-elev-2)]/50"}`}
          >
            <span
              className={`text-xs uppercase tracking-wider text-[var(--color-fg-subtle)] ${monoKey ? "font-mono normal-case tracking-normal" : ""}`}
            >
              {r.k}
            </span>
            <span
              className="font-mono text-sm"
              style={{ color: r.tone ?? "var(--color-fg)" }}
            >
              {r.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
