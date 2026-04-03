"use client";

import React from "react";

export default function RenderedLayers({ layers }: { layers: any[] }) {
  return (
    <div style={{ position: "relative" }}>
      {layers.map((layer, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: layer.y,
            left: layer.x,
            fontSize: layer.size || 24,
            color: layer.color || "#fff",
            pointerEvents: "none"
          }}
        >
          {layer.text}
        </div>
      ))}
    </div>
  );
}
