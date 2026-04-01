"use client";

export function MemeStickerTool({ onAdd }: { onAdd: (src: string) => void }) {
  const stickers = ["😂", "🔥", "😼", "🐶", "❤️"];

  return (
    <div className="meme-sticker-tool">
      {stickers.map((s) => (
        <button
          key={s}
          className="meme-sticker-btn"
          onClick={() => onAdd(s)}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
