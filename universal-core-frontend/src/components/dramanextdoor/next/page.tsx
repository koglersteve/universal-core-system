"use client";

export default function Next({ onNext }) {
  return (
    <button
      onClick={onNext}
      className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
    >
      Next Scene →
    </button>
  );
}
