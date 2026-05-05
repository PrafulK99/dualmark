import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Wordmark } from "@/app/_components/brand-mark";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Wordmark size={20} />,
    },
    githubUrl: "https://github.com/dodopayments/dualmark",
    links: [
      { text: "Quickstart", url: "/docs/quickstart", active: "nested-url" },
      { text: "Spec", url: "/docs/spec/overview", active: "nested-url" },
      { text: "Playground", url: "/play", active: "nested-url" },
    ],
  };
}
