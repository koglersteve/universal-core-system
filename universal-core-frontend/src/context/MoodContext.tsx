// src/context/MoodContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type MoodContextType = {
  mood: string | null;
  setMood: (m: string | null) => void;
};

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState<string | null>(null);

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMoodContext() {
  const ctx = useContext(MoodContext);
  if (!ctx) {
    throw new Error("useMoodContext must be used inside MoodProvider");
  }
  return ctx;
}
