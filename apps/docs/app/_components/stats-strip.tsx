const stats = [
  { value: "253", label: "Tests passing", sub: "across 5 packages" },
  { value: "125/125", label: "Conformance score", sub: "on the reference example" },
  { value: "0", label: "Runtime deps", sub: "in @dualmark/core" },
  { value: "30s", label: "Time to install", sub: "and verify your first page" },
];

export function StatsStrip() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-elev-1)]/40">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px bg-[var(--color-border)] lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center gap-1 bg-[var(--color-bg)] px-6 py-10 text-center"
          >
            <div className="font-mono text-4xl font-medium tracking-tight text-[var(--color-fg)] md:text-5xl">
              {s.value}
            </div>
            <div className="text-sm font-medium text-[var(--color-fg)]">{s.label}</div>
            <div className="text-xs text-[var(--color-fg-subtle)]">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
