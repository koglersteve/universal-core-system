"use client";

import { useState, useEffect } from "react";
import { MemeCanvas } from "@/components/meme-editor/MemeCanvas";
import { RenderedLayers } from "@/components/meme-editor/RenderedLayers";
import { useMemeEditorStore } from "@/state/useMemeEditorStore";
import { CrossAppLauncher } from "@/components/crossapp/CrossAppLauncher";

type Props = {
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
  token?: string; // emotional token
};

export function MemeMyDogEditor({ mood, world, trait, agent, token }: Props) {
  const { layers } = useMemeEditorStore();
  const [memeUrl, setMemeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateDogMeme() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/plugins/mememydog/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood,
          world,
          trait,
          agent,
          et: token,
          layers
        })
      });

      if (!res.ok) throw new Error("Failed to generate dog meme");

      const data = await res.json();
      setMemeUrl(data.meme);
    } catch (e) {
      setError("Could not load a dog meme.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    generateDogMeme();
  }, [mood, world, trait, agent, token, layers]);

  return (
    <div className="dog-meme-editor">
      <MemeCanvas>
        <RenderedLayers />
      </MemeCanvas>

      {loading && <p className="dog-meme-loading">Fetching your dog’s vibe…</p>}
      {error && <p className="dog-meme-error">{error}</p>}

      {memeUrl && !loading && !error && (
        <div className="dog-meme-viewer">
          <img src={memeUrl} alt="Dog Meme" className="dog-meme-image" />
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
          memeUrl,
          layers
        }}
      />
    </div>
  );
}

export default MemeMyDogEditor;
