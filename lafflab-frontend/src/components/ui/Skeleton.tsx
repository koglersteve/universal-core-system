"use client";

import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "skeleton",
        "rounded-[var(--radius-md)]",
        className
      )}
    />
  );
}
