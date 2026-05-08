"use client";

export default function TopNav({
  title,
  onMenuToggle,
}: {
  title: string;
  onMenuToggle: () => void;
}) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40 backdrop-blur">
      <h1 className="text-xl font-semibold text-white">{title}</h1>

      <button
        onClick={onMenuToggle}
        className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </header>
  );
}

