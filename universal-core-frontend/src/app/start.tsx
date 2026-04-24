"use client";

import { useEffect } from "react";

// --- Emotional OS Engines ---
import { useAdaptationEngine } from "@/lib/emotionalOS/adaptation/useAdaptationEngine";
import { useContinuityEngine } from "@/lib/emotionalOS/continuity/useContinuityEngine";
import { useIntentEngine } from "@/lib/emotionalOS/intent/useIntentEngine";

// --- Core OS Context Providers ---
import { useEmotionalContext } from "@/lib/emotionalOS/context/EmotionalContext";
import { useWorldEngine } from "@/lib/emotionalOS/worlds/useWorldEngine";
import { useSafetyEngine } from "@/lib/emotionalOS/safety/useSafetyEngine";
import { useIdentityContinuity } from "@/lib/emotionalOS/identity/useIdentityContinuity";
import { useReactionEngine } from "@/lib/emotionalOS/reactions/useReactionEngine";
import { useRitualEngine } from "@/lib/emotionalOS/rituals/useRitualEngine";
import { useHistoryEngine } from "@/lib/emotionalOS/history/useHistoryEngine";
import { usePacingEngine } from "@/lib/emotionalOS/pacing/usePacingEngine";
import { useFeedEngine } from "@/lib/emotionalOS/feed/useFeedEngine";

export default function Start() {
  // Core emotional context
  const ctx = useEmotionalContext();

  // Engines
  const world = useWorldEngine();
  const safety = useSafetyEngine();
  const identity = useIdentityContinuity();
  const reactions = useReactionEngine();
  const rituals = useRitualEngine();
  const history = useHistoryEngine();
  const pacing = usePacingEngine();
  const feed = useFeedEngine();

  // --- 1. Adaptation Engine ---
  const adaptation = useAdaptationEngine({
    mood: ctx.mood,
    tension: ctx.tension,
    identityDrift: identity.drift,
    worldSwitchCount: world.switchCount,
    volatility: safety.volatility,
    reactions: reactions.totals,
    viewHistory: history.items,
    ritualsCompleted: rituals.completed.length,
    safetyEvents: safety.events,
  });

  // --- 2. Continuity+ Engine ---
  const continuity = useContinuityEngine({
    mood: ctx.mood,
    tension: ctx.tension,
    worldName: world.current?.name ?? "default",
    reactionSignature: reactions.signature,
    volatility: safety.volatility,
  });

  // --- 3. Intent Engine ---
  const intent = useIntentEngine({
    chaosAffinity: adaptation?.metrics?.chaosAffinity ?? 0,
    comfortSeeking: adaptation?.metrics?.comfortSeeking ?? 0,
    volatility: safety.volatility,
    emotionalSlope: adaptation?.metrics?.emotionalSlope ?? 0,
    worldStability: adaptation?.metrics?.worldStability ?? 1,
    reactionSignature: reactions.signature,
    continuityArcs: continuity?.arcs ?? [],
    adaptationOutputs: adaptation?.outputs ?? {},
  });

  // --- OS-Level Behavior Modulation ---
  useEffect(() => {
    if (!intent) return;

    feed.setBias(intent.projection.feedBias);
    world.setVolatilityBias(intent.projection.worldBias);
    pacing.set(intent.projection.pacing);
    safety.setSensitivity(intent.projection.safetySensitivity);

    if (intent.projection.ritualRecommendation) {
      rituals.recommend("stabilize");
    }
  }, [intent, feed, world, pacing, safety, rituals]);

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
      <p>World: {world.current?.name}</p>
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
