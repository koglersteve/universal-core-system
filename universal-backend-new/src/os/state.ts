import { Emotion, EmotionState } from "./emotion";
import { Cognitive, CognitiveState } from "./cognitive";
import { Memory, MemoryState } from "./memory";
import { Behavior, BehaviorState } from "./behavior";
import { Intent, IntentState } from "./intent";
import { Identity, IdentityState } from "./identity";

export interface OSState {
  emotion: EmotionState;
  cognitive: CognitiveState;
  memory: MemoryState;
  behavior: BehaviorState;
  intent: IntentState;
  identity: IdentityState;
}

export const OSStateManager = {
  create(): OSState {
    return {
      emotion: Emotion.default(),
      cognitive: Cognitive.default(),
      memory: Memory.default(),
      behavior: Behavior.default(),
      intent: Intent.default(),
      identity: Identity.default()
    };
  }
};
