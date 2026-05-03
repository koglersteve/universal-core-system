import type { NotificationEvent } from "../engine";

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
