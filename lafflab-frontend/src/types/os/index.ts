// ─── Emotional OS · Global Type Barrel ──────────────────────────
//
// Single import point for every OS-level type:
//   import type { ReactionEvent, Notification, … } from "@/types/os";
//

export type {
  ReactionEmojiKey,
  SurfaceId,
  ReactionChannel,
  ReactionEvent,
  ReactionPropagation,
  ReactionCounts,
  PropagationAction,
} from "./Reactions";

export type {
  Notification,
  NotificationEvent,
  NotificationTone,
  NotificationContextPayload,
  NotificationTemplate,
} from "./notifications";

export type { UserIdentity } from "./identity";
