"use client";

export default function RitualScreen({ rituals = [] }: { rituals?: any[] }) {
  return (
    <div className="space-y-4 text-white">
      <h1 className="text-xl font-semibold">Daily Ritual</h1>

      {rituals.length === 0 ? (
        <p className="text-white/60">No rituals available.</p>
      ) : (
        <ul className="space-y-3">
          {rituals.map((ritual, i) => (
            <li
              key={i}
              className="p-4 bg-white/5 border border-white/10 rounded-lg"
            >
              {ritual.name || "Ritual"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
