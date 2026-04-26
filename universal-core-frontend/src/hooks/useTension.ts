"use client";

import { useState } from "react";

export function useTension() {
  const [tension, setTension] = useState(0);

  const increaseTension = () => setTension((t) => t + 1);
  const decreaseTension = () => setTension((t) => Math.max(0, t - 1));

  return { tension, increaseTension, decreaseTension };
}
