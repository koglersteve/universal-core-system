import type { ResonanceContext, ResonanceResult } from "../crossapp.types.js";

export type MemoryEvent = {
  postId: string;
  sourceApp?: string;
  polarity: string;
  magnitude: string;
  at: string;
};

export type MemorySnapshot = {
  recent: MemoryEvent[];
};

const MAX_EVENTS_PER_USER = 50;

export class Memory {
  private static perUser: Map<string, MemoryEvent[]> = new Map();

  static update(ctx: ResonanceContext, res: ResonanceResult) {
    const list = this.perUser.get(ctx.userId) ?? [];

    const next: MemoryEvent[] = [
      {
        postId: ctx.postId,
        sourceApp: ctx.sourceApp,
        polarity: res.polarity,
        magnitude: res.magnitude,
        at: res.createdAt,
      },
      ...list,
    ].slice(0, MAX_EVENTS_PER_USER);

    this.perUser.set(ctx.userId, next);
  }

  static snapshot(userId: string): MemorySnapshot {
    return {
      recent: this.perUser.get(userId) ?? [],
    };
  }
}
