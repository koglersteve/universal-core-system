"use client";

import { useEffect } from "react";
import { useEmotionalOS } from "@/app/EmotionalOSProvider";
import { useWorldTransition } from "@/lib/dramanextdoor/useWorldTransition";
import { useNotificationEngine } from "@/lib/dramanextdoor/useNotificationEngine";

export function useEmotionalWorldRouter(targetWorld: string) {
  const { state, update } = useEmotionalOS();
  const world = useWorldTransition();
  const notifications = useNotificationEngine();

  useEffect(() => {
    if (state.currentWorld === targetWorld) return;

    // Prevent unsafe world switching
    if (state.volatility > 70) {
      notifications.push("World switch blocked: volatility too high.");
      return;
    }

    // Begin world transition
    world.startTransition?.();

    update({
      lastWorld: state.currentWorld,
      currentWorld: targetWorld,
    });

    notifications.push(`World switched to ${targetWorld}.`);

    // End transition
    setTimeout(() => {
      world.endTransition?.();
    }, 600);
  }, [targetWorld, state, update, world, notifications]);
}
