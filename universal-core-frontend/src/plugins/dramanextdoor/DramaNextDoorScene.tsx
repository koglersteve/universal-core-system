"use client";

import { useEffect, useState } from "react";

type Props = {
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
  emotionalState?: any;
};

export function DramaNextDoorScene({
  mood,
  world,
  trait,
  agent,
  emotionalState
}: Props) {
  const [scene, setScene] = useState<string>("Loading your drama...");

  useEffect(() => {
    async function fetchScene() {
      try {
        const res = await fetch(
          `/api/dramanextdoor/scene?mood=${mood || ""}&world=${world || ""}&trait=${trait || ""}&agent=${agent || ""}`
        );

        const data = await res.json();
        let finalScene = data.scene;

        // --- Emotional OS Enhancements ---

        // 1. Mood Overlay (light-touch flavor)
        if (mood) {
          finalScene = applyMoodOverlay(finalScene, mood);
        }

        // 2. Identity Trait Influence
        if (trait) {
          finalScene = applyTraitTone(finalScene, trait);
        }

        // 3. Agent Influence (plot twist)
        if (agent) {
          finalScene = applyAgentTwist(finalScene, agent);
        }

        // 4. Emotional Physics Influence (pacing)
        if (emotionalState?.physics?.momentum !== undefined) {
          finalScene = applyEmotionalPacing(
            finalScene,
            emotionalState.physics.momentum
          );
        }

        // 5. World Influence (multiverse branching)
        if (world) {
          finalScene = applyWorldFlavor(finalScene, world);
        }

        setScene(finalScene);
      } catch (e) {
        setScene("Something went wrong generating your drama.");
      }
    }

    fetchScene();
  }, [mood, world, trait, agent, emotionalState]);

  return (
    <div className="drama-scene-viewer">
      <p>{scene}</p>
    </div>
  );
}

// ----------------------
// Emotional OS Helpers
// ----------------------

function applyMoodOverlay(scene: string, mood: string) {
  const overlays: Record<string, string> = {
    angry: "💢 The tension crackles in the air.",
    frustrated: "😤 Everything feels one step away from snapping.",
    stressed: "🔥 The atmosphere feels tight and overcharged.",
    annoyed: "🙄 You’re already over it.",
    overwhelmed: "🌊 Everything feels like too much at once.",
    chaotic: "🌀 The energy is unpredictable.",
    bored: "😐 Even the drama feels tired.",
    petty: "🧂 Every detail suddenly matters way too much.",
    dramatic: "🎭 Everything feels like a monologue waiting to happen."
  };

  return overlays[mood] ? `${overlays[mood]} ${scene}` : scene;
}

function applyTraitTone(scene: string, trait: string) {
  const tones: Record<string, string> = {
    calm: "🌿",
    playful: "😏",
    sensitive: "💖",
    reactive: "🔥",
    dramatic: "🎭",
    petty: "🧂"
  };

  return tones[trait] ? `${tones[trait]} ${scene}` : scene;
}

function applyAgentTwist(scene: string, agent: string) {
  const twists: Record<string, string> = {
    trickster: " And then… something completely unexpected happened.",
    guardian: " But don’t worry — someone was watching over you.",
    companion: " Luckily, you weren’t alone in this moment.",
    observer: " Someone watched quietly from the distance.",
    instigator: " Someone was definitely stirring the pot."
  };

  return twists[agent] ? `${scene}${twists[agent]}` : scene;
}

function applyEmotionalPacing(scene: string, momentum: number) {
  if (momentum > 0.7) {
    return `${scene} The energy in the air was electric.`;
  }
  if (momentum < 0.3) {
    return `${scene} Everything felt slow and heavy.`;
  }
  return `${scene} The moment flowed naturally.`;
}

function applyWorldFlavor(scene: string, world: string) {
  return `[World ${world}] ${scene}`;
}

