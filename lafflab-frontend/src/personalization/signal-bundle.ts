// src/personalization/signal-bundle.ts

import type { UserProfile } from "./profile-store";
import type { SignalBundle } from "./ranker";

// NOTE: SignalBundle interface is defined in ./ranker.ts
// It should look like:
// export interface SignalBundle {
//   relevance: number;
//   momentum: number;
//   emotion: number;
//   social: number;
//   governance: number;
//   diversity: number;
//   session: number;
// }

export function profileToSignals(profile: UserProfile): SignalBundle {
  return {
    relevance: profile.recentEmotions?.length ?? 0,
    momentum: profile.activityScore ?? 0,
    emotion: profile.emotionalScore ?? 0,
    social: profile.followingCount ?? 0,

    // Required by ranker.ts — all scalar numeric signals
    governance: profile.governanceScore ?? 0,
    diversity: profile.diversityScore ?? 0,
    session: profile.sessionScore ?? 0,
  };
}
