// src/lib/analytics/schema.ts

export type EmotionalAppId =
  | "dramanextdoor"
  | "idlyily"
  | "hoa-meme"
  | "mememydog"
  | "mememycat"
  | "lafflab"
  | "moodcheck";

export type EmotionalEvent = {
  // core identifiers
  eventId?: string; // generated client-side
  app: EmotionalAppId;
  type: string;
  category?: string; // e.g. "emotion", "meme", "navigation", "world"
  ts: number;

  // identity + session
  userId?: string | null;
  sessionId?: string | null;
  appVersion?: string | null;

  // emotional context
  mood?: string | null;
  world?: string | null;      // legacy
  worldId?: string | null;    // structured
  trait?: string | null;
  agent?: string | null;

  // emotional vector (optional)
  vector?: Record<string, number>;

  // physics + identity
  physicsMomentum?: number;
  identityProfile?: string;

  // environment metadata
  device?: string;
  network?: string;

  // app-specific payload
  payload?: Record<string, any>;

  // schema version
  v?: number;
};
