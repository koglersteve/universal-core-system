import type {
  ReactionEmojiKey,
  ReactionChannel,
  SurfaceId,
  PropagationAction,
} from "@/types/os";
import { getUserProfile } from "./userProfile";
import { getAggregatedCounts } from "./engine";

const SURFACES: SurfaceId[] = [
  "feed",
  "for-you-feed",
  "creator-analytics",
  "notifications",
  "recommendations",
  "cross-app-events",
];

const EMOJI_WEIGHTS: Record<ReactionEmojiKey, number> = {
  laugh: 1.0,
  smile: 0.8,
  shock: 0.6,
  expressionless: -0.2,
  angry: -0.6,
  mindblown: 1.2,
  crickets: -1.0,
};

const SURFACE_WEIGHTS: Record<SurfaceId, number> = {
  "feed": 1.0,
  "for-you-feed": 1.4,
  "creator-analytics": 1.2,
  "notifications": 1.3,
  "recommendations": 1.5,
  "cross-app-events": 1.0,
};

const CHANNELS: ReactionChannel[] = [
  "feed",
  "notification",
  "badge",
  "highlight",
  "recommendation",
  "analytics",
  "crosslink",
];

export function getPropagationActionsForEmoji(
  emoji: ReactionEmojiKey,
  postId?: string,
  userId?: string
): PropagationAction[] {
  const baseWeight = EMOJI_WEIGHTS[emoji];

  const profile = userId ? getUserProfile(userId) : null;
  const userAffinity = profile
    ? (profile.emojiCounts[emoji] || 0) /
      Math.max(profile.totalReactions, 1)
    : 0;

  const postCounts = postId ? getAggregatedCounts(postId) : null;
  const postHeat = postCounts
    ? Object.values(postCounts).reduce((a, b) => a + b, 0)
    : 0;
  const postHeatFactor = Math.min(1.5, 1 + postHeat / 50);

  const actions: PropagationAction[] = [];

  for (const surface of SURFACES) {
    const surfaceWeight = SURFACE_WEIGHTS[surface];
    const channel = CHANNELS[Math.floor(Math.random() * CHANNELS.length)];

    const finalWeight =
      baseWeight * surfaceWeight * postHeatFactor +
      userAffinity * 0.5;

    if (finalWeight > 0.1) {
      actions.push({
        targetSurface: surface,
        channel,
        weight: Number(finalWeight.toFixed(3)),
      });
    }
  }

  return actions;
}
