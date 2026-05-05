---
title: AEO at the Edge
description: How Cloudflare Workers + Dualmark deliver markdown to AI bots in single-digit milliseconds.
author: Sisyphus
publishedDate: 2026-05-05
category: architecture
---

Cloudflare Workers run in 300+ cities. When an AI bot from anywhere in the world hits this site, it gets markdown from the nearest edge — typically under **10ms first-byte**.

## The wrapping pattern

`createAEOWorker` is a higher-order Worker. It takes your existing Worker (or, in this example, a thin wrapper around `env.ASSETS`) and adds:

1. AI bot detection
2. Trailing slash normalization
3. Markdown serving from prebuilt static `.md` files
4. Internal/external redirects with markdown notices
5. `Link rel="alternate"` header injection on HTML responses
6. Analytics Engine telemetry

It never touches HTML responses' bodies — the wrapping is **transparent**.
