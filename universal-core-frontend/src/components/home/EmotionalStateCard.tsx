"use client";

import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";

export function EmotionalStateCard() {
  const { vector, dominantMood } = useEmotionalPhysics();

  return (
    <div className="state-card">
      <h3 className="state-title">Current Emotional State</h3>

      {dominantMood ? (
        <p className="dominant-mood">{dominantMood}</p>
      ) : (
        <p className="dominant-mood none">No dominant mood</p>
      )}

      <ul className="mood-intensity-list">
        {Object.entries(vector).map(([mood, intensity]) => (
          <li key={mood} className="mood-intensity-item">
            <span className="mood-label">{mood}</span>
            <span className="mood-value">{intensity.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
