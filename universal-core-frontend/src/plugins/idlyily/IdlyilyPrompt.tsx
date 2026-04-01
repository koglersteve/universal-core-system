"use client";

import { useEffect, useState } from "react";
import { getMoodCaption } from "@/lib/memeemotions";

type Props = {
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
};

export function IdlyilyPrompt({ mood, world, trait, agent }: Props) {
  const [prompt, setPrompt] = useState<string>("Loading something cute…");
  const [error, setError] = useState<string | null>(null);

  const caption = mood ? getMoodCaption(mood) : null;

  useEffect(() => {
    async function fetchPrompt() {
      try {
        const res = await fetch(
          `/api/idlyily/prompt?mood=${mood || ""}&world=${world || ""}&trait=${trait || ""}&agent=${agent || ""}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch prompt");
        }

        const data = await res.json();
        setPrompt(data.prompt);
      } catch (e) {
        setError("Could not load a romantic prompt.");
      }
    }

    fetchPrompt();
  }, [mood, world, trait, agent]);

  return (
    <div className="idlyily-prompt">
      {error ? (
        <p className="idlyily-error">{error}</p>
      ) : (
        <p>{prompt}</p>
      )}

      {caption && (
        <p className="idlyily-caption">
          {caption}
        </p>
      )}
    </div>
  );
}
