"use client";

export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="px-4 py-2 border-b border-gray-200">
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}
