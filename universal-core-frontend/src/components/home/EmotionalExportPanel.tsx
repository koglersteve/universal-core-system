"use client";

import { useMoodHistoryStore } from "@/state/useMoodHistoryStore";   // ← FIXED

export function EmotionalExportPanel() {
  const { history } = useMoodHistoryStore();   // ← FIXED

  function exportJSON() {
    const blob = new Blob([JSON.stringify(history, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emotional-history.json";
    a.click();
  }

  return (
    <div className="export-panel">
      <h3>Export Emotional Data</h3>
      <button className="export-btn" onClick={exportJSON}>
        Export JSON
      </button>
    </div>
  );
}

