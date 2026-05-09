import type { Notification } from "./dispatcher";

const inbox: Record<string, Notification[]> = {};

export function addToInbox(userId: string, notification: Notification) {
  if (!inbox[userId]) inbox[userId] = [];
  inbox[userId].push(notification);
}

export function getInbox(userId: string): Notification[] {
  return inbox[userId] ?? [];
}

export function clearInbox(userId: string) {
  inbox[userId] = [];
}

export function clearAllInboxes() {
  for (const key in inbox) delete inbox[key];
}
