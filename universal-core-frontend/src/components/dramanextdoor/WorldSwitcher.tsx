"use client";

import { FC } from "react";

interface WorldSwitcherProps {
  worlds: any[];
  selectedWorldId: string | null;
  onSelectWorld: (id: string | null) => void;
  onSwitchWorld: () => void;
  isTransitioning: boolean;
}

export const WorldSwitcher: FC<WorldSwitcherProps> = ({
  worlds,
  selectedWorldId,
  onSelectWorld,
  onSwitchWorld,
  isTransitioning,
}) => {
  return (
    <div style={{ position: "relative", marginBottom: "2rem" }}>
      {isTransitioning && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            transition: "opacity 0.6s",
            zIndex: 999,
          }}
        />
      )}

      <h3>Emotional World Switching</h3>

      <div style={{ marginTop: "0.75rem" }}>
        <select
          value={selectedWorldId || ""}
          onChange={(e) => onSelectWorld(e.target.value || null)}
          style={{
            padding: "0.4rem",
            background: "#111",
            border: "1px solid #333",
            color: "#fff",
            marginRight: "1rem",
          }}
        >
          <option value="">Select a world</option>
          {worlds.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>

        <button
          onClick={onSwitchWorld}
          style={{
            padding: "0.4rem 0.8rem",
            background: "#1b1b22",
            borderRadius: "999px",
            border: "1px solid #333",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Switch World
        </button>
      </div>
    </div>
  );
};
