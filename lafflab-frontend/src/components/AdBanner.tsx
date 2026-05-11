"use client";

export default function AdBanner({ type }: { type: "permanent" | "inline" }) {
  return (
    <div
      className={`w-full text-center text-sm py-2 ${
        type === "permanent"
          ? "bg-neutral-900 border-b border-white/10"
          : "bg-neutral-800 my-4 rounded-lg"
      }`}
    >
      <span className="text-neutral-400">Ad space</span>
    </div>
  );
}
