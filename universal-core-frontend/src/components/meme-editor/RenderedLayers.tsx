"use client";

import React from "react";

export function RenderedLayers({ layers }: { layers: any[] }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {layers.map((layer, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: layer.y,
            left: layer.x,
            fontSize: layer.size || 24,
            color: layer.color || "#fff",
            pointerEvents: "none",
            transform: `rotate(${layer.rotation || 0}deg)`
          }}
        >
          {layer.text}
        </div>
      ))}
    </div>
  );
}

export default RenderedLayers;
