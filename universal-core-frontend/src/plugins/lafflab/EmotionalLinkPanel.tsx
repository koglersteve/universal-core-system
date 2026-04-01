"use client";

import { useSearchParams } from "next/navigation";
import { getMoodCaption } from "@/lib/memeemotions";
import { useEffect, useState } from "react";
import { CrossAppLauncher } from "@/components/crossapp/CrossAppLauncher";

export function EmotionalLinkPanel() {
  const params = useSearchParams();

  const mood = params.get("mood") || undefined;
  const world = params.get("world") || undefined;
  const trait = params.get("trait") || undefined;
  const agent = params.get("agent") || undefined;
  const token = params.get("et") || undefined;

  const [decoded, setDecoded] = useState<any>(null);

  // Decode emotional token (lightweight, safe)
  useEffect(() => {
    if (!token) return;

    try {
      const [payload] = token.split(".");
      const parsed = JSON.parse(atob(payload));
      setDecoded(parsed);
    } catch {
      setDecoded(null);
    }
  }, [token]);

  const caption = mood ? getMoodCaption(mood) : null;

  return (
    <div className="emotionallink-panel">
      <h3 className="emotionallink-title">Emotional Link</h3>

      {caption && (
        <p className="emotionallink-caption">
          {caption}
        </p>
      )}

      <div className="emotionallink-info">
        {mood && (
          <p><strong>Mood:</strong> {mood}</p>
        )}
        {world && (
          <p><strong>World:</strong> {world}</p>
        )}
        {trait && (
          <p><strong>Trait:</strong> {trait}</p>
        )}
        {agent && (
          <p><strong>Agent:</strong> {agent}</p>
        )}

        {decoded?.physics?.momentum !== undefined && (
          <p>
            <strong>Momentum:</strong> {decoded.physics.momentum.toFixed(2)}
          </p>
        )}
      </div>

      <div className="emotionallink-actions">
        <CrossAppLauncher
          sourceApp="emotional-os"
          payload={{
            mood,
            world,
            trait,
            agent,
            token,
            momentum: decoded?.physics?.momentum
          }}
        />
      </div>
    </div>
  );
}
