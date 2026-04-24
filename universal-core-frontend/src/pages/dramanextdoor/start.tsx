"use client";

import { useState, useEffect } from "react";

// --- Emotional OS Pillars ---
import { useAdaptationEngine } from "@/lib/emotionalOS/adaptation/useAdaptationEngine";
import { useContinuityEngine } from "@/lib/emotionalOS/continuity/useContinuityEngine";
import { useIntentEngine } from "@/lib/emotionalOS/intent/useIntentEngine";

// --- DramaNextDoor Engines ---
import { useWorldTransition } from "@/lib/dramanextdoor/useWorldTransition";
import { useEmotionalSafetyLayer } from "@/lib/dramanextdoor/useEmotionalSafetyLayer";
import { useIdentityContinuity } from "@/lib/dramanextdoor/useIdentityContinuity";
import { useRitualEngine } from "@/lib/dramanextdoor/useRitualEngine";
import { useCanonicalization } from "@/lib/dramanextdoor/useCanonicalization";
import { useNotificationEngine } from "@/lib/dramanextdoor/useNotificationEngine";

// --- Reaction Engine ---
import { useReactionEngine } from "@/lib/dramanextdoor/useReactionEngine";

export default function DramaNextDoorStart() {
  // Local emotional state (SSR‑safe, no context dependency)
  const [mood, setMood] = useState(50);      // 0–100
  const [tension, setTension] = useState(0); // -100–100

  // Engines
  const world = useWorldTransition();
  const safety = useEmotionalSafetyLayer();
  const identity = useIdentityContinuity();
  const rituals = useRitualEngine();
  const canonical = useCanonicalization();
  const notifications = useNotificationEngine();
  const reactions = useReactionEngine();

  // --- Adaptation Engine ---
  const adaptation = useAdaptationEngine({
    mood,
    tension,
    identityDrift: identity.drift ?? 0,
    worldSwitchCount: world.isTransitioning ? 1 : 0,
    volatility: safety.volatility ?? 0,
    reactions: reactions.totals,
    viewHistory: [], // can be wired later
    ritualsCompleted: rituals.completed?.length ?? 0,
    safetyEvents: safety.events ?? [],
  });

  // --- Continuity+ Engine ---
  const continuity = useContinuityEngine({
    mood,
    tension,
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
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1>DramaNextDoor Emotional OS</h1>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>Emotional State</h2>
        <p>Mood: {mood}</p>
        <p>Tension: {tension}</p>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <button onClick={() => setMood((m) => Math.min(100, m + 5))}>
            Mood +5
          </button>
          <button onClick={() => setMood((m) => Math.max(0, m - 5))}>
            Mood -5
          </button>
          <button onClick={() => setTension((t) => t + 5)}>Tension +5</button>
          <button onClick={() => setTension((t) => t - 5)}>Tension -5</button>
        </div>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>World & Safety</h2>
        <p>World transitioning: {world.isTransitioning ? "yes" : "no"}</p>
        <p>Volatility: {safety.volatility}</p>
      </section>

      {intent && (
        <section style={{ marginTop: "1.5rem" }}>
          <h2>Intent</h2>
          <p>Category: {intent.intent.category}</p>
          <p>Confidence: {intent.intent.confidence}</p>
        </section>
      )}
    </div>
  );
}

