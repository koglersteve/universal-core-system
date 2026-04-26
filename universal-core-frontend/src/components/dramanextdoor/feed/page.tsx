"use client";

export default function Feed({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="p-4 text-gray-400">
        No drama in the feed yet…
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="p-3 border rounded bg-gray-50 shadow-sm"
        >
          <p className="text-gray-800">{item}</p>
        </div>
      ))}
    </div>
  );
}
