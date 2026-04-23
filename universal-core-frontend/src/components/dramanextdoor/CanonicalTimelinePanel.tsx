"use client";

import { FC } from "react";

interface CanonicalTimelinePanelProps {
  history: any[];
}

export const CanonicalTimelinePanel: FC<CanonicalTimelinePanelProps> = ({
  history,
}) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>Canonical Emotional Timeline</h3>
      <pre
        style={{
          background: "#111",
          padding: "1rem",
          borderRadius: "8px",
          fontSize: "0.85rem",
          overflowX: "auto",
        }}
      >
{JSON.stringify(history, null, 2)}
      </pre>
    </div>
  );
};
