"use client";

import { useEffect } from "react";

// --- Emotional OS Context ---
import { useEmotionalContext } from "@/lib/emotionalOS/EmotionalContext";

// --- Emotional OS Pillars (your new engines) ---
import { useAdaptationEngine } from "@/lib/emotionalOS/adaptation/useAdaptationEngine";
import { useContinuityEngine } from "@/lib/emotionalOS/continuity/useContinuityEngine";
import { useIntentEngine } from "@/lib/emotionalOS/intent/useIntentEngine";

// --- DramaNextDoor Engines (your existing real files) ---
import { useWorldTransition } from "@/lib/dramanextdoor/useWorldTransition";
import { useEmotionalSafetyLayer } from "@/lib/dramanextdoor/useEmotionalSafetyLayer";
import { useIdentityContinuity } from "@/lib/dramanextdoor/useIdentityContinuity";
import { useRitualEngine } from "@/lib/dramanextdoor/useRitualEngine";
import { useCanonicalization } from "@/lib/dramanextdoor/useCanonicalization";
import { useNotificationEngine } from "@/lib/dramanextdoor/useNotificationEngine";

// --- New Reaction Engine we generated ---
import { useReactionEngine } from "@/lib/dramanextdoor/useReactionEngine";

export default function Start() {
  // Emotional OS base state
  const ctx = useEmotionalContext();

  // DramaNextDoor engines
  const world = useWorldTransition();
  const safety = useEmotionalSafetyLayer();
  const identity = useIdentityContinuity();
  const rituals = useRitualEngine();
  const canonical = useCanonicalization();
  const notifications = useNotificationEngine();
  const reactions = useReactionEngine();

  // --- Adaptation Engine ---
  const adaptation = useAdaptationEngine({
    mood: ctx.mood,
    tension: ctx.tension,
    identityDrift: identity.drift ?? 0,
    worldSwitchCount: world.isTransitioning ? 1 : 0,
    volatility: safety.volatility ?? 0,
    reactions: reactions.totals,
    viewHistory: [], // you can wire this later
    ritualsCompleted: rituals.completed?.length ?? 0,
    safetyEvents: safety.events ?? [],
  });

  // --- Continuity+ Engine ---
  const continuity = useContinuityEngine({
    mood: ctx.mood,
    tension: ctx.tension,
    worldName: "DramaNextDoor",
    reactionSignature: reactions.signature,
    volatility: safety.volatility ?? 0,
  });

  // --- Intent Engine ---
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

  // --- OS-Level Behavior Modulation ---
  useEffect(() => {
    if (!intent) return;

    // Safety sensitivity
    safety.setSensitivity?.(intent.projection.safetySensitivity);

    // Ritual recommendations
    if (intent.projection.ritualRecommendation) {
      rituals.recommend("stabilize");
    }

    // Notifications (optional)
    if (intent.intent.category === "chaos") {
      notifications.push("System detecting rising chaos intent.");
    }
  }, [intent, safety, rituals, notifications]);

  return (
    <div
      style={{
        padding: "2rem",
        color: "#fff",
        background: "#000",
        minHeight: "100vh",
      }}
    >
      <h1>DramaNextDoor Emotional OS</h1>

      <p>Mood: {ctx.mood}</p>
      <p>Tension: {ctx.tension}</p>
      <p>World Transitioning: {world.isTransitioning ? "yes" : "no"}</p>
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

