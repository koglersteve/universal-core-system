"use client";

export function MemeExportButton({ onExport }: { onExport: () => void }) {
  return (
    <button className="meme-export-button" onClick={onExport}>
      Export Meme
    </button>
  );
}
