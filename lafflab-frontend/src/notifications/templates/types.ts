export type NotificationTone =
  | "default"
  | "success"
  | "warning"
  | "error";

export type NotificationTemplate = {
  id: string;
  title: string;
  body: string;
  tone: NotificationTone;
};
