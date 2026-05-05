"use client";

import { useState } from "react";

const COMMANDS = [
  { mgr: "pnpm", text: "pnpm add @dualmark/astro" },
  { mgr: "npm", text: "npm install @dualmark/astro" },
  { mgr: "yarn", text: "yarn add @dualmark/astro" },
] as const;

export function InstallCommandClient() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const cmd = COMMANDS[active];

  async function copy() {
    try {
      await navigator.clipboard.writeText(cmd.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // ignore clipboard write failures (e.g. insecure context)
    }
  }

  return (
    <div className="inline-flex items-stretch overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] font-mono text-sm">
      <div className="hidden items-center border-r border-[var(--color-border)] px-1 sm:flex">
        {COMMANDS.map((c, i) => (
          <button
            type="button"
            key={c.mgr}
            onClick={() => setActive(i)}
            className={`mx-0.5 my-1 rounded px-2 py-1 text-xs uppercase tracking-wider transition-colors ${
              active === i
                ? "bg-[var(--color-bg-elev-2)] text-[var(--color-fg)]"
                : "text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-muted)]"
            }`}
          >
            {c.mgr}
          </button>
        ))}
      </div>
      <div className="flex h-11 items-center gap-2 px-3 text-[var(--color-fg-muted)]">
        <span className="text-[var(--color-fg-subtle)]">$</span>
        <span className="truncate">
          <span className="text-[var(--color-accent)]">
            {cmd.text.split(" ")[0]}
          </span>{" "}
          <span className="text-[var(--color-fg-muted)]">
            {cmd.text.split(" ")[1]}
          </span>{" "}
          <span className="text-[var(--color-fg)]">
            {cmd.text.split(" ").slice(2).join(" ")}
          </span>
        </span>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy install command"
        className="flex items-center gap-1.5 border-l border-[var(--color-border)] bg-[var(--color-bg-elev-2)] px-3 text-xs uppercase tracking-wider text-[var(--color-fg-subtle)] transition-colors hover:text-[var(--color-accent)]"
      >
        {copied ? (
          <>
            <CheckIcon className="size-3.5" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <CopyIcon className="size-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M9 9V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4M5 9h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m4.5 12.5 5 5 10-11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
