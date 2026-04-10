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

export function MemeMyCatEditor({ mood, world, trait, agent, token }: Props) {
  const [memeUrl, setMemeUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const caption = mood ? getMoodCaption(mood) : null;

  useEffect(() => {
    async function fetchMeme() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/plugins/mememycat/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mood,
            world,
            trait,
            agent,
            token
          })
        });

        if (!res.ok) throw new Error("Failed to fetch cat meme");

        const data = await res.json();
        setMemeUrl(data?.result?.url || null);
      } catch (e) {
        setError("Could not load a cat meme.");
      } finally {
        setLoading(false);
      }
    }

    fetchMeme();
  }, [mood, world, trait, agent, token]);

  return (
    <div className="cat-meme-editor">
      {caption && (
        <p className="cat-meme-caption">
          {caption}
        </p>
      )}

      {loading && (
        <p className="cat-meme-loading">Summoning your cat’s judgment…</p>
      )}

      {error && (
        <p className="cat-meme-error">{error}</p>
      )}

      {memeUrl && !loading && !error && (
        <div className="cat-meme-viewer">
          <img
            src={memeUrl}
            alt="Cat Meme"
            className="cat-meme-image"
          />
        </div>
      )}

      <CrossAppLauncher
        sourceApp="mememycat"
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

