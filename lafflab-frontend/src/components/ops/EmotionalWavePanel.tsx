// FILE: src/components/ops/EmotionalWavePanel.tsx

"use client";

export default function EmotionalWavePanel({ data = [] }: { data?: any[] }) {
  return (
    <div className="space-y-4 text-white">
      <h1 className="text-xl font-semibold">Emotional Wave</h1>

      {data.length === 0 ? (
        <p className="text-white/60">No emotional wave data available.</p>
      ) : (
        <ul className="space-y-3">
          {data.map((item, i) => (
            <li
              key={i}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              {item.label || "Wave"} — {item.value ?? "0"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
