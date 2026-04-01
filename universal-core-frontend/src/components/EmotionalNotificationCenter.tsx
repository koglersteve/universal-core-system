"use client";

import { useEffect } from "react";
import { useEmotionalNotifications } from "@/hooks/useEmotionalNotifications";
import { useCrossApp } from "@/hooks/useCrossApp";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";
import { useEmotionalGovernance } from "@/hooks/useEmotionalGovernance";

export function EmotionalNotificationCenter() {
  const { notifications, pushNotification } = useEmotionalNotifications();
  const { openApp } = useCrossApp();
  const { dominantMood } = useEmotionalPhysics();
  const { canNotify } = useEmotionalGovernance();

  // Mood → message mapping
  const moodMessages: Record<string, string> = {
    sad: "Want something uplifting?",
    stressed: "A calming laugh might help.",
    angry: "Let’s dramatize this safely.",
    tired: "Soft, cozy energy available.",
    excited: "Channel that excitement."
  };

  // Mood → app mapping
  const appSuggestions: Record<string, string> = {
    sad: "mememydog",
    stressed: "lafflab",
    angry: "dramanextdoor",
    tired: "mememycat",
    excited: "idlyily"
  };

  // Trigger mood-based emotional notifications
  useEffect(() => {
    if (!dominantMood) return;
    if (!canNotify()) return;

    const mood = dominantMood;

    if (moodMessages[mood]) {
      pushNotification({
        type: "suggestion",
        title: "Emotional Suggestion",
        message: moodMessages[mood],
        mood,
        app: appSuggestions[mood]
      });
    }
  }, [dominantMood, canNotify, pushNotification]);

  return (
    <div className="emotion-notification-container">
      {notifications.map(n => (
        <div
          key={n.id}
          className={`emotion-notification notification-${n.type}`}
        >
          <div className="notification-title">{n.title}</div>
          <div className="notification-message">{n.message}</div>

          {n.app && (
            <button
              className="notification-action"
              onClick={() => openApp(n.app as any, { mood: n.mood })}
            >
              Open
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

