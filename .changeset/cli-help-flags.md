---
"@dualmark/cli": minor
---

`dualmark verify --help` and `dualmark verify -h` now print help and exit 0, matching standard CLI UX. Previously these exited 2 ("missing `<url>`") because the parser only recognized help flags as the first argument. Internal refactor: `cli.ts` is now a thin shim over `main.ts` to eliminate duplicated parsing logic.
