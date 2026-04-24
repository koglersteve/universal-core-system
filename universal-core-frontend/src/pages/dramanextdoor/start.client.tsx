"use client";

export const config = {
  runtime: "experimental-edge",
  unstable_runtimeJS: false,
};

import { useEffect } from "react";
import { useEmotionalOS } from "@/app/EmotionalOSProvider";

// Emotional OS Pillars
import { useAdaptationEngine } from "@/lib/emotionalOS/adaptation/useAdaptationEngine";
import { useContinuityEngine } from "@/lib/emotionalOS/continuity/useContinuityEngine";
import { useIntentEngine } from "@/lib/emotionalOS/intent/useIntentEngine";

// Emotional OS Governance Layers
import { useEmotionalSafetyRouter } from "@/lib/emotionalOS/safety/useEmotionalSafetyRouter";
import { useRecoveryEffects } from "@/lib/emotionalOS/recovery/useRecoveryEffects";
import { useEmotionalWorldRouter } from "@/lib/emotionalOS/world/useEmotionalWorldRouter";

// DramaNextDoor Engines
import { useWorldTransition } from "@/lib/dramanextdoor/useWorldTransition";
import { useEmotionalSafetyLayer } from "@/lib/dramanextdoor/useEmotionalSafetyLayer";
import { useIdentityContinuity } from "@/lib/dramanextdoor/useIdentityContinuity";
import { useRitualEngine } from "@/lib/dramanextdoor/useRitualEngine";
import { useCanonicalization } from "@/lib/dramanextdoor/useCanonicalization";
import { useNotificationEngine } from "@/lib/dramanextdoor/useNotificationEngine";

// Smoothing Layer
import { useSmoothedSignal } from "@/lib/emotionalOS/smoothing/useSmoothedSignal";

// Reaction Engine
import { useReactionEngine } from "@/lib/dramanextdoor/useReactionEngine";

export default function StartClient() {
  const { state, update } = useEmotionalOS();

  // ⭐ Smoothed emotional signals (momentum + damping + hysteresis)
  const mood = useSmoothedSignal(state.mood, {
    momentum: 0.85,
    damping: 0.5,
    hysteresis: 1,
  });

  const tension = useSmoothedSignal(state.tension, {
    momentum: 0.75,
    damping: 0.4,
    hysteresis: 2,
  });

  const volatility = useSmoothedSignal(state.volatility, {
    momentum: 0.8,
    damping: 0.5,
    hysteresis: 1,
  });

  // Engines
  const world = useWorldTransition();
  const safety = useEmotionalSafetyLayer();
  const identity = useIdentityContinuity();
  const rituals = useRitualEngine();
  const canonical = useCanonicalization();
  const notifications = useNotificationEngine();
  const reactions = useReactionEngine();

  // Emotional OS Pillars
  const adaptation = useAdaptationEngine({
    mood,
    tension,
    identityDrift: identity.drift ?? 0,
    worldSwitchCount: world.isTransitioning ? 1 : 0,
    volatility,
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
    volatility,
  });

  const intent = useIntentEngine({
    chaosAffinity: adaptation?.metrics?.chaosAffinity ?? 0,
    comfortSeeking: adaptation?.metrics?.comfortSeeking ?? 0,
    volatility,
    emotionalSlope: adaptation?.metrics?.emotionalSlope ?? 0,
    worldStability: adaptation?.metrics?.worldStability ?? 1,
    reactionSignature: reactions.signature,
    continuityArcs: continuity?.arcs ?? [],
    adaptationOutputs: adaptation?.outputs ?? {},
  });

  // ⭐ Emotional World Router (OS-level world continuity)
  useEmotionalWorldRouter("DramaNextDoor");

  // ⭐ Emotional Recovery Modes (stabilize, safe, low-volatility, high-comfort)
  const recoveryMode = useRecoveryEffects();

  // ⭐ Emotional Safety Router (routes triggers → rituals + notifications)
  useEmotionalSafetyRouter(state.safetyTriggers ?? []);

  // ⭐ Write back into the Emotional OS (continuity + smoothing + safety)
  useEffect(() => {
    update({
      mood,
      tension,
      volatility,
      currentWorld: "DramaNextDoor",
      lastIntentCategory: intent?.intent?.category ?? null,
      lastIntentConfidence: intent?.intent?.confidence ?? null,
      reactionSignature: reactions.signature,
    });
  }, [mood, tension, volatility, intent, reactions.signature]);

  // ⭐ Rituals + notifications based on intent
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
      <p>Volatility: {volatility}</p>
      <p>World transitioning: {world.isTransitioning ? "yes" : "no"}</p>
      <p>Recovery Mode: {recoveryMode}</p>

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
