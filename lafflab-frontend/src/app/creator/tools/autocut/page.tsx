"use client";

import { useState } from "react";
import LoadingState from "@/components/ui/LoadingState";

export default function AutoCutTool() {
  const [loading, setLoading] = useState(false);

  async function runAutoCut() {
    setLoading(true);
    // TODO: Replace with LaffLabApi.autoCut()
    setTimeout(() => {
      setLoading(false);
      alert("AutoCut complete (placeholder)");
    }, 600);
  }

  return (
    <div className="p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">AutoCut</h1>

      <button
        onClick={runAutoCut}
        className="px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition"
      >
        Run AutoCut
      </button>

      {loading && <LoadingState message="Processing…" />}
    </div>
  );
}
