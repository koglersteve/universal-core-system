"use client";

import { useRouter } from "next/navigation";
import { useMemeEditorStore } from "@/state/useMemeEditorStore";   // ← FIXED
import { MemeCanvas } from "@/components/meme-editor/MemeCanvas";
import { RenderedLayers } from "@/components/meme-editor/RenderedLayers";

export function MemeEditor() {
  const { layers } = useMemeEditorStore();   // ← FIXED
  const router = useRouter();

  async function handleExport() {
    const res = await fetch("/api/meme/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        app: "hoameme",
        mood: "happy",
        title: "My Meme",
        layers
      })
    });

    const data = await res.json();
    router.push(`/meme/${data.id}`);
  }

  return (
    <div className="meme-editor">
      <MemeCanvas>
        <RenderedLayers />
      </MemeCanvas>

      <div className="meme-editor-actions">
        <button className="meme-save-btn" onClick={handleExport}>
          Save Meme
        </button>
      </div>
    </div>
  );
}
