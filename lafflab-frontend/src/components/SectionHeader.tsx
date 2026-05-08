"use client";

export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="px-4 py-3 border-b border-white/10 bg-black/30 backdrop-blur">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </div>
  );
}
