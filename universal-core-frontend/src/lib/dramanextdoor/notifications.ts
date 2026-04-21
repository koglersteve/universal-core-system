export interface EmotionalNotification {
  id: string;
  title: string;
  message: string;
  moodEffect?: number;
  tensionEffect?: number;
  createdAt: number;
}

export function createNotification(
  title: string,
  message: string,
  moodEffect?: number,
  tensionEffect?: number
): EmotionalNotification {
  return {
    id: crypto.randomUUID(),
    title,
    message,
    moodEffect,
    tensionEffect,
    createdAt: Date.now(),
  };
}
