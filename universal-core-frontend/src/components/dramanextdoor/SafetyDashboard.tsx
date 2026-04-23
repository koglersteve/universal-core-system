"use client";

import { FC } from "react";
import { SafetyEvent } from "@/lib/dramanextdoor/useEmotionalSafetyLayer";

interface SafetyDashboardProps {
  mood: number;
  tension: number;
  identityReport: any;
  canonicalHistory: any[];
  worldSwitchCount: number;
  safetyEvents: SafetyEvent[];
}

export const SafetyDashboard: FC<SafetyDashboardProps> = ({
  mood,
  tension,
  identityReport,
  canonicalHistory,
  worldSwitchCount,
  safetyEvents,
}) => {
  const lastCanonical = canonicalHistory[0] || null;

  return (
    <div
      style={{
        marginBottom: "2rem",
        padding: "1.5rem",
        background: "#0a0a0f",
        borderRadius: "12px",
        border: "1px solid #222",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Emotional Safety Dashboard</h2>

      {/* STATUS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatusCard label="Mood" value={mood} />
        <StatusCard label="Tension" value={tension} />
        <StatusCard
          label="Identity Drift"
          value={identityReport?.drift ?? 0}
        />
        <StatusCard
          label="World Switches"
          value={worldSwitchCount}
        />
        <StatusCard
          label="Canonical Stability"
          value={
            lastCanonical
              ? 100 - Math.abs(lastCanonical.mood - mood)
              : 100
          }
        />
      </div>

      {/* SAFETY EVENTS LOG */}
      <h3>Safety Events</h3>
      {safetyEvents.length === 0 && (
        <div style={{ opacity: 0.6, marginTop: "0.5rem" }}>
          No safety interventions detected.
        </div>
      )}

      {safetyEvents.map((evt) => (
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

const StatusCard = ({ label, value }: { label: string; value: number }) => {
  return (
    <div
      style={{
        background: "#111",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <div style={{ opacity: 0.7, marginBottom: "0.25rem" }}>{label}</div>
      <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>{value}</div>
    </div>
  );
};
