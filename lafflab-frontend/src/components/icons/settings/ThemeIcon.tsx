"use client";

export default function ThemeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3a9 9 0 0 0 0 18c4.97 0 9-4.03 9-9 0-3.87-3.13-7-7-7-1.1 0-2 .9-2 2 0 1.66-1.34 3-3 3-1.1 0-2-.9-2-2 0-2.76 2.24-5 5-5Z"
        className="fill-white/70"
      />
    </svg>
  );
}

