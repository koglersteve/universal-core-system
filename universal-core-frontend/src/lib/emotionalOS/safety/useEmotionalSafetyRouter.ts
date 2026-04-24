"use client";

import { useEffect } from "react";
import { useRitualEngine } from "@/lib/dramanextdoor/useRitualEngine";
import { useNotificationEngine } from "@/lib/dramanextdoor/useNotificationEngine";
import { useEmotionalOS } from "@/app/EmotionalOSProvider";

export function useEmotionalSafetyRouter(triggers: string[]) {
  const rituals = useRitualEngine();
  const notifications = useNotificationEngine();
  const { state } = useEmotionalOS();

  useEffect(() => {
    if (!triggers || triggers.length === 0) return;

    triggers.forEach(trigger => {
      // Ritual triggers
      if (trigger.startsWith("ritual:")) {
        const ritualName = trigger.split(":")[1];
        rituals.recommend(ritualName);
      }

      // Notification triggers
      if (trigger.startsWith("notify:")) {
        const message = trigger.split(":")[1];
        notifications.push(`System: ${message}`);
      }

      // Softening triggers
      if (trigger.startsWith("soften:")) {
        notifications.push("System softened emotional slope for safety.");
      }
    });
  }, [triggers, rituals, notifications, state]);
}
