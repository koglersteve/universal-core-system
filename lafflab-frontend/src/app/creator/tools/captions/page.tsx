"use client";

import { useState } from "react";
import LoadingState from "@/components/ui/LoadingState";

export default function CaptionsTool() {
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");

  async function generate() {
    setLoading(true);
    // TODO: Replace with LaffLabApi.generateCaption()
    setTimeout(() => {
      setCaption("Generated caption goes here.");
      setLoading(false);
    }, 500);
  }

  return (
    <div className="p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Caption Generator</h1>

      <button
        onClick={generate}
        className="px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition"
      >
        Generate Caption
      </button>

      {loading && <LoadingState message="Generating…" />}

      {caption && (
        <p className="text-white/80 border border-white/10 p-3 rounded">
          {caption}
        </p>
      )}
    </div>
  );
}
