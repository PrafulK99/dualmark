import { describe, it, expect, afterEach } from "vitest";
import { estimateTokens, setTokenEstimator, resetTokenEstimator } from "../src/tokens.js";

describe("estimateTokens", () => {
  afterEach(() => resetTokenEstimator());

  it("returns 0 for empty string", () => {
    expect(estimateTokens("")).toBe(0);
  });
  it("returns 0 for whitespace only", () => {
    expect(estimateTokens("   \n\t  ")).toBe(0);
  });
  it("counts whitespace-separated words", () => {
    expect(estimateTokens("hello world foo")).toBe(3);
  });
  it("treats newlines and tabs as separators", () => {
    expect(estimateTokens("a\nb\tc")).toBe(3);
  });
  it("collapses multiple separators", () => {
    expect(estimateTokens("a    b\n\nc")).toBe(3);
  });
});

describe("setTokenEstimator / resetTokenEstimator", () => {
  afterEach(() => resetTokenEstimator());

  it("uses custom estimator", () => {
    setTokenEstimator((t) => t.length);
    expect(estimateTokens("hello")).toBe(5);
  });

  it("resets to default", () => {
    setTokenEstimator((t) => t.length);
    expect(estimateTokens("hi")).toBe(2);
    resetTokenEstimator();
    expect(estimateTokens("hi")).toBe(1);
  });
});
