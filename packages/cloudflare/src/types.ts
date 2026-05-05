export interface AssetsBinding {
  fetch: (req: Request | URL | string) => Promise<Response>;
}

export interface AnalyticsEngineWriteOptions {
  blobs?: ReadonlyArray<string>;
  doubles?: ReadonlyArray<number>;
  indexes?: ReadonlyArray<string>;
}

export interface AnalyticsEngineDataset {
  writeDataPoint: (event: AnalyticsEngineWriteOptions) => void;
}

export interface MinimalEnv {
  ASSETS: AssetsBinding;
  [binding: string]: unknown;
}

export interface MinimalExecutionContext {
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException?: () => void;
}

export interface UpstreamWorker<Env = MinimalEnv> {
  fetch: (
    request: Request,
    env: Env,
    ctx: MinimalExecutionContext,
  ) => Promise<Response> | Response;
}

export interface AIRequestInfo {
  url: URL;
  botName: string | null;
  botVendor: string | null;
  acceptHeader: string;
  pathname: string;
  cacheStatus: "hit" | "miss";
  tokens: number;
}

export interface MissInfo {
  url: URL;
  botName: string | null;
  pathname: string;
  acceptHeader: string;
}

export type TrailingSlashMode = "never" | "always" | "preserve";

export interface CreateAEOWorkerOptions<Env extends MinimalEnv = MinimalEnv> {
  upstream: UpstreamWorker<Env>;
  redirects?: {
    internal?: Record<string, string>;
    external?: Record<string, string>;
  };
  skip?: {
    prefixes?: ReadonlyArray<string>;
    extensions?: ReadonlyArray<string>;
  };
  analytics?: {
    binding: string;
  };
  trailingSlash?: TrailingSlashMode;
  headers?: {
    cacheControl?: string;
  };
  hooks?: {
    onAIRequest?: (info: AIRequestInfo) => void | Promise<void>;
    onMiss?: (info: MissInfo) => void | Promise<void>;
  };
  enableLinkHeader?: boolean;
}
