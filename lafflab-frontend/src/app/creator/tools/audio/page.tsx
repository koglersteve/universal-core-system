"use client";

import { useState } from "react";
import LoadingState from "@/components/ui/LoadingState";

export default function AudioCleanupTool() {
  const [loading, setLoading] = useState(false);

  async function cleanup() {
    setLoading(true);
    // TODO: Replace with LaffLabApi.audioCleanup()
    setTimeout(() => {
      setLoading(false);
      alert("Audio cleaned (placeholder)");
    }, 600);
  }

  return (
    <div className="p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Audio Cleanup</h1>

      <button
        onClick={cleanup}
        className="px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition"
      >
        Clean Audio
      </button>

      {loading && <LoadingState message="Cleaning…" />}
    </div>
  );
}
