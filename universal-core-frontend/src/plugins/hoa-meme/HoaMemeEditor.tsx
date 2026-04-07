"use client";

import { useEffect, useState } from "react";
import { getMoodCaption } from "@/lib/memeemotions";

interface HoaMemeEditorProps {
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
}

export function HoaMemeEditor({
  mood,
  world,
  trait,
  agent,
}: HoaMemeEditorProps) {
  const [template, setTemplate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const caption = mood
    ? getMoodCaption(mood)
    : "Generating HOA chaos…";

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const url = `/api/hoa-meme/template?mood=${mood || ""}&world=${
          world || ""
        }&trait=${trait || ""}&agent=${agent || ""}`;

        const res = await fetch(url);

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
    <div className="hoa-meme-editor p-6 space-y-4">
      {error && (
        <p className="hoa-meme-error text-red-600">{error}</p>
      )}

      {!template && !error && (
        <p className="hoa-meme-loading text-gray-500">
          Loading HOA meme template…
        </p>
      )}

      {template && (
        <img
          src={template}
          alt="HOA Meme Template"
          className="hoa-meme-template rounded-lg shadow"
        />
      )}

      <p className="hoa-meme-caption text-gray-700 font-medium">
        {caption}
      </p>
    </div>
  );
}

export default HoaMemeEditor;
