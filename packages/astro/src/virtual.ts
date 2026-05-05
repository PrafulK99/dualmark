import type { ResolvedDualmarkConfig } from "./types.js";

declare const __DUALMARK_CONFIG__: ResolvedDualmarkConfig;

export function getDualmarkConfig(): ResolvedDualmarkConfig {
  return __DUALMARK_CONFIG__;
}
