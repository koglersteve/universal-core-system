// src/notifications/inbox-store.ts

import type { Notification } from "@/types/os";

const inbox: Record<string, Notification[]> = {};

export function addToInbox(userId: string, notification: Notification) {
  if (!inbox[userId]) inbox[userId] = [];
  inbox[userId].push(notification);
}

export function getInbox(userId: string): Notification[] {
  return inbox[userId] ?? [];
}
