// ─── Emotional OS · Notification Types ──────────────────────────

export type Notification = {
  id: string;
  userId: string;
  type: "post_trending" | "reaction_spike" | "milestone";
  message: string;
  createdAt: string;
  read: boolean;
};

export type NotificationEvent =
  | { type: "post_trending"; postId: string; score: number }
  | { type: "new_post_from_favorite"; postId: string; creatorId: string }
  | { type: "creator_update"; creatorId: string }
  | { type: "system_message"; message: string };

export type NotificationTone =
  | "neutral"
  | "playful"
  | "urgent"
  | "celebratory";

export type NotificationContextPayload = {
  title: string;
  body: string;
  url?: string;
  tone: NotificationTone;
};

export type NotificationTemplate = {
  id: string;
  channels: ("push" | "inapp" | "email")[];
  buildContext: (event: NotificationEvent) => NotificationContextPayload;
};
