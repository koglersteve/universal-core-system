"use client";

import { useState } from "react";
import { useEmotionalMultiverse } from "@/hooks/useEmotionalMultiverse";
import { useEmotionalGovernance } from "@/hooks/useEmotionalGovernance";

export function EmotionalWorldMerge() {
  const { worlds, mergeWorlds } = useEmotionalMultiverse();
  const { canMergeWorlds } = useEmotionalGovernance();

  const [a, setA] = useState<string | null>(null);
  const [b, setB] = useState<string | null>(null);
  const [name, setName] = useState("");

  const canMerge =
    a &&
    b &&
    a !== b &&
    name.trim().length > 0 &&
    canMergeWorlds();

  return (
    <div className="world-merge">
      <h3 className="world-merge-title">Merge Emotional Worlds</h3>

      <div className="world-merge-selectors">
        <select
          className="world-merge-select"
          onChange={e => setA(e.target.value || null)}
        >
          <option value="">Select World A</option>
          {worlds.map(w => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>

        <select
          className="world-merge-select"
          onChange={e => setB(e.target.value || null)}
        >
          <option value="">Select World B</option>
          {worlds.map(w => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="New world name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="world-merge-input"
      />

      <button
        disabled={!canMerge}
        onClick={() => mergeWorlds(a!, b!, name)}
        className="world-merge-button"
      >
        Merge Worlds
      </button>

      {!canMergeWorlds() && (
        <div className="world-merge-warning">
          World merging is currently restricted by Emotional Governance.
        </div>
      )}
    </div>
  );
}
