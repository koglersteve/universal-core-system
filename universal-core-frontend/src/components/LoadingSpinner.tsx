"use client";

export default function LoadingSpinner({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="animate-spin h-10 w-10 rounded-full border-4 border-gray-300 border-t-purple-500" />
      <p className="text-gray-400">{label}</p>
    </div>
  );
}
