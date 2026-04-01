"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";
import { useEmotionalNotifications } from "@/hooks/useEmotionalNotifications";
import { useEmotionalGovernance } from "@/hooks/useEmotionalGovernance";

export type EmotionalAgent = {
  id: string;
  name: string;
  role: "guardian" | "trickster" | "companion" | "mirror" | "stabilizer" | "amplifier";
  vector: Record<string, number>;
};

type AgentContextType = {
  agents: EmotionalAgent[];
};

const EmotionalAgentContext = createContext<AgentContextType | undefined>(undefined);

export function EmotionalAgentProvider({ children }: { children: ReactNode }) {
  const { vector: userVector, dominantMood } = useEmotionalPhysics();
  const { pushNotification } = useEmotionalNotifications();
  const { canNotify } = useEmotionalGovernance();

  const [agents, setAgents] = useState<EmotionalAgent[]>([
    {
      id: "guardian",
      name: "Guardian",
      role: "guardian",
      vector: {}
    },
    {
      id: "companion",
      name: "Companion",
      role: "companion",
      vector: {}
    },
    {
      id: "trickster",
      name: "Trickster",
      role: "trickster",
      vector: {}
    }
  ]);

  // Agents react to emotional physics
  useEffect(() => {
    setAgents(prev =>
      prev.map(agent => {
        const newVector: Record<string, number> = {};

        for (const mood in userVector) {
          const base = userVector[mood];

          if (agent.role === "guardian") {
            newVector[mood] = base * 0.6;
          } else if (agent.role === "companion") {
            newVector[mood] = base * 1.0;
          } else if (agent.role === "trickster") {
            newVector[mood] = base * 1.3;
          }
        }

        return { ...agent, vector: newVector };
      })
    );
  }, [userVector]);

  // Agents trigger emotional suggestions
  useEffect(() => {
    if (!dominantMood) return;

    agents.forEach(agent => {
      if (!canNotify()) return;

      if (agent.role === "guardian" && ["angry", "overwhelmed"].includes(dominantMood)) {
        pushNotification({
          type: "suggestion",
          title: "Guardian Suggestion",
          message: "Let’s soften things a bit.",
          mood: dominantMood,
          app: "mememycat"
        });
      }

      if (agent.role === "trickster" && dominantMood === "tired") {
        pushNotification({
          type: "suggestion",
          title: "Trickster Suggestion",
          message: "Want to shake things up?",
          mood: dominantMood,
          app: "lafflab"
        });
      }

      if (agent.role === "companion" && dominantMood === "sad") {
        pushNotification({
          type: "suggestion",
          title: "Companion Suggestion",
          message: "I’m here with you.",
          mood: dominantMood,
          app: "mememydog"
        });
      }
    });
  }, [dominantMood, agents, pushNotification, canNotify]);

  return (
    <EmotionalAgentContext.Provider value={{ agents }}>
      {children}
    </EmotionalAgentContext.Provider>
  );
}

export function useEmotionalAgents() {
  const ctx = useContext(EmotionalAgentContext);
  if (!ctx) throw new Error("useEmotionalAgents must be used inside EmotionalAgentProvider");
  return ctx;
}
