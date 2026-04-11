"use client";

import { useEffect } from "react";
import MemeEditor from "@/components/meme-editor/MemeEditor";
import { useMemeEditorStore } from "@/state/useMemeEditorStore";
import { getPresetLayers } from "@/lib/memePresets";

function HOAMemeEditorInner() {
  const addLayer = useMemeEditorStore((s) => s.addLayer);

  useEffect(() => {
    const presetLayers = getPresetLayers("hoameme");
    presetLayers.forEach(addLayer);
  }, [addLayer]);

  return <MemeEditor />;
}

export default function HOAMemeEditorPage() {
  return <HOAMemeEditorInner />;
}
