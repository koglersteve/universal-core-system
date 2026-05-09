"use client";

export default function DraftsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 5h9l3 3v11H6z"
        className="stroke-white/70"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 11h4M10 15h3"
        className="stroke-white/60"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
