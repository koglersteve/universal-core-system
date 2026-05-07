export default function DraftsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" className="stroke-white/70" />
      <path d="M8 8h8" className="stroke-white/70" />
      <path d="M8 12h5" className="stroke-white/70" />
    </svg>
  );
}
