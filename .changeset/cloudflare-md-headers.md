---
"@dualmark/cloudflare": minor
---

Direct `.md` URLs (e.g. `/blog/post.md`) now receive the full set of AEO headers (`Content-Type`, `X-Markdown-Tokens`, `X-Robots-Tag`, `Vary: Accept`, `X-Content-Type-Options: nosniff`) when fetched from `ASSETS` binding. Previously only content-negotiated responses got the full header set, leaving direct `.md` requests at the edge under-decorated.
