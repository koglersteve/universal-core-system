iimport type { ResonanceContext, ResonanceResult } from "../crossapp.types.js";

export type IdentitySnapshot = {
  emojiCounts: Record<string, number>;
};

export class Identity {
  private static perUser: Map<string, IdentitySnapshot> = new Map();

  static update(ctx: ResonanceContext, _res: ResonanceResult) {
    const prev = this.perUser.get(ctx.userId) ?? {
      emojiCounts: {},
    };

    const emoji = ctx.emoji ?? "none";
    const nextCounts = { ...prev.emojiCounts };
    nextCounts[emoji] = (nextCounts[emoji] ?? 0) + 1;

    this.perUser.set(ctx.userId, {
      emojiCounts: nextCounts,
    });
  }

  static snapshot(userId: string): IdentitySnapshot {
    return (
      this.perUser.get(userId) ?? {
        emojiCounts: {},
      }
    );
  }
}
