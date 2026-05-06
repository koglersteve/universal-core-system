// src/personalization/signal-bundle.ts

import type { UserProfile } from "./profile-store";
import type { SignalBundle } from "./ranker";

export function profileToSignals(profile: UserProfile): SignalBundle {
  return {
    relevance: profile.recentEmotions?.length ?? 0,
    momentum: 0,
    emotion: 0,
    social: profile.followingCount ?? 0,
    governance: 0,
    diversity: 0,
    session: 0,
  };
}
