export default function ExperimentsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M9 3h6M10 3v4.5L5.6 17a2 2 0 0 0 1.8 3h9.2a2 2 0 0 0 1.8-3L14 7.5V3"
        className="stroke-white/70"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 14h6"
        className="stroke-white/40"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
