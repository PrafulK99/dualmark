import { describe, it, expect } from "vitest";
import {
  blogConverter,
  caseStudyConverter,
  glossaryConverter,
  legalConverter,
  compareConverter,
  toolConverter,
  videoConverter,
  taxConverter,
  countryConverter,
  paymentMethodConverter,
  currencyConverter,
  productConverter,
  BUILT_IN_CONVERTERS,
} from "../src/index.js";

const SITE = "https://acme.test";

describe("blogConverter", () => {
  const convert = blogConverter({ siteUrl: SITE });
  it("renders title, description, dates, and URL", () => {
    const out = convert({
      id: "first-post",
      data: {
        title: "First Post",
        description: "An intro.",
        author: "Alice",
        publishedDate: new Date("2026-05-01T00:00:00Z"),
        category: "engineering",
      },
      body: "Hello world.",
    });
    expect(out).toContain("# First Post");
    expect(out).toContain("> An intro.");
    expect(out).toContain("- **Author**: Alice");
    expect(out).toContain("- **Published**: 2026-05-01");
    expect(out).toContain("- **URL**: https://acme.test/blog/first-post");
    expect(out).toContain("Hello world.");
    expect(out).toContain("[More engineering articles](https://acme.test/blog/category/engineering)");
    expect(out).toContain("[All articles](https://acme.test/blog)");
  });

  it("supports array categories", () => {
    const out = convert({
      id: "p",
      data: {
        title: "T",
        publishedDate: new Date("2026-01-01T00:00:00Z"),
        category: ["A", "B"],
      },
    });
    expect(out).toContain("- **Category**: A, B");
  });

  it("respects custom basePath", () => {
    const c = blogConverter({ siteUrl: SITE, basePath: "/articles" });
    const out = c({
      id: "x",
      data: { title: "T", publishedDate: new Date("2026-01-01T00:00:00Z") },
    });
    expect(out).toContain("/articles/x");
  });

  it("includes brandFooter when supplied", () => {
    const c = blogConverter({ siteUrl: SITE, brandFooter: "## About Acme\n\nWidgets." });
    const out = c({
      id: "x",
      data: { title: "T", publishedDate: new Date("2026-01-01T00:00:00Z") },
    });
    expect(out).toContain("## About Acme");
  });
});

describe("caseStudyConverter", () => {
  const convert = caseStudyConverter({ siteUrl: SITE, paymentProvider: "Acme Inc" });
  it("renders company, stats, and dates", () => {
    const out = convert({
      id: "widgetco",
      data: {
        title: "WidgetCo Scales 10x",
        description: "How.",
        company: "WidgetCo",
        tag: "SaaS",
        publishedDate: new Date("2026-04-01T00:00:00Z"),
        stats: [
          { value: "10x", label: "Growth" },
          { value: "$1M", label: "Revenue" },
        ],
      },
      body: "The story.",
    });
    expect(out).toContain("# WidgetCo Scales 10x");
    expect(out).toContain("- **Company**: WidgetCo");
    expect(out).toContain("- **Industry**: SaaS");
    expect(out).toContain("- **Payment provider**: Acme Inc");
    expect(out).toContain("- **10x** -- Growth");
    expect(out).toContain("- **$1M** -- Revenue");
    expect(out).toContain("The story.");
  });
});

describe("glossaryConverter", () => {
  const convert = glossaryConverter({ siteUrl: SITE });
  it("renders title, summary, body, learn more", () => {
    const out = convert({
      id: "api",
      data: {
        title: "API",
        summary: "Application Programming Interface.",
        learnMore: [{ title: "REST", href: "/glossary/rest" }],
        canonicalBlog: "/blogs/what-is-an-api",
      },
      body: "An API exposes...",
    });
    expect(out).toContain("# API");
    expect(out).toContain("> Application Programming Interface.");
    expect(out).toContain("/glossary/api");
    expect(out).toContain("## Learn More");
    expect(out).toContain("[REST](https://acme.test/glossary/rest)");
    expect(out).toContain("[Read the full guide](https://acme.test/blogs/what-is-an-api)");
  });

  it("preserves absolute URLs in learnMore", () => {
    const out = convert({
      id: "x",
      data: {
        title: "X",
        learnMore: [{ title: "External", href: "https://example.com/x" }],
      },
    });
    expect(out).toContain("[External](https://example.com/x)");
  });
});

