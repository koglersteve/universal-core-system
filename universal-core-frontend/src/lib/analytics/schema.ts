export type StabilityEvent = {
  app: EmotionalAppId;
  ts: number;
  type:
    | "download"
    | "crash"
    | "freeze"
    | "anr"
    | "performance"
    | "stability-score";

  // identity + session
  userId?: string;
  sessionId?: string;
  appVersion?: string;

  // emotional context
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;

  // environment
  deviceModel?: string;
  osVersion?: string;
  browser?: string;
  networkType?: "wifi" | "cellular" | "offline";
  batteryPct?: number;

  // download metrics
  downloadTimeMs?: number;
  installSuccess?: boolean;

  // crash metrics
  crashType?: string;
  crashMessage?: string;
  crashStack?: string;

  // freeze / ANR metrics
  freezeDurationMs?: number;
  anrDetected?: boolean;

  // performance metrics
  ttiMs?: number; // time-to-interactive
  apiLatencyMs?: number;
  droppedFrames?: number;
  memoryUsageMb?: number;
  cpuUsagePct?: number;

  // stability score
  stabilityScore?: number;

  // custom metadata
  payload?: Record<string, any>;
};
