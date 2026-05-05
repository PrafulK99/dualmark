import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dualmark — AEO infrastructure for marketing sites";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0a",
        backgroundImage:
          "radial-gradient(circle at 25% 30%, rgba(125,211,252,0.18), transparent 55%), radial-gradient(circle at 75% 75%, rgba(34,211,238,0.10), transparent 55%)",
        padding: "72px 80px",
        fontFamily: "system-ui, sans-serif",
        color: "#fafafa",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="2"
            width="9"
            height="20"
            rx="2"
            stroke="#a1a1aa"
            strokeWidth="1.6"
          />
          <rect
            x="13"
            y="2"
            width="9"
            height="20"
            rx="2"
            fill="url(#g)"
          />
          <defs>
            <linearGradient id="g" x1="13" y1="2" x2="22" y2="22">
              <stop offset="0" stopColor="#7dd3fc" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>
          dualmark
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            maxWidth: 1000,
          }}
        >
          The AEO infrastructure your marketing site is missing.
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#a1a1aa",
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          Same URL. Two formats. Picked by HTTP. Drop into Astro, Cloudflare, or
          Next.js in 30 seconds.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 20,
          color: "#71717a",
          fontFamily: "monospace",
        }}
      >
        <span>$ pnpm add @dualmark/astro</span>
        <span>dualmark.dev</span>
      </div>
    </div>,
    { ...size },
  );
}
