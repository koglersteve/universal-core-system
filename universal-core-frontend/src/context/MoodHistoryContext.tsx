"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type MoodEntry = {
  mood: string;
  timestamp: number;
};

type MoodHistoryContextType = {
  history: MoodEntry[];
  addMood: (mood: string) => void;
};

const MoodHistoryContext = createContext<MoodHistoryContextType | undefined>(undefined);

export function MoodHistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<MoodEntry[]>([]);

  const addMood = (mood: string) => {
    setHistory((prev: MoodEntry[]) => [...prev, { mood, timestamp: Date.now() }]);
  };

  return (
    <MoodHistoryContext.Provider value={{ history, addMood }}>
      {children}
    </MoodHistoryContext.Provider>
  );
}

export function useMoodHistoryContext() {
  const ctx = useContext(MoodHistoryContext);
  if (!ctx) throw new Error("useMoodHistoryContext must be used inside MoodHistoryProvider");
  return ctx;
}
