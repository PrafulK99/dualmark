"use client";

import { useMemo, useState } from "react";

interface CombinedAIButtonProps {
  rawUrl: string;
  githubUrl: string;
  title: string;
}

export function CombinedAIButton({ rawUrl, githubUrl, title }: CombinedAIButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const absoluteRawUrl = useMemo(() => {
    if (typeof window === "undefined") return rawUrl;
    return new URL(rawUrl, window.location.origin).toString();
  }, [rawUrl]);

  const aiQuery = useMemo(
    () => `Read ${absoluteRawUrl} — I want to ask questions about ${title}.`,
    [absoluteRawUrl, title],
  );

  const chatgptUrl = `https://chat.openai.com/?q=${encodeURIComponent(aiQuery)}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(aiQuery)}`;
  const t3Url = `https://t3.chat/new?q=${encodeURIComponent(aiQuery)}`;

  async function handleCopyPage() {
    try {
      const res = await fetch(rawUrl);
      if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative inline-flex items-center gap-1">
      <button
        type="button"
        onClick={handleCopyPage}
        className="inline-flex h-8 items-center gap-1.5 rounded-l-md border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] px-3 text-xs font-medium text-[var(--color-fg)] transition-colors hover:bg-[var(--color-bg-elev-2)] hover:border-[var(--color-border-strong)]"
        aria-label="Copy page as markdown"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {copied ? "Copied" : "Copy page"}
      </button>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex h-8 items-center justify-center rounded-r-md border border-l-0 border-[var(--color-border)] bg-[var(--color-bg-elev-1)] px-2 text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-elev-2)] hover:text-[var(--color-fg)] hover:border-[var(--color-border-strong)]"
        aria-label="More actions"
      >
        <ChevronDownIcon />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <div
            role="menu"
            className="absolute right-0 top-9 z-50 w-64 overflow-hidden rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-elev-2)] shadow-lg shadow-black/40"
          >
            <MenuLink href={rawUrl} icon={<MarkdownIcon />} label="View as markdown" external />
            <MenuLink href={githubUrl} icon={<GitHubIcon />} label="Open on GitHub" external />
            <div className="my-1 border-t border-[var(--color-border)]" />
            <MenuLink href={chatgptUrl} icon={<SparkleIcon />} label="Open in ChatGPT" external />
            <MenuLink href={claudeUrl} icon={<SparkleIcon />} label="Open in Claude" external />
            <MenuLink href={t3Url} icon={<SparkleIcon />} label="Open in T3 Chat" external />
          </div>
        </>
      )}
    </div>
  );
}

function MenuLink({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-2.5 px-3 py-2 text-xs text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-elev-3)] hover:text-[var(--color-fg)]"
    >
      <span className="flex size-4 items-center justify-center text-[var(--color-fg-subtle)]">{icon}</span>
      <span className="flex-1">{label}</span>
      {external && <ExternalIcon />}
    </a>
  );
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function MarkdownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M6 9v6" />
      <path d="M6 9l3 3 3-3v6" />
      <path d="M14 15l3-3-3-3" />
      <path d="M14 12h4" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
