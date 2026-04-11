"use client";

import { create } from "zustand";

export type EmotionalAgent = {
  id: string;
  name: string;
  role: "guardian" | "trickster" | "companion" | "mirror" | "stabilizer" | "amplifier";
  vector: Record<string, number>;
};

type AgentState = {
  agents: EmotionalAgent[];
  updateVectors: (userVector: Record<string, number>) => void;
};

export const useAgentStore = create<AgentState>((set, get) => ({
  agents: [
    { id: "guardian", name: "Guardian", role: "guardian", vector: {} },
    { id: "companion", name: "Companion", role: "companion", vector: {} },
    { id: "trickster", name: "Trickster", role: "trickster", vector: {} },
  ],

  updateVectors: (userVector) => {
    const updated = get().agents.map((agent) => {
      const newVector: Record<string, number> = {};

      for (const mood in userVector) {
        const base = userVector[mood];

        if (agent.role === "guardian") newVector[mood] = base * 0.6;
        else if (agent.role === "companion") newVector[mood] = base * 1.0;
        else if (agent.role === "trickster") newVector[mood] = base * 1.3;
      }

      return { ...agent, vector: newVector };
    });

    set({ agents: updated });
  },
}));
