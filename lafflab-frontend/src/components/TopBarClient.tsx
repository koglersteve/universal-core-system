"use client";

export default function Component({ onMenuToggle }) {
  return (
    <div className="h-14 flex items-center px-4 bg-black border-b border-white/10">
      <button
        onClick={onMenuToggle}
        className="text-white text-xl"
      >
        ☰
      </button>

      <div className="flex-1 text-center text-lg font-semibold">
        LAFFlab
      </div>
    </div>
  );
}
