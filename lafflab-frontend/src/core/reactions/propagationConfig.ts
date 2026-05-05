// src/core/reactions/propagationConfig.ts

import { ReactionEmojiKey, PropagationAction, SurfaceId } from "@/types/os";

/**
 * Define how each emoji propagates through the Emotional OS.
 * Each reaction triggers one or more propagation actions.
 */
export function getPropagationActionsForEmoji(
  emoji: ReactionEmojiKey,
  postId: string
): PropagationAction[] {
  switch (emoji) {
    case "laugh":
      return [
        {
          type: "boost",
          weight: 3,
          targetSurface: "forYou" satisfies SurfaceId,
          channel: "engagement",
        },
      ];

    case "smile":
      return [
        {
          type: "boost",
          weight: 2,
          targetSurface: "forYou",
          channel: "light-engagement",
        },
      ];

    case "shock":
      return [
        {
          type: "boost",
          weight: 3,
          targetSurface: "trending",
          channel: "high-energy",
        },
      ];

    case "mindblown":
      return [
        {
          type: "boost",
          weight: 5,
          targetSurface: "trending",
          channel: "viral",
        },
      ];

    case "expressionless":
      return [
        {
          type: "penalty",
          weight: -1,
          targetSurface: "forYou",
          channel: "neutral",
        },
      ];

    case "angry":
      return [
        {
          type: "penalty",
          weight: -2,
          targetSurface: "forYou",
          channel: "negative",
        },
      ];

    case "crickets":
      return [
        {
          type: "penalty",
          weight: -3,
          targetSurface: "forYou",
          channel: "silence",
        },
      ];

    default:
      return [];
  }
}
