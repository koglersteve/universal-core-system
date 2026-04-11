"use client";

import { useEffect } from "react";
import { useAgentStore } from "@/state/useAgentStore";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";
import { useEmotionalNotifications } from "@/hooks/useEmotionalNotifications";
import { useEmotionalGovernance } from "@/hooks/useEmotionalGovernance";

export function useAgentEngine() {
  const { vector, dominantMood } = useEmotionalPhysics();
  const { updateVectors, agents } = useAgentStore();
  const { pushNotification } = useEmotionalNotifications();
  const { canNotify } = useEmotionalGovernance();

  // Update agent emotional vectors
  useEffect(() => {
    updateVectors(vector);
  }, [vector, updateVectors]);

  // Trigger agent suggestions
  useEffect(() => {
    if (!dominantMood) return;

    agents.forEach((agent) => {
      if (!canNotify()) return;

      if (agent.role === "guardian" && ["angry", "overwhelmed"].includes(dominantMood)) {
        pushNotification({
          type: "suggestion",
          title: "Guardian Suggestion",
          message: "Let’s soften things a bit.",
          mood: dominantMood,
          app: "mememycat",
        });
      }

      if (agent.role === "trickster" && dominantMood === "tired") {
        pushNotification({
          type: "suggestion",
          title: "Trickster Suggestion",
          message: "Want to shake things up?",
          mood: dominantMood,
          app: "lafflab",
        });
      }

      if (agent.role === "companion" && dominantMood === "sad") {
        pushNotification({
          type: "suggestion",
          title: "Companion Suggestion",
          message: "I’m here with you.",
          mood: dominantMood,
          app: "mememydog",
        });
      }
    });
  }, [dominantMood, agents, pushNotification, canNotify]);
}
