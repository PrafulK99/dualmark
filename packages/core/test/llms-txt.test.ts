import { describe, it, expect } from "vitest";
import { renderLlmsTxt } from "../src/llms-txt.js";

describe("renderLlmsTxt", () => {
  it("renders brand H1", () => {
    const out = renderLlmsTxt({ brandName: "Acme", sections: [] });
    expect(out.startsWith("# Acme\n")).toBe(true);
  });

  it("renders description as blockquote", () => {
    const out = renderLlmsTxt({
      brandName: "Acme",
      description: "Widgets for everyone.",
      sections: [],
    });
    expect(out).toContain("> Widgets for everyone.");
  });

  it("renders sections with H2 + links", () => {
    const out = renderLlmsTxt({
      brandName: "Acme",
      sections: [
        {
          title: "Products",
          links: [
            { title: "Widget", href: "https://example.com/widget", description: "Our widget" },
          ],
        },
      ],
    });
    expect(out).toContain("## Products");
    expect(out).toContain("- [Widget](https://example.com/widget): Our widget");
  });

  it("renders section description before links", () => {
    const out = renderLlmsTxt({
      brandName: "Acme",
      sections: [
        {
          title: "Docs",
          description: "Technical references.",
          links: [{ title: "API", href: "/api" }],
        },
      ],
    });
    expect(out.indexOf("Technical references.")).toBeLessThan(out.indexOf("- [API]"));
  });

  it("ends with a single trailing newline", () => {
    const out = renderLlmsTxt({ brandName: "Acme", sections: [] });
    expect(out.endsWith("\n")).toBe(true);
    expect(out.endsWith("\n\n")).toBe(false);
  });

  it("collapses excess blank lines", () => {
    const out = renderLlmsTxt({
      brandName: "Acme",
      description: "x",
      sections: [
        { title: "A", links: [{ title: "1", href: "/1" }] },
      ],
    });
    expect(out).not.toMatch(/\n{3,}/);
  });
});
