"use client";

export default function CollabIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="9" cy="10" r="2.5" className="stroke-white/80" strokeWidth="2" />
      <circle cx="15" cy="10" r="2.5" className="stroke-white/60" strokeWidth="2" />
      <path
        d="M5.5 18c0-2 1.6-3.5 3.5-3.5S12.5 16 12.5 18"
        className="stroke-white/80"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11.5 18c0-2 1.6-3.5 3.5-3.5S18.5 16 18.5 18"
        className="stroke-white/60"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
