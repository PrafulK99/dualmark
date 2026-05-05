import Link from "next/link";
import { Section } from "./section";

export function CTA() {
  return (
    <Section className="pt-12">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg-elev-1)]/40 px-6 py-16 text-center md:px-12 md:py-24">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="absolute left-1/2 top-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.14_195/0.15),transparent_60%)]" />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)] backdrop-blur">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
            Ready to ship
          </span>

          <h2 className="text-balance text-4xl font-semibold tracking-tight text-[var(--color-fg)] md:text-6xl">
            Make every page{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent-strong)] to-[oklch(0.78_0.14_280)] bg-clip-text text-transparent">
              dual-marked.
            </span>
          </h2>

          <p className="text-pretty text-base text-[var(--color-fg-muted)] md:text-lg">
            30 seconds to install. 80–125 conformance score on your first build.
            Open source, MIT licensed, no telemetry.
          </p>

          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/docs/quickstart"
              className="group inline-flex h-12 items-center gap-2 rounded-lg bg-[var(--color-fg)] px-7 font-medium text-[var(--color-bg)] transition-all hover:bg-[var(--color-accent-strong)]"
            >
              Quickstart
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <Link
              href="https://github.com/dodopayments/dualmark"
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] px-7 font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elev-2)]"
            >
              <GitHubIcon className="size-4" />
              Star on GitHub
            </Link>
          </div>

          <div className="mt-4 flex items-center gap-6 text-xs text-[var(--color-fg-subtle)]">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--color-success)]" />
              MIT licensed
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--color-success)]" />
              Zero telemetry
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--color-success)]" />
              Public spec
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </Section>
  );
}

function Footer() {
  return (
    <footer className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-[var(--color-border)] pt-10 text-sm text-[var(--color-fg-subtle)] sm:flex-row">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg)]">
          Dualmark
        </span>
        <span className="text-[var(--color-fg-subtle)]">·</span>
        <span>
          Built at{" "}
          <Link
            href="https://dodopayments.com"
            className="text-[var(--color-fg-muted)] hover:text-[var(--color-accent)]"
          >
            Dodo Payments
          </Link>
        </span>
      </div>
      <div className="flex items-center gap-5">
        <Link href="/docs" className="hover:text-[var(--color-fg)]">
          Docs
        </Link>
        <Link href="/docs/spec" className="hover:text-[var(--color-fg)]">
          Spec
        </Link>
        <Link
          href="https://github.com/dodopayments/dualmark"
          className="hover:text-[var(--color-fg)]"
        >
          GitHub
        </Link>
        <Link
          href="https://github.com/dodopayments/dualmark/blob/main/LICENSE"
          className="hover:text-[var(--color-fg)]"
        >
          MIT
        </Link>
      </div>
    </footer>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.94 10.94 0 0 1 5.74 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.77 1.07.77 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
