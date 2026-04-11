"use client";

import { useEffect } from "react";
import MemeMyDogEditor from "@/components/mememydog/MemeMyDogEditor";
import { useMemeEditor } from "@/hooks/useMemeEditor";
import { getPresetLayers } from "@/lib/memePresets";

function MemeMyDogEditorInner() {
  const { addLayer } = useMemeEditor();

  useEffect(() => {
    const presetLayers = getPresetLayers("mememydog");
    presetLayers.forEach(addLayer);
  }, [addLayer]);

  return <MemeMyDogEditor />;
}

export default function MemeMyDogEditorPage() {
  return <MemeMyDogEditorInner />;
}

