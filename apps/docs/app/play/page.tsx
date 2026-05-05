import type { Metadata } from "next";
import { PlaygroundClient } from "./playground-client";

export const metadata: Metadata = {
  title: "Playground — Dualmark",
  description:
    "Live tester for the Dualmark content negotiation algorithm. Paste an Accept header + User-Agent, see how @dualmark/core would route it.",
};

export default function PlayPage() {
  return <PlaygroundClient />;
}
