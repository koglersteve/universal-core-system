// ─── Emotional OS · Identity Types ──────────────────────────────

/** Lightweight, provider-agnostic user identity */
export type UserIdentity = {
  id: string;
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
};
