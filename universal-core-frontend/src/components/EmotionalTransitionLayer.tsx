"use client";

import { useEffect, useState } from "react";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";
import { useEmotionalGovernance } from "@/hooks/useEmotionalGovernance";

export function EmotionalTransitionLayer() {
  const { dominantMood } = useEmotionalPhysics();
  const { canTransition } = useEmotionalGovernance();

  const [activeMood, setActiveMood] = useState<string | null>(null);

  useEffect(() => {
    if (!dominantMood) return;
    if (!canTransition()) return;

    // Trigger transition
    setActiveMood(dominantMood);

    // Fade-out after animation
    const timer = setTimeout(() => {
      setActiveMood(null);
    }, 1200);

    return () => clearTimeout(timer);
  }, [dominantMood, canTransition]);

  return (
    <div className={`emotion-layer ${activeMood ? `emotion-${activeMood}` : ""}`}>
      {activeMood && <div className="emotion-flash" />}
    </div>
  );
}
