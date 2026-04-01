"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { DramaNextDoorScene } from "./DramaNextDoorScene";

type NarrativeState = {
  index: number;
  scenes: string[];
};

export function DramaNextDoorHome() {
  const params = useSearchParams();

  const mood = params.get("mood") || undefined;
  const world = params.get("world") || undefined;
  const trait = params.get("trait") || undefined;
  const agent = params.get("agent") || undefined;

  const token = params.get("et");
  const [emotionalState, setEmotionalState] = useState<any>(null);

  const [narrative, setNarrative] = useState<NarrativeState>({
    index: 0,
    scenes: []
  });

  const [banner, setBanner] = useState<string | null>(null);

  // --- Decode emotional token ---
  useEffect(() => {
    if (!token) return;

    try {
      const [payload] = token.split(".");
      const decoded = JSON.parse(atob(payload));
      setEmotionalState(decoded);
    } catch {
      setEmotionalState(null);
    }
  }, [token]);

  // --- Mood banner ---
  useEffect(() => {
    if (!mood) return;

    const moodMessages: Record<string, string> = {
      angry: "Let’s dramatize this safely — pick your scene.",
      frustrated: "Channel that frustration into a storyline.",
      stressed: "A little drama might help you release tension.",
      annoyed: "Perfect time for a petty neighborhood scene.",
      overwhelmed: "Let’s slow the pace and keep things grounded.",
      chaotic: "Chaos detected — perfect for neighborhood drama.",
      bored: "Let’s stir the pot a little.",
      petty: "Oh, this is your moment."
    };

    setBanner(moodMessages[mood] || null);
  }, [mood]);

  // --- Narrative builder (memoized for clarity) ---
  const builtScenes = useMemo(() => {
    if (!mood) return [];

    const baseScenes = [
      "You step outside and immediately sense tension in the air.",
      "A neighbor glances over with a look that could start a storm.",
      "Something small — maybe too small — sparks a dramatic escalation.",
      "Voices rise, emotions flare, and the neighborhood becomes a stage.",
      "But just as things peak, a shift happens — something unexpected."
    ];

    const worldFlavor = world ? ` [World ${world}]` : "";

    const traitTone = trait
      ? {
          calm: "The energy feels strangely grounded.",
          playful: "There’s a mischievous sparkle in the air.",
          sensitive: "Every emotion feels amplified.",
          reactive: "Everything feels like it could explode.",
          dramatic: "Everything feels like it’s on the verge of a monologue.",
          petty: "Every detail suddenly matters way too much."
        }[trait] || ""
      : "";

    const agentTwist = agent
      ? {
          trickster: "A chaotic twist is inevitable.",
          guardian: "A protective presence lingers nearby.",
          companion: "Someone supportive stands at your side.",
          observer: "Someone watches quietly from a distance.",
          instigator: "Someone is definitely stirring the pot."
        }[agent] || ""
      : "";

    const momentum = emotionalState?.physics?.momentum ?? 0.5;

    const pacing =
      momentum > 0.7
        ? "The pace quickens — everything feels urgent."
        : momentum < 0.3
        ? "Time slows — emotions stretch out."
        : "The moment flows naturally.";

    return baseScenes.map((s) => {
      return `${s}${worldFlavor}\n${traitTone}\n${agentTwist}\n${pacing}`;
    });
  }, [mood, world, trait, agent, emotionalState]);

  // --- Sync built scenes into narrative state ---
  useEffect(() => {
    if (builtScenes.length === 0) return;

    setNarrative({
      index: 0,
      scenes: builtScenes
    });
  }, [builtScenes]);

  const nextScene = () => {
    setNarrative((prev) => {
      const nextIndex = Math.min(prev.index + 1, prev.scenes.length - 1);
      return { ...prev, index: nextIndex };
    });
  };

  return (
    <div className="dramanextdoor-container">
      {banner && <div className="dramanextdoor-mood-banner">{banner}</div>}

      <DramaNextDoorScene
        mood={mood}
        world={world}
        trait={trait}
        agent={agent}
        emotionalState={emotionalState}
        sceneOverride={narrative.scenes[narrative.index]}
      />

      {narrative.index < narrative.scenes.length - 1 && (
        <button className="dramanextdoor-next-button" onClick={nextScene}>
          Next Scene →
        </button>
      )}
    </div>
  );
}

