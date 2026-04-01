"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { JokeViewer } from "./JokeViewer";
import { getMoodCaption } from "@/lib/memeemotions";

export function LaffLabHome() {
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
      happy: "Let’s keep the good energy flowing.",
      sad: "Here are some uplifting laughs.",
      stressed: "Deep breath — let’s lighten things up.",
      angry: "Let’s cool things down with something gentle.",
      tired: "Soft, low‑energy laughs coming up.",
      excited: "Let’s amplify that excitement.",
      overwhelmed: "Let’s slow things down with something light.",
      bored: "Let’s spark a little joy.",
      chaotic: "Perfect — let’s channel that chaos into laughter.",
      dramatic: "Let’s turn this moment into a comedic monologue."
    };

    setBanner(moodMessages[mood] || null);
  }, [mood]);

  const caption = mood ? getMoodCaption(mood) : null;

  return (
    <div className="lafflab-container">
      {banner && (
        <div className="lafflab-mood-banner">
          {banner}
        </div>
      )}

      {caption && (
        <p className="lafflab-caption">
          {caption}
        </p>
      )}

      <JokeViewer
        mood={mood}
        world={world}
        trait={trait}
        agent={agent}
        token={token}
      />
    </div>
  );
}

