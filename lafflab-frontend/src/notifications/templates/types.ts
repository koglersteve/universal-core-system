export type NotificationTone =
  | "neutral"
  | "info"
  | "playful"
  | "success"
  | "warning"
  | "error";

export type NotificationTemplate = {
  id: string;
  title: string;
  body: string;
  tone: NotificationTone;
};
