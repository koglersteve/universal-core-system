"use client";

import { useEmotionalIdentity } from "@/hooks/useEmotionalIdentity";

export function EmotionalIdentityCard() {
  const { traits, signature, dominantTrait } = useEmotionalIdentity();

  return (
    <div className="identity-card">
      <h3 className="identity-title">Emotional Identity</h3>

      <p className="identity-dominant">
        <strong>Dominant Trait:</strong> {dominantTrait}
      </p>

      <h4 className="identity-subtitle">Traits</h4>
      <ul className="identity-list">
        {Object.entries(traits).map(([t, v]) => (
          <li key={t} className="identity-item">
            <span>{t}</span>
            <span>{v.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <h4 className="identity-subtitle">Signature (Last 30 moods)</h4>
      <ul className="identity-list">
        {Object.entries(signature).map(([m, v]) => (
          <li key={m} className="identity-item">
            <span>{m}</span>
            <span>{v.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
