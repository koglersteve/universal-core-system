"use client";

export default function ActionButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-3 rounded-lg bg-pink-600 text-white text-base shadow-md active:scale-95 transition-transform"
    >
      {label}
    </button>
  );
}
