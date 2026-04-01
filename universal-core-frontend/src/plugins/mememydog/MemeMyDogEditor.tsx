"use client";

import { useEffect, useState } from "react";
import { getMoodCaption } from "@/lib/memeemotions";
import { CrossAppLauncher } from "@/components/crossapp/CrossAppLauncher";

type Props = {
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
  token?: string; // emotional token
};

export function MemeMyDogEditor({ mood, world, trait, agent, token }: Props) {
  const [memeUrl, setMemeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const caption = mood ? getMoodCaption(mood) : null;

  useEffect(() => {
    async function fetchMeme() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/mememydog/meme?mood=${mood || ""}&world=${world || ""}&trait=${trait || ""}&agent=${agent || ""}&et=${token || ""}`
        );

        if (!res.ok) throw new Error("Failed to fetch dog meme");

        const data = await res.json();
        setMemeUrl(data.meme);
      } catch (e) {
        setError("Could not load a dog meme.");
      } finally {
        setLoading(false);
      }
    }

    fetchMeme();
  }, [mood, world, trait, agent, token]);

  return (
    <div className="dog-meme-editor">
      {caption && (
        <p className="dog-meme-caption">
          {caption}
        </p>
      )}

      {loading && (
        <p className="dog-meme-loading">Fetching your dog’s vibe…</p>
      )}

      {error && (
        <p className="dog-meme-error">{error}</p>
      )}

      {memeUrl && !loading && !error && (
        <div className="dog-meme-viewer">
          <img
            src={memeUrl}
            alt="Dog Meme"
            className="dog-meme-image"
          />
        </div>
      )}

      <CrossAppLauncher
        sourceApp="mememydog"
        payload={{
          mood,
          world,
          trait,
          agent,
          token,
          memeUrl
        }}
      />
    </div>
  );
}

