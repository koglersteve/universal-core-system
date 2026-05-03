import type { NotificationTone } from "./templates/types";

type InboxItem = {
  id: string;
  userId: string;
  title: string;
  body: string;
  url?: string;
  tone: NotificationTone;
  read: boolean;
  createdAt: number;
};

const inbox: InboxItem[] = [];

export async function addToInbox(
  item: Omit<InboxItem, "id" | "createdAt" | "read">
) {
  const entry: InboxItem = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    read: false,
    ...item,
  };

  inbox.push(entry);
  return entry;
}

export async function getInbox(userId: string) {
  return inbox
    .filter((n) => n.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export async function markRead(userId: string, id: string) {
  const item = inbox.find((n) => n.userId === userId && n.id === id);
  if (item) item.read = true;
}
