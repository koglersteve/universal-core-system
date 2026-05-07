"use client";

import React from "react";

export default function EmptyState({
  title,
  message,
  icon
}: {
  title: string;
  message?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
      {icon && <div className="mb-4 opacity-70">{icon}</div>}
      <h2 className="text-xl font-semibold text-gray-200">{title}</h2>
      {message && <p className="mt-2 text-sm text-gray-400">{message}</p>}
    </div>
  );
}
