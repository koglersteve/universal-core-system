"use client";

import { useEffect, useState } from "react";
import { getMoodCaption } from "@/lib/memeemotions";

export function HoaMemeEditor({
  mood,
  world,
  trait,
  agent
}: {
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
}) {
  const [template, setTemplate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const caption = mood ? getMoodCaption(mood) : "Generating HOA chaos…";

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const res = await fetch(
          `/api/hoa-meme/template?mood=${mood || ""}&world=${world || ""}&trait=${trait || ""}&agent=${agent || ""}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch template");
        }

        const data = await res.json();
        setTemplate(data.template);
      } catch (e) {
        setError("Could not load HOA meme template.");
      }
    }

    fetchTemplate();
  }, [mood, world, trait, agent]);

  return (
    <div className="hoa-meme-editor">
      {error && <p className="hoa-meme-error">{error}</p>}

      {!template && !error && (
        <p className="hoa-meme-loading">Loading HOA meme template…</p>
      )}

      {template && (
        <img
          src={template}
          alt="HOA Meme Template"
          className="hoa-meme-template"
        />
      )}

      <p className="hoa-meme-caption">{caption}</p>
    </div>
  );
}
