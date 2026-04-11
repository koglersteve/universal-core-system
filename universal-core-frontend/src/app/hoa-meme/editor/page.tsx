"use client";

import { useEffect } from "react";
import MemeEditor from "@/components/meme-editor/MemeEditor";
import { useMemeEditor } from "@/hooks/useMemeEditor";   // ← FIXED
import { getPresetLayers } from "@/lib/memePresets";

function HOAMemeEditorInner() {
  const { addLayer } = useMemeEditor();

  useEffect(() => {
    const presetLayers = getPresetLayers("hoameme");
    presetLayers.forEach(addLayer);
  }, [addLayer]);

  return <MemeEditor />;
}

export default function HOAMemeEditorPage() {
  return <HOAMemeEditorInner />;   // ← FIXED: use the preset loader
}
