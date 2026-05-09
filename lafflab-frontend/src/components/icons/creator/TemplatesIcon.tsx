"use client";

export default function TemplatesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
        className="stroke-white/70"
        strokeWidth="2"
      />
      <path
        d="M8 9h8M8 13h5"
        className="stroke-white/60"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
