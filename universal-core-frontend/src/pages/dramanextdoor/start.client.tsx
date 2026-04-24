"use client";

import { useState, useEffect } from "react";

// Emotional OS Pillars
import { useAdaptationEngine } from "@/lib/emotionalOS/adaptation/useAdaptationEngine";
import { useContinuityEngine } from "@/lib/emotionalOS/continuity/useContinuityEngine";
import { useIntentEngine } from "@/lib/emotionalOS/intent/useIntentEngine";

// DramaNextDoor Engines
import { useWorldTransition } from "@/lib/dramanextdoor/useWorldTransition";
import { useEmotionalSafetyLayer } from "@/lib/dramanextdoor/useEmotionalSafetyLayer";
import { useIdentityContinuity } from "@/lib/dramanextdoor/useIdentityContinuity";
import { useRitualEngine } from "@/lib/dramanextdoor/useRitualEngine";
import { useCanonicalization } from "@/lib/dramanextdoor/useCanonicalization";
import { useNotificationEngine } from "@/lib/dramanextdoor/useNotificationEngine";

// Reaction Engine
import { useReactionEngine } from "@/lib/dramanextdoor/useReactionEngine";

export default function StartClient() {
  const [mood, setMood] = useState(50);
  const [tension, setTension] = useState(0);

  const world = useWorldTransition();
  const safety = useEmotionalSafetyLayer();
  const identity = useIdentityContinuity();
  const rituals = useRitualEngine();
  const canonical = useCanonicalization();
  const notifications = useNotificationEngine();
  const reactions = useReactionEngine();

  const adaptation = useAdaptationEngine({
    mood,
    tension,
    identityDrift: identity.drift ?? 0,
    worldSwitchCount: world.isTransitioning ? 1 : 0,
    volatility: safety.volatility ?? 0,
    reactions: reactions.totals,
    viewHistory: [],
    ritualsCompleted: rituals.completed?.length ?? 0,
    safetyEvents: safety.events ?? [],
  });

  const continuity = useContinuityEngine({
    mood,
    tension,
    worldName: "DramaNextDoor",
    reactionSignature: reactions.signature,
    volatility: safety.volatility ?? 0,
  });

  const intent = useIntentEngine({
    chaosAffinity: adaptation?.metrics?.chaosAffinity ?? 0,
    comfortSeeking: adaptation?.metrics?.comfortSeeking ?? 0,
    volatility: safety.volatility ?? 0,
    emotionalSlope: adaptation?.metrics?.emotionalSlope ?? 0,
    worldStability: adaptation?.metrics?.worldStability ?? 1,
    reactionSignature: reactions.signature,
    continuityArcs: continuity?.arcs ?? [],
    adaptationOutputs: adaptation?.outputs ?? {},
  });

  useEffect(() => {
    if (!intent) return;

    safety.setSensitivity?.(intent.projection.safetySensitivity);

    if (intent.projection.ritualRecommendation) {
      rituals.recommend("stabilize");
    }

    if (intent.intent.category === "chaos") {
      notifications.push("System detecting rising chaos intent.");
    }
  }, [intent, safety, rituals, notifications]);

  return (
    <div style={{ padding: "2rem", color: "#fff", background: "#000", minHeight: "100vh" }}>
      <h1>DramaNextDoor Emotional OS</h1>

      <p>Mood: {mood}</p>
      <p>Tension: {tension}</p>
      <p>World transitioning: {world.isTransitioning ? "yes" : "no"}</p>
      <p>Volatility: {safety.volatility}</p>

      {intent && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Intent</h2>
          <p>Category: {intent.intent.category}</p>
          <p>Confidence: {intent.intent.confidence}</p>
        </div>
      )}
    </div>
  );
}
