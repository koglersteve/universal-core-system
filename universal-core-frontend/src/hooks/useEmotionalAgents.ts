"use client";

import { useAgentStore } from "@/state/useAgentStore";
import { useAgentEngine } from "@/hooks/useAgentEngine";

export function useEmotionalAgents() {
  // Activate the agent engine (vector updates + suggestions)
  useAgentEngine();

  // Access agent state from Zustand
  const agents = useAgentStore((s) => s.agents);

  return { agents };
}
