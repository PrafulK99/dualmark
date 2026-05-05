import type { ReactNode } from "react";

type CodeBlockProps = {
  filename: string;
  language?: string;
  children: ReactNode;
  className?: string;
};

export function CodeBlock({ filename, language = "ts", children, className = "" }: CodeBlockProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] shadow-2xl shadow-black/40 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-elev-2)] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[oklch(0.65_0.22_27)]/70" />
          <span className="size-3 rounded-full bg-[oklch(0.78_0.16_85)]/70" />
          <span className="size-3 rounded-full bg-[oklch(0.72_0.19_145)]/70" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-subtle)]">
          {filename}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-subtle)] opacity-60">
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7] text-[var(--color-fg)]">
        <code>{children}</code>
      </pre>
    </div>
  );
}

type TokenColor =
  | "kw"
  | "fn"
  | "str"
  | "num"
  | "com"
  | "punct"
  | "var"
  | "type"
  | "prop"
  | "tag";

const tokenStyle: Record<TokenColor, string> = {
  kw: "text-[oklch(0.78_0.14_300)]",
  fn: "text-[oklch(0.82_0.14_85)]",
  str: "text-[oklch(0.78_0.16_150)]",
  num: "text-[oklch(0.78_0.16_30)]",
  com: "text-[var(--color-fg-subtle)] italic",
  punct: "text-[var(--color-fg-muted)]",
  var: "text-[var(--color-fg)]",
  type: "text-[oklch(0.82_0.13_195)]",
  prop: "text-[oklch(0.82_0.13_195)]",
  tag: "text-[oklch(0.78_0.16_30)]",
};

export function Tok({
  c,
  children,
}: {
  c: TokenColor;
  children: ReactNode;
}) {
  return <span className={tokenStyle[c]}>{children}</span>;
}
