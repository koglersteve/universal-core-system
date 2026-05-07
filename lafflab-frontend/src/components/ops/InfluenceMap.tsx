"use client";

export default function InfluenceMap({ data = [] }: { data?: any[] }) {
  return (
    <div className="space-y-4 text-white">
      <h1 className="text-xl font-semibold">Influence Map</h1>

      {data.length === 0 ? (
        <p className="text-white/60">No influence data available.</p>
      ) : (
        <ul className="space-y-3">
          {data.map((item, i) => (
            <li
              key={i}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              {item.label || "Node"} — {item.value ?? "0"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
