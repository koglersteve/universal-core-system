import React from "react";

export default function DailyRitualScreen() {
  return (
    <div
      style={{
        color: "#FFFFFF",
        padding: 16,
        borderRadius: 16,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: 18, marginBottom: 12 }}>Daily Ritual</h2>
      <p style={{ opacity: 0.8 }}>
        Your daily ritual experience will appear here.
      </p>
    </div>
  );
}
