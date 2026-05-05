import Link from "next/link";
import { CodeBlock, Tok } from "./code-block";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="absolute inset-0 bg-grid mask-radial-fade opacity-60" />
      <div className="absolute left-1/2 top-0 -z-10 h-[640px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.14_195/0.18),transparent_60%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-24 pt-20 md:px-8 md:pb-32 md:pt-28">
        <Link
          href="https://github.com/dodopayments/dualmark"
          className="group mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev-1)]/70 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)] backdrop-blur transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
        >
          <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
          AEO Spec v1.0 — now open source
          <span aria-hidden className="opacity-60 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>

        <h1 className="max-w-4xl text-balance text-center text-5xl font-semibold tracking-tight text-[var(--color-fg)] md:text-7xl">
          The AEO infrastructure your{" "}
          <span className="bg-gradient-to-r from-[var(--color-accent-strong)] via-[var(--color-accent)] to-[oklch(0.78_0.14_280)] bg-clip-text text-transparent">
            marketing site
          </span>{" "}
          is missing.
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-center text-lg text-[var(--color-fg-muted)] md:text-xl">
          Your blog ranks #1 on Google. ChatGPT cites your competitor.
          <br className="hidden md:inline" />
          That's not a content problem — it's an infrastructure problem.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/docs"
            className="group inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--color-fg)] px-6 font-medium text-[var(--color-bg)] transition-all hover:bg-[var(--color-accent-strong)] hover:text-[var(--color-bg)]"
          >
            Read the docs
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <InstallCommand />
        </div>

        <div className="mt-20 w-full max-w-3xl animate-[var(--animate-fade-in-up)]">
          <CodeBlock filename="astro.config.mjs" language="js">
            <Tok c="kw">import</Tok>
            <Tok c="punct"> {"{ "}</Tok>
            <Tok c="var">defineConfig</Tok>
            <Tok c="punct">{" }"} </Tok>
            <Tok c="kw">from</Tok>
            <Tok c="str"> "astro/config"</Tok>
            <Tok c="punct">;</Tok>
            {"\n"}
            <Tok c="kw">import</Tok>
            <Tok c="var"> dualmark </Tok>
            <Tok c="kw">from</Tok>
            <Tok c="str"> "@dualmark/astro"</Tok>
            <Tok c="punct">;</Tok>
            {"\n\n"}
            <Tok c="kw">export default</Tok>
            <Tok c="fn"> defineConfig</Tok>
            <Tok c="punct">{"({"}</Tok>
            {"\n  "}
            <Tok c="prop">site</Tok>
            <Tok c="punct">: </Tok>
            <Tok c="str">"https://yourcompany.com"</Tok>
            <Tok c="punct">,</Tok>
            {"\n  "}
            <Tok c="prop">integrations</Tok>
            <Tok c="punct">: [</Tok>
            {"\n    "}
            <Tok c="fn">dualmark</Tok>
            <Tok c="punct">{"({"}</Tok>
            {"\n      "}
            <Tok c="prop">collections</Tok>
            <Tok c="punct">: {"{"}</Tok>
            {"\n        "}
            <Tok c="prop">blog</Tok>
            <Tok c="punct">: {"{ "}</Tok>
            <Tok c="prop">converter</Tok>
            <Tok c="punct">: </Tok>
            <Tok c="str">"blog"</Tok>
            <Tok c="punct">{" },"}</Tok>
            <Tok c="com">{"   // /blog/*.md auto-generated"}</Tok>
            {"\n        "}
            <Tok c="prop">glossary</Tok>
            <Tok c="punct">: {"{ "}</Tok>
            <Tok c="prop">converter</Tok>
            <Tok c="punct">: </Tok>
            <Tok c="str">"glossary"</Tok>
            <Tok c="punct">{" },"}</Tok>
            {"\n      "}
            <Tok c="punct">{"},"}</Tok>
            {"\n      "}
            <Tok c="prop">llmsTxt</Tok>
            <Tok c="punct">: {"{ "}</Tok>
            <Tok c="prop">enabled</Tok>
            <Tok c="punct">: </Tok>
            <Tok c="kw">true</Tok>
            <Tok c="punct">{" },"}</Tok>
            <Tok c="com">{"               // /llms.txt auto-generated"}</Tok>
            {"\n    "}
            <Tok c="punct">{"}),"}</Tok>
            {"\n  "}
            <Tok c="punct">{"],"}</Tok>
            {"\n"}
            <Tok c="punct">{"});"}</Tok>
          </CodeBlock>
        </div>
      </div>
    </section>
  );
}

function InstallCommand() {
  return (
    <div className="inline-flex h-11 items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] pl-4 pr-2 font-mono text-sm text-[var(--color-fg-muted)]">
      <span className="text-[var(--color-fg-subtle)]">$</span>
      <span>
        <span className="text-[var(--color-accent)]">pnpm</span> add{" "}
        <span className="text-[var(--color-fg)]">@dualmark/astro</span>
      </span>
      <span className="ml-2 inline-flex h-7 items-center rounded-md border border-[var(--color-border)] px-2 font-sans text-[11px] uppercase tracking-wider text-[var(--color-fg-subtle)]">
        copy
      </span>
    </div>
  );
}
