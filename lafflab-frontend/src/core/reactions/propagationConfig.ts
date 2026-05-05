// src/core/reactions/propagationConfig.ts

import type {
  ReactionEmojiKey,
  SurfaceId,
  PropagationAction,
  ReactionChannel,
} from "@/types/os";

const CHANNEL: ReactionChannel = "direct";

export function getPropagationActionsForEmoji(
  emoji: ReactionEmojiKey,
  postId: string
): PropagationAction[] {
  switch (emoji) {
    case "laugh":
      return [
        {
          weight: 3,
          targetSurface: "forYou" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    case "smile":
      return [
        {
          weight: 2,
          targetSurface: "following" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    case "expressionless":
      return [
        {
          weight: 1,
          targetSurface: "global" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    case "shock":
      return [
        {
          weight: 4,
          targetSurface: "trending" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    case "mindblown":
      return [
        {
          weight: 5,
          targetSurface: "creatorHub" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    case "angry":
      return [
        {
          weight: 2,
          targetSurface: "global" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    case "crickets":
      return [
        {
          weight: 0,
          targetSurface: "global" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    default:
      return [];
  }
}
