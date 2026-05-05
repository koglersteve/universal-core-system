// src/types/os/UserIdentity.ts

/**
 * Canonical Emotional OS user identity shape.
 * Matches exactly what AuthContext reads from Supabase.
 */
export type UserIdentity = {
  id: string;
  email: string | null;
  avatarUrl: string | null;
  displayName: string | null;
  createdAt: string;
};
