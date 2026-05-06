// src/personalization/signal-bundle.ts

import type { UserProfile } from "./profile-store";
import type { SignalBundle } from "./ranker";

export function profileToSignals(profile: UserProfile): SignalBundle {
  return {
    relevance: profile.recentEmotions?.length ?? 0,
    momentum: profile.activityScore ?? 0,
    emotion: profile.emotionalScore ?? 0,
    social: profile.followingCount ?? 0,
    governance: profile.governanceScore ?? 0,
    diversity: profile.diversityScore ?? 0,
    session: profile.sessionScore ?? 0,
  };
}
