import { subscribeToReactionStream } from "@/core/reactions/stream";
import type { ReactionStreamEvent } from "@/core/reactions/stream";

export type Notification = {
  id: string;
  userId: string;
  type: "post_trending" | "reaction_spike" | "milestone";
  message: string;
  createdAt: string;
  read: boolean;
};

const notificationsByUser = new Map<string, Notification[]>();

function addNotification(userId: string, notification: Omit<Notification, "id" | "read">) {
  const list = notificationsByUser.get(userId) || [];
  const full: Notification = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    read: false,
    ...notification,
  };
  list.unshift(full);
  notificationsByUser.set(userId, list);
}

export function getNotificationsForUser(userId: string): Notification[] {
  return notificationsByUser.get(userId) || [];
}

// Simple in-memory thresholds
const REACTION_SPIKE_THRESHOLD = 10;

const recentReactionsByPost = new Map<string, { count: number; lastAt: number }>();

function handleReactionEvent(e: ReactionStreamEvent) {
  const postId = e.event.postId;
  const userId = e.event.userId;

  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes

  const entry = recentReactionsByPost.get(postId) || {
    count: 0,
    lastAt: now,
  };

  if (now - entry.lastAt > windowMs) {
    entry.count = 0;
  }

  entry.count += 1;
  entry.lastAt = now;
  recentReactionsByPost.set(postId, entry);

  if (entry.count === REACTION_SPIKE_THRESHOLD && userId) {
    addNotification(userId, {
      userId,
      type: "reaction_spike",
      message: `Your post ${postId} is getting a spike in reactions.`,
      createdAt: new Date().toISOString(),
    });
  }
}

// Initialize subscription once
let initialized = false;

export function initNotificationEngine() {
  if (initialized) return;
  initialized = true;

  subscribeToReactionStream((e) => {
    handleReactionEvent(e);
  });
}
