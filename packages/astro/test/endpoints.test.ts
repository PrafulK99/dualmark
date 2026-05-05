import { describe, it, expect } from "vitest";
import { makeStaticEndpoint } from "../src/endpoints/static.js";
import { makeListingEndpoint } from "../src/endpoints/listing.js";
import { makeCollectionDetailEndpoint } from "../src/endpoints/collection.js";
import { makeParameterizedEndpoint } from "../src/endpoints/parameterized.js";
import { makeLlmsTxtEndpoint } from "../src/endpoints/llms-txt.js";

describe("makeStaticEndpoint", () => {
  it("returns markdown response from render fn", async () => {
    const ep = makeStaticEndpoint({ render: () => "# Static" });
    const res = await ep.GET();
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(await res.text()).toBe("# Static");
  });

  it("supports async render fn", async () => {
    const ep = makeStaticEndpoint({ render: async () => "# Async" });
    const res = await ep.GET();
    expect(await res.text()).toBe("# Async");
  });
});

interface FakeEntry {
  id: string;
  data: { title?: string; description?: string };
  body?: string;
}

describe("makeListingEndpoint", () => {
  it("renders listing markdown with mapped items", async () => {
    const ep = makeListingEndpoint<FakeEntry>({
      collectionName: "blog",
      siteUrl: "https://example.com",
      basePath: "/blog",
      title: "Blog",
      description: "All posts.",
      getCollection: async () => [
        { id: "a", data: { title: "Post A", description: "First" } },
        { id: "b", data: { title: "Post B" } },
      ],
    });
    const res = await ep.GET();
    const body = await res.text();
    expect(body).toContain("# Blog");
    expect(body).toContain("> All posts.");
    expect(body).toContain("[Post A](/blog/a): First");
    expect(body).toContain("[Post B](/blog/b)");
  });

  it("respects sort", async () => {
    const ep = makeListingEndpoint<FakeEntry>({
      collectionName: "blog",
      siteUrl: "https://example.com",
      basePath: "/blog",
      title: "T",
      description: "d",
      getCollection: async () => [
        { id: "b", data: { title: "B" } },
        { id: "a", data: { title: "A" } },
      ],
      sort: (x, y) => x.id.localeCompare(y.id),
    });
    const body = await (await ep.GET()).text();
    expect(body.indexOf("(/blog/a)")).toBeLessThan(body.indexOf("(/blog/b)"));
  });
});

describe("makeCollectionDetailEndpoint", () => {
  it("uses converter and exports getStaticPaths + GET", async () => {
    const ep = makeCollectionDetailEndpoint<FakeEntry>({
      collectionName: "blog",
      converter: (entry) => `# ${entry.data.title ?? entry.id}`,
      getCollection: async () => [
        { id: "x", data: { title: "X" } },
        { id: "y", data: { title: "Y" } },
      ],
    });
    const paths = await ep.getStaticPaths();
    expect(paths).toEqual([
      { params: { slug: "x" }, props: { entry: { id: "x", data: { title: "X" } } } },
      { params: { slug: "y" }, props: { entry: { id: "y", data: { title: "Y" } } } },
    ]);
    const res = ep.GET({ props: { entry: { id: "x", data: { title: "X" } } } });
    expect(await res.text()).toBe("# X");
  });
});

describe("makeParameterizedEndpoint", () => {
  it("invokes render with params", async () => {
    const ep = makeParameterizedEndpoint({
      getStaticPaths: () => [{ params: { category: "engineering" } }],
      render: ({ params }) => `# Category: ${params.category}`,
    });
    const res = await ep.GET({ params: { category: "engineering" } });
    expect(await res.text()).toBe("# Category: engineering");
  });
});

describe("makeLlmsTxtEndpoint", () => {
  it("renders llms.txt with text/plain content type", async () => {
    const ep = makeLlmsTxtEndpoint({
      brandName: "Acme",
      description: "Widgets.",
      sections: [
        {
          title: "Products",
          links: [{ title: "Widget", href: "https://acme.test/widget" }],
        },
      ],
    });
    const res = ep.GET();
    expect(res.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(res.headers.get("x-robots-tag")).toBe("noindex");
    const body = await res.text();
    expect(body).toContain("# Acme");
    expect(body).toContain("> Widgets.");
    expect(body).toContain("## Products");
    expect(body).toContain("[Widget](https://acme.test/widget)");
  });
});
