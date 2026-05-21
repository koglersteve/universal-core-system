"use client";

export default function StatusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle
        cx="12"
        cy="12"
        r="9"
        className="stroke-white/70"
        strokeWidth="2"
      />
      <path
        d="M12 7v5l3 3"
        className="stroke-white/60"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
