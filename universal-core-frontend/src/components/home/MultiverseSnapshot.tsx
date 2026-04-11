"use client";

import { useEmotionalMultiverse } from "@/hooks/useEmotionalMultiverse";  // ← FIXED

export function MultiverseSnapshot() {
  const { activeWorld, worlds } = useEmotionalMultiverse();  // ← FIXED

  return (
    <div className="multiverse-snapshot">
      <h3 className="multiverse-title">Multiverse Snapshot</h3>

      <p className="active-world">
        <strong>Active World:</strong> {activeWorld?.name || "None"}
      </p>

      <div className="world-list">
        {worlds.map((w) => (
          <div key={w.id} className="world-item">
            <span className={`world-dot ${w.theme}`}></span>
            {w.name}
          </div>
        ))}
      </div>
    </div>
  );
}