describe("legalConverter", () => {
  const convert = legalConverter({ siteUrl: SITE });
  it("renders title, lastUpdated, and URL", () => {
    const out = convert({
      id: "tos",
      data: { title: "Terms", lastUpdated: new Date("2026-01-01T00:00:00Z") },
      body: "Use at your own risk.",
    });
    expect(out).toContain("# Terms");
    expect(out).toContain("- **Last Updated**: 2026-01-01");
    expect(out).toContain("- **URL**: https://acme.test/legal/tos");
  });
});

describe("compareConverter", () => {
  const convert = compareConverter({ siteUrl: SITE, ourBrandColumn: "Acme" });
  it("renders feature cards and comparison table", () => {
    const out = convert({
      id: "vs-foo",
      data: {
        title: "Acme vs Foo",
        description: "Why Acme.",
        competitorName: "Foo",
        featureCards: [{ title: "Speed", description: "Faster." }],
        comparison: [
          { feature: "Latency", ours: "10ms", competitor: "100ms" },
          { feature: "Price", ours: "$10", competitor: "$50" },
        ],
      },
    });
    expect(out).toContain("# Acme vs Foo");
    expect(out).toContain("## Key Advantages");
    expect(out).toContain("### Speed");
    expect(out).toContain("Faster.");
    expect(out).toContain("| Feature | Acme | Foo |");
    expect(out).toContain("| Latency | 10ms | 100ms |");
    expect(out).toContain("| Price | $10 | $50 |");
  });
});

describe("toolConverter", () => {
  const convert = toolConverter({ siteUrl: SITE });
  it("renders minimal tool entry", () => {
    const out = convert({
      id: "calc",
      data: { title: "Calculator", description: "Math tool." },
      body: "Use it.",
    });
    expect(out).toContain("# Calculator");
    expect(out).toContain("> Math tool.");
    expect(out).toContain("/tools/calc");
    expect(out).toContain("Use it.");
  });
});

describe("videoConverter", () => {
  const convert = videoConverter({ siteUrl: SITE });
  it("renders video entry with URL", () => {
    const out = convert({
      id: "intro",
      data: {
        title: "Intro Video",
        description: "Watch it.",
        videoUrl: "https://youtube.com/watch?v=abc",
      },
    });
    expect(out).toContain("# Intro Video");
    expect(out).toContain("- **Video**: https://youtube.com/watch?v=abc");
    expect(out).toContain("/videos/intro");
  });
});

describe("taxConverter", () => {
  const convert = taxConverter({
    siteUrl: SITE,
    countryBasePath: "/country",
    currencyBasePath: "/currency",
    parentTitle: "All Tax Guides",
    platformContext: "## About Acme\n\nTax-friendly.",
  });
  it("renders jurisdiction, rate, related links, platform context", () => {
    const out = convert({
      id: "uk-vat",
      data: {
        title: "UK VAT",
        description: "VAT in the UK.",
        jurisdiction: "United Kingdom",
        taxType: "VAT",
        standardRate: "20%",
        relatedCountries: ["united-kingdom"],
        relatedCurrencies: ["gbp"],
      },
    });
    expect(out).toContain("# UK VAT");
    expect(out).toContain("- **Jurisdiction**: United Kingdom");
    expect(out).toContain("- **Tax Type**: VAT");
    expect(out).toContain("- **Standard Rate**: 20%");
    expect(out).toContain("[United Kingdom](https://acme.test/country/united-kingdom)");
    expect(out).toContain("[GBP](https://acme.test/currency/gbp)");
    expect(out).toContain("**Section:** [All Tax Guides](https://acme.test/tax)");
    expect(out).toContain("## About Acme");
  });
});

describe("countryConverter", () => {
  const convert = countryConverter({
    siteUrl: SITE,
    taxBasePath: "/tax",
    currencyBasePath: "/currency",
  });
  it("renders country, currency, related tax", () => {
    const out = convert({
      id: "germany",
      data: {
        title: "Germany",
        countryName: "Germany",
        currencyCode: "EUR",
        relatedTax: ["germany-vat"],
        relatedCurrencies: ["eur"],
      },
    });
    expect(out).toContain("# Germany");
    expect(out).toContain("- **Country**: Germany");
    expect(out).toContain("- **Currency**: EUR");
    expect(out).toContain("[Germany Vat](https://acme.test/tax/germany-vat)");
    expect(out).toContain("[EUR](https://acme.test/currency/eur)");
  });
});

