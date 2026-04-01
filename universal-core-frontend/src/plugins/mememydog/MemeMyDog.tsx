"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MemeMyDogEditor } from "./MemeMyDogEditor";
import { getMoodCaption } from "@/lib/memeemotions";

export function MemeMyDogHome() {
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
      sad: "Here’s something warm to lift your spirits.",
      tired: "Soft, cozy dog energy coming up.",
      stressed: "Gentle dog memes to help you unwind.",
      overwhelmed: "Your dog is here to ground you.",
      bored: "Your dog is ready to entertain you.",
      chaotic: "Your dog is matching your chaotic energy.",
      excited: "Your dog is hyped with you.",
      happy: "Your dog is vibing with your joy.",
      dramatic: "Your dog is preparing a dramatic entrance."
    };

    setBanner(moodMessages[mood] || null);
  }, [mood]);

  const caption = mood ? getMoodCaption(mood) : null;

  return (
    <div className="mememydog-container">
      {banner && (
        <div className="mememydog-mood-banner">
          {banner}
        </div>
      )}

      {caption && (
        <p className="mememydog-caption">
          {caption}
        </p>
      )}

      <MemeMyDogEditor
        mood={mood}
        world={world}
        trait={trait}
        agent={agent}
        token={token}
      />
    </div>
  );
}
