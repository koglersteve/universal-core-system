"use client";

import React from "react";

export function EmptyState({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
}) {
  return (
    <div className="flex flex-col items-center text-center space-y-[var(--space-2)] py-[var(--space-5)] animate-fadeIn">
      <Icon className="w-14 h-14 text-white/40" />

      <h2 className="text-[var(--text-xl)] font-semibold">{title}</h2>

      <p className="text-white/60 text-[var(--text-sm)] max-w-xs">
        {subtitle}
      </p>
    </div>
  );
}

/* Icons remain unchanged */
export const EmptyFeedIcon = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const EmptySearchIcon = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" strokeWidth="1.5" />
    <path strokeWidth="1.5" d="M16 16l4 4" />
  </svg>
);

export const EmptyHeartIcon = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeWidth="1.5"
      d="M12 21s-6.5-4.35-9.5-8.5C-1.5 7.5 2 3 6.5 3c2.5 0 4.5 1.5 5.5 3.09C13 4.5 15 3 17.5 3 22 3 25.5 7.5 21.5 12.5 18.5 16.65 12 21 12 21z"
    />
  </svg>
);

export const EmptyHistoryIcon = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="1.5" d="M12 6v6l4 2" />
    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
  </svg>
);

export const EmptyUploadIcon = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="1.5" d="M12 16V4m0 0l-4 4m4-4l4 4" />
    <path strokeWidth="1.5" d="M4 16v2h16v-2" />
  </svg>
);