describe("paymentMethodConverter", () => {
  const convert = paymentMethodConverter({
    siteUrl: SITE,
    countryBasePath: "/country",
    currencyBasePath: "/currency",
  });
  it("renders method type and related country/currency", () => {
    const out = convert({
      id: "ideal",
      data: {
        title: "iDEAL",
        methodType: "bank-transfer",
        relatedCountries: ["netherlands"],
        relatedCurrencies: ["eur"],
      },
    });
    expect(out).toContain("# iDEAL");
    expect(out).toContain("- **Type**: bank-transfer");
    expect(out).toContain("[Netherlands](https://acme.test/country/netherlands)");
  });
});

describe("currencyConverter", () => {
  const convert = currencyConverter({
    siteUrl: SITE,
    countryBasePath: "/country",
    paymentMethodBasePath: "/payment-methods",
  });
  it("renders code + symbol + related", () => {
    const out = convert({
      id: "usd",
      data: {
        title: "US Dollar",
        currencyCode: "USD",
        currencySymbol: "$",
        relatedCountries: ["united-states"],
        relatedPaymentMethods: ["card"],
      },
    });
    expect(out).toContain("# US Dollar");
    expect(out).toContain("- **Currency**: USD ($)");
    expect(out).toContain("[United States](https://acme.test/country/united-states)");
    expect(out).toContain("[Card](https://acme.test/payment-methods/card)");
  });
});

describe("productConverter", () => {
  const convert = productConverter({
    siteUrl: SITE,
    section: {
      basePath: "/products",
      displayName: "Products",
      siblings: [
        { slug: "alpha", title: "Alpha" },
        { slug: "beta", title: "Beta" },
        { slug: "gamma", title: "Gamma" },
      ],
    },
    autoFaq: true,
  });

  it("renders title, problem/solution, related siblings, FAQ", () => {
    const out = convert({
      id: "alpha",
      data: {
        title: "Alpha",
        description: "First product.",
        theProblem: [{ title: "Slow", content: "Things are slow." }],
        theSolution: [{ title: "Speed it up", content: "We make it fast." }],
        targetAudience: ["Developers"],
        useCases: ["High-throughput apps"],
        docsUrl: "https://docs.acme.test/alpha",
        faqs: [{ question: "Is it ready?", answer: "Yes." }],
        relatedPages: [{ title: "Pricing", href: "/pricing" }],
      },
      body: "Long-form description.",
    });
    expect(out).toContain("# Alpha");
    expect(out).toContain("- **Product area**: Products");
    expect(out).toContain("- **Documentation**: https://docs.acme.test/alpha");
    expect(out).toContain("## The Problem");
    expect(out).toContain("### Slow");
    expect(out).toContain("## The Solution");
    expect(out).toContain("## Who This Is For");
    expect(out).toContain("- Developers");
    expect(out).toContain("## Use Cases");
    expect(out).toContain("## FAQ");
    expect(out).toContain("### Is it ready?");
    expect(out).toContain("### What problem does slow solve?");
    expect(out).toContain("[Beta](https://acme.test/products/beta)");
    expect(out).toContain("[Gamma](https://acme.test/products/gamma)");
    expect(out).not.toContain("[Alpha](https://acme.test/products/alpha)");
    expect(out).toContain("[Pricing](https://acme.test/pricing)");
    expect(out).toContain("[API Documentation](https://docs.acme.test/alpha)");
  });

  it("disables auto FAQ when autoFaq=false", () => {
    const c = productConverter({
      siteUrl: SITE,
      section: { basePath: "/x", displayName: "X", siblings: [] },
      autoFaq: false,
    });
    const out = c({
      id: "y",
      data: {
        title: "Y",
        theProblem: [{ title: "P", content: "p" }],
      },
    });
    expect(out).not.toContain("What problem does p solve?");
  });

  it("uses platformContext callback when provided", () => {
    const c = productConverter({
      siteUrl: SITE,
      section: { basePath: "/x", displayName: "X", siblings: [] },
      platformContext: ({ siteUrl }) => `\n## Platform: ${siteUrl}\n`,
    });
    const out = c({ id: "y", data: { title: "Y" } });
    expect(out).toContain(`## Platform: ${SITE}`);
  });
});

describe("BUILT_IN_CONVERTERS export", () => {
  it("lists all 12 built-in names", () => {
    expect(BUILT_IN_CONVERTERS).toEqual([
      "blog",
      "case-study",
      "glossary",
      "legal",
      "compare",
      "product",
      "tool",
      "video",
      "tax",
      "country",
      "payment-method",
      "currency",
    ]);
  });
});
