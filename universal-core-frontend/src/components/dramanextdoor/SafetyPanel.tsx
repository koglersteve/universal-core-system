"use client";

import { FC } from "react";
import { SafetyEvent } from "@/lib/dramanextdoor/useEmotionalSafetyLayer";

interface SafetyPanelProps {
  events: SafetyEvent[];
}

export const SafetyPanel: FC<SafetyPanelProps> = ({ events }) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>Emotional Safety Log</h3>

      {events.length === 0 && (
        <div style={{ opacity: 0.6, marginTop: "0.5rem" }}>
          No safety interventions detected.
        </div>
      )}

      {events.map((evt) => (
        <div
          key={evt.id}
          style={{
            background: "#111",
            padding: "0.75rem",
            borderRadius: "8px",
            marginTop: "0.75rem",
          }}
        >
          <strong>{evt.type}</strong>
          <div style={{ opacity: 0.8, marginTop: "0.25rem" }}>
            {evt.message}
          </div>

          <div
            style={{
              fontSize: "0.75rem",
              opacity: 0.5,
              marginTop: "0.5rem",
              fontFamily: "monospace",
            }}
          >
            {new Date(evt.timestamp).toLocaleString()}
          </div>

          {evt.details && (
            <pre
              style={{
                marginTop: "0.5rem",
                background: "#000",
                padding: "0.5rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                overflowX: "auto",
              }}
            >
{JSON.stringify(evt.details, null, 2)}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
};
