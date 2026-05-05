import { describe, it, expect } from "vitest";
import {
  listingToMarkdown,
  renderRelatedLinks,
  renderFAQSection,
  renderPlatformFooter,
} from "../src/composition.js";

describe("listingToMarkdown", () => {
  it("renders title, description, URL, and items", () => {
    const md = listingToMarkdown({
      title: "All Posts",
      description: "Every post we wrote.",
      url: "https://example.com/posts",
      items: [
        { title: "Post A", href: "/posts/a", description: "First" },
        { title: "Post B", href: "/posts/b" },
      ],
    });
    expect(md).toContain("# All Posts");
    expect(md).toContain("> Every post we wrote.");
    expect(md).toContain("- **URL**: https://example.com/posts");
    expect(md).toContain("- [Post A](/posts/a): First");
    expect(md).toContain("- [Post B](/posts/b)");
  });

  it("groups items when groupBy is supplied", () => {
    const md = listingToMarkdown({
      title: "Library",
      description: "x",
      url: "u",
      items: [
        { title: "A", href: "/a", description: "fiction" },
        { title: "B", href: "/b", description: "non" },
        { title: "C", href: "/c", description: "fiction" },
      ],
      groupBy: (item) => item.description ?? "Other",
    });
    expect(md).toContain("## fiction");
    expect(md).toContain("## non");
  });

  it("appends footer when provided", () => {
    const md = listingToMarkdown({
      title: "T",
      description: "d",
      url: "u",
      items: [],
      footer: "FOOTER",
    });
    expect(md).toContain("FOOTER");
  });
});

describe("renderRelatedLinks", () => {
  it("returns empty string when no groups have content", () => {
    expect(renderRelatedLinks({})).toBe("");
  });

  it("renders siblings under 'Related features'", () => {
    const out = renderRelatedLinks({
      siblings: [{ title: "Sib", href: "/s" }],
    });
    expect(out).toContain("**Related features:** [Sib](/s)");
  });

  it("renders parent under 'Section'", () => {
    const out = renderRelatedLinks({
      parent: { title: "P", href: "/p" },
    });
    expect(out).toContain("**Section:** [P](/p)");
  });

  it("renders all groups separated by pipes", () => {
    const out = renderRelatedLinks({
      siblings: [
        { title: "A", href: "/a" },
        { title: "B", href: "/b" },
      ],
      docs: [{ title: "Docs", href: "/d" }],
    });
    expect(out).toContain("[A](/a) | [B](/b)");
    expect(out).toContain("**Documentation:** [Docs](/d)");
  });

  it("starts with 'Related Pages' heading", () => {
    const out = renderRelatedLinks({ siblings: [{ title: "X", href: "/x" }] });
    expect(out).toContain("## Related Pages");
  });
});

describe("renderFAQSection", () => {
  it("returns empty string when no FAQs", () => {
    expect(renderFAQSection([])).toBe("");
  });

  it("renders questions as h3 with answers", () => {
    const out = renderFAQSection([
      { question: "Q1?", answer: "A1." },
      { question: "Q2?", answer: "A2." },
    ]);
    expect(out).toContain("## FAQ");
    expect(out).toContain("### Q1?");
    expect(out).toContain("A1.");
    expect(out).toContain("### Q2?");
    expect(out).toContain("A2.");
  });
});

describe("renderPlatformFooter", () => {
  it("renders brand, tagline and links", () => {
    const out = renderPlatformFooter({
      brand: "Acme",
      tagline: "We build widgets.",
      links: [
        { title: "Home", href: "/" },
        { title: "Docs", href: "/docs" },
      ],
    });
    expect(out).toContain("**Acme** -- We build widgets.");
    expect(out).toContain("[Home](/) | [Docs](/docs)");
  });

  it("handles missing tagline", () => {
    const out = renderPlatformFooter({
      brand: "Acme",
      links: [{ title: "x", href: "/x" }],
    });
    expect(out).toContain("**Acme**");
    expect(out).not.toMatch(/\*\*Acme\*\* --/);
  });
});
