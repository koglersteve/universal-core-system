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
          type: "laugh",
          weight: 3,
          targetSurface: "forYou" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    case "smile":
      return [
        {
          type: "smile",
          weight: 2,
          targetSurface: "following" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    case "expressionless":
      return [
        {
          type: "expressionless",
          weight: 1,
          targetSurface: "global" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    case "shock":
      return [
        {
          type: "shock",
          weight: 4,
          targetSurface: "trending" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    case "mindblown":
      return [
        {
          type: "mindblown",
          weight: 5,
          targetSurface: "creatorHub" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    case "angry":
      return [
        {
          type: "angry",
          weight: 2,
          targetSurface: "global" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    case "crickets":
      return [
        {
          type: "crickets",
          weight: 0,
          targetSurface: "global" satisfies SurfaceId,
          channel: CHANNEL,
        },
      ];

    default:
      return [];
  }
}
