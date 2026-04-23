"use client";

import { FC } from "react";

interface EmotionalEngineStatusProps {
  updatedCtx: any;
}

export const EmotionalEngineStatus: FC<EmotionalEngineStatusProps> = ({
  updatedCtx,
}) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>Emotional Engine Status</h3>
      <pre
        style={{
          background: "#111",
          padding: "1rem",
          borderRadius: "8px",
          fontSize: "0.85rem",
          overflowX: "auto",
        }}
      >
{JSON.stringify(updatedCtx, null, 2)}
      </pre>
    </div>
  );
};
