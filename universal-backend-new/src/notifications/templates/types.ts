import type { NotificationEvent } from "../engine";

export type NotificationContextPayload = {
  title: string;
  body: string;
  url?: string;
};

export type NotificationTemplate = {
  id: string;
  channels: ("push" | "inapp" | "email")[];
  buildContext: (event: NotificationEvent) => NotificationContextPayload;
};
