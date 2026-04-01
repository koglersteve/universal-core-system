"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HoaMemeEditor } from "./HoaMemeEditor";
import { getMoodCaption } from "@/lib/memeemotions";

export function HoaMemeHome() {
  const params = useSearchParams();

  const mood = params.get("mood") || undefined;
  const world = params.get("world") || undefined;
  const trait = params.get("trait") || undefined;
  const agent = params.get("agent") || undefined;

  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    if (!mood) return;

    const moodMessages: Record<string, string> = {
      angry: "Let’s turn that fire into something hilarious.",
      annoyed: "Perfect time for a petty HOA meme.",
      frustrated: "Channel that frustration into comedy gold.",
      stressed: "A little neighborhood chaos might help you unwind.",
      overwhelmed: "Let’s keep it simple — one meme at a time.",
      bored: "Let’s spice up the neighborhood a bit.",
      chaotic: "Perfect — HOA chaos thrives on chaotic energy.",
      petty: "This is your moment. Let the pettiness flow.",
      dramatic: "Time to turn this HOA moment into a full production."
    };

    setBanner(moodMessages[mood] || null);
  }, [mood]);

  const caption = mood ? getMoodCaption(mood) : null;

  return (
    <div className="hoameme-container">
      {banner && (
        <div className="hoameme-mood-banner">
          {banner}
        </div>
      )}

      <HoaMemeEditor
        mood={mood}
        world={world}
        trait={trait}
        agent={agent}
      />

      {caption && (
        <p className="hoameme-caption">
          {caption}
        </p>
      )}
    </div>
  );
}

