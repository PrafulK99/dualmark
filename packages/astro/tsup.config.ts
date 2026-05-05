import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/middleware.ts",
    "src/virtual.ts",
    "src/endpoints/collection.ts",
    "src/endpoints/listing.ts",
    "src/endpoints/static.ts",
    "src/endpoints/parameterized.ts",
    "src/endpoints/llms-txt.ts",
  ],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  target: "es2022",
  external: [
    "@dualmark/core",
    "@dualmark/converters",
    "astro",
    "astro:content",
    "astro:middleware",
    "virtual:dualmark/config",
  ],
});
