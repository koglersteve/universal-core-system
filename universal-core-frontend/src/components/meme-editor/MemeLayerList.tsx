"use client";

export function MemeLayerList({
  layers,
  onSelect
}: {
  layers: string[];
  onSelect: (i: number) => void;
}) {
  return (
    <div className="meme-layer-list">
      <h4 className="meme-layer-title">Layers</h4>

      <div className="meme-layer-items">
        {layers.map((l, i) => (
          <div
            key={i}
            className="meme-layer-item"
            onClick={() => onSelect(i)}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
