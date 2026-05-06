// src/types/os/index.ts

// ─── User Identity (AuthContext) ─────────────────────────────────
export type { UserIdentity } from "./UserIdentity";

// ─── Session / Auth Payloads ─────────────────────────────────────
export type { AuthContextValue } from "./AuthContext";

// ─── Feed / Content Types ─────────────────────────────────────────
export type {
  FeedItem,
  FeedSource,
  FeedContextPayload,
} from "./feed";

// ─── Reactions (legacy OS types removed) ──────────────────────────
// No reaction or notification types are exported from OS anymore.

// ─── System Types (still valid) ───────────────────────────────────
export type { SystemStatus } from "./SystemStatus";
