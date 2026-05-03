"use client";

import React from "react";

type EmptyStateProps = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

export function EmptyState({ title, subtitle, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-16 opacity-80 animate-fadeIn">
      {icon && <div className="mb-4 text-white/40">{icon}</div>}
      <h2 className="text-lg font-semibold text-white/90">{title}</h2>
      {subtitle && (
        <p className="text-sm text-white/50 mt-1 max-w-xs">{subtitle}</p>
      )}
    </div>
  );
}

export const EmptySearchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35m1.1-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
    />
  </svg>
);

export const EmptyHeartIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.14-4.312 2.813C11.285 4.89 9.623 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);

export const EmptyFeedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h10M4 18h6"
    />
  </svg>
);

export const EmptyHistoryIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m4-3a7 7 0 11-7-7"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 9A7.5 7.5 0 0112 1.5"
    />
  </svg>
);

export const EmptyUploadIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16V4m0 0L8 8m4-4 4 4M6 16h12v4H6z"
    />
  </svg>
);
