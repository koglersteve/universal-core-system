export type EmotionalNotification = {
  id: string;
  type: "mood" | "suggestion" | "ritual" | "safety" | "system";
  title: string;
  message: string;
  mood?: string;
  app?: string;
  createdAt: number;
};
