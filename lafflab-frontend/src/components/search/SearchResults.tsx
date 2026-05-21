"use client";

export default function SearchResults({ results = [] }: { results?: any[] }) {
  if (!results.length) {
    return <p className="text-white/60">No results found.</p>;
  }

  return (
    <ul className="space-y-3 text-white">
      {results.map((item) => (
        <li
          key={item.id}
          className="p-4 bg-white/5 border border-white/10 rounded-lg"
        >
          {item.title || item.name || item.label || "Result"}
        </li>
      ))}
    </ul>
  );
}
