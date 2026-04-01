"use client";

export function MemeTextTool({ onAdd }: { onAdd: () => void }) {
  return (
    <button className="meme-text-btn" onClick={onAdd}>
      Add Text
    </button>
  );
}
