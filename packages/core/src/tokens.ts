type TokenEstimator = (text: string) => number;

const defaultEstimator: TokenEstimator = (text) => text.split(/\s+/).filter(Boolean).length;

let currentEstimator: TokenEstimator = defaultEstimator;

export function estimateTokens(text: string): number {
  return currentEstimator(text);
}

export function setTokenEstimator(fn: TokenEstimator): void {
  currentEstimator = fn;
}

export function resetTokenEstimator(): void {
  currentEstimator = defaultEstimator;
}
