// src/personalization/signal-bundle.ts

import type { UserProfile } from "@/types/os";

export type SignalBundle = {
  relevance: number;
  momentum: number;
  emotion: number;
  social: number;
  activity: number;
  affinity: number;
  freshness: number;
};

export function profileToSignals(profile: UserProfile): SignalBundle {
  return {
    relevance: profile.totalReactions ?? 0,
    momentum: profile.recentReactions ?? 0,
    emotion: profile.emotionalScore ?? 0,
    social: profile.followingCount ?? 0,
    activity: profile.activityScore ?? 0,
    affinity: profile.affinityScore ?? 0,
    freshness: profile.lastActiveTimestamp ?? 0,
  };
}
