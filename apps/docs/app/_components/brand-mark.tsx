import type { SVGProps } from "react";

export function BrandMark({
  size = 22,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <rect
        x="2"
        y="2"
        width="9"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.75"
      />
      <rect
        x="13"
        y="2"
        width="9"
        height="20"
        rx="2"
        fill="url(#dm-grad)"
      />
      <defs>
        <linearGradient
          id="dm-grad"
          x1="13"
          y1="2"
          x2="22"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#7dd3fc" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Wordmark({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[var(--color-fg)] ${className}`}
    >
      <BrandMark size={size} />
      <span
        className="font-semibold tracking-tight"
        style={{ fontSize: `${Math.round(size * 0.78)}px` }}
      >
        dualmark
      </span>
    </span>
  );
}
