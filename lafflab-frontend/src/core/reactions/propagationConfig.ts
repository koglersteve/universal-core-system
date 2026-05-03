import type {
  ReactionEmojiKey,
  ReactionChannel,
  SurfaceId,
} from "./types";

export type PropagationAction = {
  targetSurface: SurfaceId;
  channel: ReactionChannel;
  weight: number;
};

const BASE_SURFACES: SurfaceId[] = [
  "feed",
  "for-you-feed",
  "creator-analytics",
  "notifications",
];

export function getPropagationActionsForEmoji(
  emoji: ReactionEmojiKey
): PropagationAction[] {
  switch (emoji) {
    case "laugh":
    case "smile":
      return [
        { targetSurface: "for-you-feed", channel: "feed", weight: 1 },
        { targetSurface: "creator-analytics", channel: "analytics", weight: 0.8 },
      ];
    case "mindblown":
      return [
        { targetSurface: "for-you-feed", channel: "feed", weight: 1 },
        { targetSurface: "notifications", channel: "notification", weight: 0.9 },
      ];
    case "crickets":
      return [
        { targetSurface: "creator-analytics", channel: "analytics", weight: 0.6 },
      ];
    default:
      return BASE_SURFACES.map((surface) => ({
        targetSurface: surface,
        channel: "feed" as const,
        weight: 0.3,
      }));
  }
}
