"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./brand-mark";

const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/spec/overview", label: "Spec" },
  { href: "/play", label: "Playground" },
];

export function UnifiedNav() {
  const pathname = usePathname() || "/";

  if (pathname.startsWith("/docs")) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-bg)]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between border-b border-[var(--color-border)] px-5 md:px-8">
        <Link
          href="/"
          className="-ml-1 inline-flex items-center rounded-md px-1 py-0.5 transition-opacity hover:opacity-80"
        >
          <Wordmark size={20} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/play"
                ? pathname.startsWith("/play")
                : pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "text-[var(--color-fg)]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/dodopayments/dualmark"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elev-1)] px-3 text-sm text-[var(--color-fg-muted)] transition-all hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
          >
            <GitHubIcon className="size-4" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
          <Link
            href="/docs/quickstart"
            className="inline-flex h-9 items-center rounded-md bg-[var(--color-fg)] px-3.5 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-90 md:px-4"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.94 10.94 0 0 1 5.74 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.77 1.07.77 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
