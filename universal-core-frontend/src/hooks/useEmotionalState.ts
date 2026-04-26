"use client";

import { useState } from "react";

export function useEmotionalState() {
  const [emotion, setEmotion] = useState("neutral");
  return { emotion, setEmotion };
}
