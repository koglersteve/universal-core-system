"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MemeMyCatEditor } from "./MemeMyCatEditor";
import { getMoodCaption } from "@/lib/memeemotions";

export function MemeMyCatHome() {
  const params = useSearchParams();

  const mood = params.get("mood") || undefined;
  const world = params.get("world") || undefined;
  const trait = params.get("trait") || undefined;
  const agent = params.get("agent") || undefined;
  const token = params.get("et") || undefined;

  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    if (!mood) return;

    const moodMessages: Record<string, string> = {
      tired: "Soft, cozy cat energy coming up.",
      overwhelmed: "Gentle comfort incoming.",
      sad: "Warm, comforting cat vibes.",
      stressed: "Let’s slow things down with something soft.",
      bored: "Your cat is about to judge you… softly.",
      chaotic: "Your cat is ready to match your chaos.",
      dramatic: "Your cat is preparing a dramatic entrance.",
      happy: "Your cat approves of your vibe.",
      excited: "Your cat is ready to hype you up."
    };

    setBanner(moodMessages[mood] || null);
  }, [mood]);

  const caption = mood ? getMoodCaption(mood) : null;

  return (
    <div className="mememycat-container">
      {banner && (
        <div className="mememycat-mood-banner">
          {banner}
        </div>
      )}

      {caption && (
        <p className="mememycat-caption">
          {caption}
        </p>
      )}

      <MemeMyCatEditor
        mood={mood}
        world={world}
        trait={trait}
        agent={agent}
        token={token}
      />
    </div>
  );
}

