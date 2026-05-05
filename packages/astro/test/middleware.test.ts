import { describe, it, expect } from "vitest";
import { dualmarkOnRequest } from "../src/middleware.js";

describe("dualmarkOnRequest middleware", () => {
  it("injects Link rel=alternate on HTML responses", async () => {
    const res = await dualmarkOnRequest(
      { url: new URL("https://example.com/blog/hello"), request: new Request("https://example.com/blog/hello") },
      async () => new Response("<html></html>", { headers: { "Content-Type": "text/html" } }),
    );
    expect(res.headers.get("link")).toContain('</blog/hello.md>; rel="alternate"; type="text/markdown"');
    expect(res.headers.get("vary")).toContain("Accept");
  });

  it("does not modify non-HTML responses", async () => {
    const res = await dualmarkOnRequest(
      { url: new URL("https://example.com/data.json"), request: new Request("https://example.com/data.json") },
      async () => new Response("{}", { headers: { "Content-Type": "application/json" } }),
    );
    expect(res.headers.get("link")).toBeNull();
  });

  it("does not modify .md responses", async () => {
    const res = await dualmarkOnRequest(
      { url: new URL("https://example.com/blog/hello.md"), request: new Request("https://example.com/blog/hello.md") },
      async () => new Response("# x", { headers: { "Content-Type": "text/html" } }),
    );
    expect(res.headers.get("link")).toBeNull();
  });

  it("uses /index.md for root", async () => {
    const res = await dualmarkOnRequest(
      { url: new URL("https://example.com/"), request: new Request("https://example.com/") },
      async () => new Response("<html></html>", { headers: { "Content-Type": "text/html" } }),
    );
    expect(res.headers.get("link")).toContain("/index.md");
  });
});
