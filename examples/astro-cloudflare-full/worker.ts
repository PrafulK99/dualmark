/**
 * Cloudflare Worker entrypoint for the Dualmark astro-cloudflare-full example.
 *
 * Architecture:
 *   - Astro builds to ./dist/ as static HTML + .md twins
 *   - Wrangler `assets.binding = ASSETS` exposes that directory
 *   - createAEOWorker wraps a tiny upstream Worker that just delegates to ASSETS
 *   - The wrapper sits in front of everything: AI bots get markdown, humans get HTML
 */
import { createAEOWorker } from "@dualmark/cloudflare";
import type { MinimalEnv, MinimalExecutionContext } from "@dualmark/cloudflare";

interface Env extends MinimalEnv {
  AI_AGENT_ANALYTICS?: AnalyticsEngineDataset;
}

// Upstream "worker" — for a fully static Astro site, the upstream is just the
// ASSETS binding. createAEOWorker handles bot detection, markdown serving, and
// Link headers; this fallback handles every non-bot, non-markdown request.
const upstream = {
  async fetch(request: Request, env: Env, _ctx: MinimalExecutionContext): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
};

export default createAEOWorker<Env>({
  upstream,
  trailingSlash: "never",
  enableLinkHeader: true,
  analytics: { binding: "AI_AGENT_ANALYTICS" },
  hooks: {
    onAIRequest: (info) => {
      // Hooks run inside the request lifecycle — keep them cheap.
      console.log(
        `[dualmark] ai-hit bot=${info.botName ?? "?"} path=${info.pathname} cache=${info.cacheStatus} tokens=${info.tokens}`,
      );
    },
    onMiss: (info) => {
      console.warn(`[dualmark] miss bot=${info.botName ?? "?"} path=${info.pathname}`);
    },
  },
});
