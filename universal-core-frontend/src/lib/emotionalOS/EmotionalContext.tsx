"use client";

import { createContext, useContext, useState } from "react";

const EmotionalContext = createContext(null);

export function EmotionalProvider({ children }) {
  const [mood, setMood] = useState(50);      // baseline neutral
  const [tension, setTension] = useState(0); // baseline calm

  return (
    <EmotionalContext.Provider
      value={{
        mood,
        tension,
        setMood,
        setTension,
      }}
    >
      {children}
    </EmotionalContext.Provider>
  );
}

export function useEmotionalContext() {
  const ctx = useContext(EmotionalContext);
  if (!ctx) {
    throw new Error("useEmotionalContext must be used inside EmotionalProvider");
  }
  return ctx;
}
