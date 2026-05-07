export default function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" className="stroke-white/60" strokeWidth="2" />
      <circle cx="12" cy="8" r="1.2" className="fill-white/80" />
      <path
        d="M11 11h2v6h-2"
        className="stroke-white/80"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
