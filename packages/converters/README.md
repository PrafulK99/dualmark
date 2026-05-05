# @dualmark/converters

Production-tested markdown converter factories for the Dualmark AEO framework.

## Install

```bash
pnpm add @dualmark/converters @dualmark/core
```

## Available converters

| Factory | Domain |
|---|---|
| `blogConverter` | Blog posts |
| `caseStudyConverter` | Case studies (with stats) |
| `glossaryConverter` | Glossary terms (with learn-more + canonical-blog) |
| `legalConverter` | Legal pages |
| `compareConverter` | Comparison pages (us vs competitor table) |
| `productConverter` | Product pages with siblings, FAQ auto-generation |
| `toolConverter` | Standalone tools |
| `videoConverter` | Video pages |
| `taxConverter` | Tax pSEO with country/currency/payment-method cross-links |
| `countryConverter` | Country pSEO |
| `paymentMethodConverter` | Payment method pSEO |
| `currencyConverter` | Currency pSEO |

## Usage

```ts
import { blogConverter } from "@dualmark/converters";

const convert = blogConverter({
  siteUrl: "https://example.com",
  basePath: "/blog",
  brandFooter: "## About Acme\n\nWe build widgets.",
});

const md = convert({
  id: "first-post",
  data: { title: "Hello", publishedDate: new Date(), author: "Alice" },
  body: "Long-form content.",
});
```

Each factory takes a config object and returns a `(entry) => string` converter. Pass them to `@dualmark/astro` collection config or call directly from your own framework.

## License

MIT
