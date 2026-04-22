export interface CanonicalState {
  mood: number;
  tension: number;
  identityState: string;
  worldName: string;
  timestamp: number;
}

export function canonicalizeState(ctx: any, identity: any, world: any): CanonicalState {
  return {
    mood: clamp(ctx.mood, 0, 100),
    tension: clamp(ctx.tension, 0, 1),
    identityState: identity?.state ?? "stable",
    worldName: world?.name ?? "default",
    timestamp: Date.now(),
  };
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
