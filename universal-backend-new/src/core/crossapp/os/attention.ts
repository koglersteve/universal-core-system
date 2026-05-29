import type { ResonanceContext, ResonanceResult } from "../crossapp.types.js";

export type AttentionSnapshot = {
  lastPostId: string | null;
  focusCount: number;
};

export class Attention {
  private static perUser: Map<string, AttentionSnapshot> = new Map();

  static update(ctx: ResonanceContext, _res: ResonanceResult) {
    const key = ctx.userId;

    const prev = this.perUser.get(key) ?? {
      lastPostId: null,
      focusCount: 0,
    };

    this.perUser.set(key, {
      lastPostId: ctx.postId,
      focusCount: prev.focusCount + 1,
    });
  }

  static snapshot(userId: string): AttentionSnapshot {
    return (
      this.perUser.get(userId) ?? {
        lastPostId: null,
        focusCount: 0,
      }
    );
  }
}
