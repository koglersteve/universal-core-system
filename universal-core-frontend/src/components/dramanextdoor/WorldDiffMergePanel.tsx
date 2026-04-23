"use client";

import { FC } from "react";

interface WorldDiffMergePanelProps {
  worlds: any[];
  worldA: string | null;
  worldB: string | null;
  onSelectWorldA: (id: string | null) => void;
  onSelectWorldB: (id: string | null) => void;
  onDiff: () => void;
  diffResult: any;
  mergeName: string;
  onChangeMergeName: (name: string) => void;
  onMerge: () => void;
}

export const WorldDiffMergePanel: FC<WorldDiffMergePanelProps> = ({
  worlds,
  worldA,
  worldB,
  onSelectWorldA,
  onSelectWorldB,
  onDiff,
  diffResult,
  mergeName,
  onChangeMergeName,
  onMerge,
}) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>Emotional World Diff / Merge</h3>

      <div style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
        <select
          value={worldA || ""}
          onChange={(e) => onSelectWorldA(e.target.value || null)}
          style={{ marginRight: "1rem" }}
        >
          <option value="">Select World A</option>
          {worlds.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>

        <select
          value={worldB || ""}
          onChange={(e) => onSelectWorldB(e.target.value || null)}
        >
          <option value="">Select World B</option>
          {worlds.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>

        <button
          onClick={onDiff}
          style={{
            marginLeft: "1rem",
            padding: "0.4rem 0.8rem",
            background: "#1b1b22",
            borderRadius: "999px",
            border: "1px solid #333",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Diff
        </button>
      </div>

      {diffResult && (
        <pre
          style={{
            background: "#111",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            fontSize: "0.85rem",
          }}
        >
{JSON.stringify(diffResult, null, 2)}
        </pre>
      )}

      <div>
        <input
          type="text"
          placeholder="Merged world name"
          value={mergeName}
          onChange={(e) => onChangeMergeName(e.target.value)}
          style={{
            padding: "0.4rem",
            marginRight: "1rem",
            background: "#111",
            border: "1px solid #333",
            color: "#fff",
          }}
        />

        <button
          onClick={onMerge}
          style={{
            padding: "0.4rem 0.8rem",
            background: "#1b1b22",
            borderRadius: "999px",
            border: "1px solid #333",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Merge Worlds
        </button>
      </div>
    </div>
  );
};
