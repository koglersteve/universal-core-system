"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IdlyilyPrompt } from "./IdlyilyPrompt";
import { getMoodCaption } from "@/lib/memeemotions";

export function IdlyilyHome() {
  const params = useSearchParams();

  const mood = params.get("mood") || undefined;
  const world = params.get("world") || undefined;
  const trait = params.get("trait") || undefined;
  const agent = params.get("agent") || undefined;

  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    if (!mood) return;

    const moodMessages: Record<string, string> = {
      excited: "Let’s channel that excitement into something cute.",
      flirty: "Feeling flirty? Let’s make something fun.",
      romantic: "Let’s create something sweet and intimate.",
      happy: "Let’s capture the moment.",
      tired: "Soft, low‑effort cute prompts coming up.",
      overwhelmed: "Gentle, grounding prompts coming your way.",
      bored: "Let’s spark something warm and unexpected.",
      chaotic: "Perfect — let’s turn that energy into something adorable.",
      dramatic: "Let’s craft a moment worthy of a love‑story monologue."
    };

    setBanner(moodMessages[mood] || null);
  }, [mood]);

  const caption = mood ? getMoodCaption(mood) : null;

  return (
    <div className="idlyily-container">
      {banner && (
        <div className="idlyily-mood-banner">
          {banner}
        </div>
      )}

      <IdlyilyPrompt
        mood={mood}
        world={world}
        trait={trait}
        agent={agent}
      />

      {caption && (
        <p className="idlyily-caption">
          {caption}
        </p>
      )}
    </div>
  );
}

