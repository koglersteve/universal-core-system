// src/personalization/signal-bundle.ts

import type { UserProfile } from "@/types/os";
import type { SignalBundle } from "./ranker";

export function profileToSignals(profile: UserProfile): SignalBundle {
  return {
    relevance: profile.totalReactions ?? 0,
    momentum: profile.recentReactions ?? 0,
    emotion: profile.emotionalScore ?? 0,
    social: profile.followingCount ?? 0,

    // The three fields your ranker requires:
    governance: profile.governanceScore ?? 0,
    diversity: profile.diversityScore ?? 0,
    session: profile.sessionScore ?? 0,
  };
}
