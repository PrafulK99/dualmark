import { Adapters } from "./_components/adapters";
import { Architecture } from "./_components/architecture";
import { ConformanceDemo } from "./_components/conformance-demo";
import { Converters } from "./_components/converters";
import { CTA } from "./_components/cta";
import { Hero } from "./_components/hero";
import { StatsStrip } from "./_components/stats-strip";
import { Why } from "./_components/why";

export default function HomePage() {
  return (
    <main className="relative isolate">
      <Hero />
      <StatsStrip />
      <Why />
      <Architecture />
      <ConformanceDemo />
      <Converters />
      <Adapters />
      <CTA />
    </main>
  );
}
