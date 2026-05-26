"use client";

import { useEffect, useState } from "react";

export function useSpotlight() {
  const [centerY, setCenterY] = useState(0);

  useEffect(() => {
    const update = () => {
      setCenterY(window.innerHeight / 2);
    };

    update();
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return centerY;
}

export function getSpotlightStyles(distance: number) {
  const maxScale = 1.05;
  const minScale = 0.95;

  const maxOpacity = 1;
  const minOpacity = 0.6;

  const normalized = Math.max(0, 1 - distance * 0.003);

  const scale = minScale + (maxScale - minScale) * normalized;
  const opacity = minOpacity + (maxOpacity - minOpacity) * normalized;

  return { scale, opacity };
}
