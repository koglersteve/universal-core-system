"use client";

export default function Component({ type }) {
  const isInline = type === "inline";

  return (
    <div
      className={
        isInline
          ? "w-full py-4 flex justify-center items-center bg-white/5 text-neutral-400 text-sm"
          : "w-full py-2 flex justify-center items-center bg-white/5 text-neutral-400 text-xs"
      }
    >
      {isInline ? "Sponsored · Inline Ad" : "Sponsored · Banner Ad"}
    </div>
  );
}
