"use client";

import { useRitual } from "@/hooks/useRitual";
import { ActionButton } from "@/components/ActionButton";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function RitualPage() {
  const { ritualMessage, generateRitual, loading } = useRitual();

  return (
    <div style={{ padding: 24 }}>
      <h1>Daily Ritual</h1>

      <ActionButton label="Generate Ritual" onClick={generateRitual} />

      {loading && <LoadingSpinner />}

      {ritualMessage && (
        <div
          style={{
            marginTop: 32,
            background: "var(--bg-card)",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "var(--shadow-soft)",
            lineHeight: 1.5,
            animation: "fadeSlideIn 0.35s ease-out",
          }}
        >
          <p style={{ margin: 0 }}>{ritualMessage}</p>
        </div>
      )}
    </div>
  );
}
