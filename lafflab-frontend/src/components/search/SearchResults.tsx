"use client";

export default function SearchResults({ results = [] }: { results?: any[] }) {
  return (
    <div className="space-y-4 text-white">
      {results.length === 0 ? (
        <p className="text-white/60">No results found.</p>
      ) : (
        <ul className="space-y-3">
          {results.map((item, i) => (
            <li
              key={i}
              className="p-4 bg-white/5 border border-white/10 rounded-lg"
            >
              {item.title || "Result"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
