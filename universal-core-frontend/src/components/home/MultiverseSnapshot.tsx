"use client";

import { useMultiverse } from "@/context/EmotionalMultiverseContext";

export function MultiverseSnapshot() {
  const { activeWorld, worlds } = useMultiverse();

  return (
    <div className="multiverse-snapshot">
      <h3 className="multiverse-title">Multiverse Snapshot</h3>

      <p className="active-world">
        <strong>Active World:</strong> {activeWorld.name}
      </p>

      <div className="world-list">
        {worlds.map(w => (
          <div key={w.id} className="world-item">
            <span className={`world-dot ${w.theme}`}></span>
            {w.name}
          </div>
        ))}
      </div>
    </div>
  );
}
