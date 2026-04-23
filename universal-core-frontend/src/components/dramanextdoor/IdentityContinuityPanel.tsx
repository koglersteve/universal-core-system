"use client";

import { FC } from "react";

interface IdentityContinuityPanelProps {
  report: any;
}

export const IdentityContinuityPanel: FC<IdentityContinuityPanelProps> = ({
  report,
}) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>Identity Continuity</h3>
      <pre
        style={{
          background: "#111",
          padding: "1rem",
          borderRadius: "8px",
          fontSize: "0.85rem",
          overflowX: "auto",
        }}
      >
{JSON.stringify(report, null, 2)}
      </pre>
    </div>
  );
};
