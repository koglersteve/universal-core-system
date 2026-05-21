"use client";

export default function DraftsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 5h9l3 3v11H6z" />
      <path d="M10 11h4M10 15h3" />
    </svg>
  );
}
