import type { Metadata } from "next";
import { PlaygroundClient } from "./playground-client";

export const metadata: Metadata = {
  title: "Score your site — Dualmark",
  description:
    "Free AI agent readiness score. Paste any URL, get a 0–125 conformance score against the AEO Spec v1.0. See exactly what to fix to be cited by ChatGPT, Claude, and Perplexity.",
};

export default function PlayPage() {
  return <PlaygroundClient />;
}
