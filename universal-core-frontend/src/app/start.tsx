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

// --- UI Root ---
export default function Start() {
  // Core emotional context (mood, tension, etc.)
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

  // --- 1. Adaptation Engine (Pillar 6) ---
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

  // --- 2. Continuity+ Engine (Pillar 7) ---
  const continuity = useContinuityEngine({
    mood: ctx.mood,
    tension: ctx.tension,
    worldName: world.current?.name ?? "default",
    reactionSignature: reactions.signature,
    volatility: safety.volatility,
  });

  // --- 3. Intent Engine (Pillar 8) ---
  const intent = useIntentEngine({
    chaosAffinity: adaptation?.metrics?.chaosAffinity,
    comfortSeeking: adaptation?.metrics?.comfortSeeking,
    volatility: safety.volatility,
    emotionalSlope: adaptation?.metrics?.emotionalSlope,
    worldStability: adaptation?.metrics?.worldStability,
    reactionSignature: reactions.signature,
    continuityArcs: continuity?.arcs ?? [],
    adaptationOutputs: adaptation?.outputs ?? {},
  });

  // --- OS-Level Behavior Modulation ---
  useEffect(() => {
    if (!intent) return;

    // Feed bias (chaos / comfort / neutral)
    feed.setBias(intent.projection.feedBias);

    // World volatility bias
    world.setVolatilityBias(intent.projection.worldBias);

    // Emotional pacing
    pacing.set(intent.projection.pacing);

    // Safety sensitivity
    safety.setSensitivity(intent.projection.safetySensitivity);

    // Ritual recommendation
    if (intent.projection.ritualRecommendation) {
      rituals.recommend("stabilize");
    }
  }, [intent]);

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Your app UI goes here */}
    </div>
  );
}
