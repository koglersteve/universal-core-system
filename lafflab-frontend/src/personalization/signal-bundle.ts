import type { UserProfile } from "./profile-store";
import type { SignalBundle } from "./ranker";

export function profileToSignals(profile: UserProfile): SignalBundle {
  return {
    relevance: profile.relevance ?? 1,
    momentum: profile.momentum ?? 1,
    emotion: profile.emotion ?? 1,
    social: profile.social ?? 1,
    governance: profile.governance ?? 1,
    diversity: profile.diversity ?? 1,
    session: profile.session ?? 1,
  };
}

