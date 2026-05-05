// ─── Emotional OS · Global Type Barrel ──────────────────────────
//
// Single import point for every OS-level type:
//   import type { ReactionEvent, Notification, … } from "@/types/os";
//

// ─── Reactions / Emotional Signals ───────────────────────────────
export type {
  ReactionEmojiKey,
  ReactionCounts,
  ReactionEvent,
} from "./Reactions";

// ─── Propagation / Influence Engine ──────────────────────────────
export type {
  SurfaceId,
  ReactionChannel,
  PropagationAction,
} from "./Propagation";

// ─── Notifications Engine ─────────────────────────────────────────
export type {
  Notification,
  NotificationEvent,
  NotificationTone,
  NotificationContextPayload,
  NotificationTemplate,
} from "./notifications";

// ─── User Identity (AuthContext) ─────────────────────────────────
export type { UserIdentity } from "./UserIdentity";
