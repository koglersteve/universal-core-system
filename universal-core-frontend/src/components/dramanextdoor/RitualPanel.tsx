"use client";

import { FC } from "react";

interface RitualPanelProps {
  rituals: any[];
  completed: Record<string, boolean>;
  onComplete: (id: string) => void;
}

export const RitualPanel: FC<RitualPanelProps> = ({
  rituals,
  completed,
  onComplete,
}) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>Emotional Rituals</h3>
      <div style={{ marginTop: "0.75rem" }}>
        {rituals.map((r) => {
          const done = completed[r.id];
          return (
            <div
              key={r.id}
              style={{
                marginBottom: "0.75rem",
                padding: "0.75rem",
                background: "#111",
                borderRadius: "8px",
                opacity: done ? 0.5 : 1,
              }}
            >
              <strong>{r.name}</strong>
              <div style={{ opacity: 0.8, marginBottom: "0.5rem" }}>
                {r.description}
              </div>

              {!done && (
                <button
                  onClick={() => onComplete(r.id)}
                  style={{
                    padding: "0.4rem 0.8rem",
                    background: "#1b1b22",
                    borderRadius: "999px",
                    border: "1px solid #333",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Complete Ritual
                </button>
              )}

              {done && (
                <div style={{ color: "#7dd3fc", fontSize: "0.85rem" }}>
                  Ritual completed
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
