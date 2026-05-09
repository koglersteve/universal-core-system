"use client";

export default function AccountIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="9" r="3" className="stroke-white/80" strokeWidth="2" />
      <path
        d="M6 19c0-2.5 2.5-4.5 6-4.5s6 2 6 4.5"
        className="stroke-white/60"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
