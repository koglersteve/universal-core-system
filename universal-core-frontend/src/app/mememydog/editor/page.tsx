"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import MemeEditor from "@/components/meme-editor/MemeEditor";
import { useMemeEditor } from "@/context/MemeEditorContext";
import { getMoodCaption, getMoodStickers } from "@/lib/memeemotions";

function DogMemeEditorInner() {
  const params = useSearchParams();
  const mood = params.get("mood");
  const { addLayer } = useMemeEditor();

  useEffect(() => {
    if (!mood) return;

    const caption = getMoodCaption(mood);
    const stickers = getMoodStickers(mood);

    addLayer({
      id: crypto.randomUUID(),
      type: "text",
      content: caption,
      x: 40,
      y: 320,
      width: 320,
      height: 60,
      rotation: 0
    });

    stickers.forEach((s, i) => {
      addLayer({
        id: crypto.randomUUID(),
        type: "sticker",
        content: s,
        x: 60 + i * 60,
        y: 260,
        width: 50,
        height: 50,
        rotation: 0
      });
    });
  }, [mood, addLayer]);

  return <MemeEditor />;
}

export default function DogMemeEditorPage() {
  return <DogMemeEditorInner />;
}
