import { OSState } from "./state";
import { Emotion } from "./emotion";
import { Cognitive } from "./cognitive";
import { Memory } from "./memory";
import { Behavior } from "./behavior";
import { Intent } from "./intent";
import { Identity } from "./identity";

export type OSEventType =
  | "joke_viewed"
  | "joke_favorited"
  | "drama_clip_viewed"
  | "user_goal_set"
  | "user_feedback_positive"
  | "user_feedback_negative";

export interface OSEvent {
  type: OSEventType;
  payload?: any;
}

export const EmotionalEngine = {
  applyEvent(state: OSState, event: OSEvent): OSState {
    let next = { ...state };

    const now = Date.now();

    next.intent = Intent.decay(next.intent, now);
    next.emotion = Emotion.decay(next.emotion, now);
    next.memory = Memory.consolidate(next.memory);

    switch (event.type) {
      case "joke_viewed": {
        next.emotion = Emotion.applyDelta(next.emotion, "joy", 0.15, now);
        next.memory = Memory.add(next.memory, {
          id: `joke-${event.payload?.id ?? now}`,
          type: "event",
          payload: event.payload || {},
          weight: 0.4
        });
        break;
      }
      case "joke_favorited": {
        next.emotion = Emotion.applyDelta(next.emotion, "joy", 0.25, now);
        next.identity = Identity.reinforceTrait(next.identity, "playful", 0.05, now);
        next.memory = Memory.add(next.memory, {
          id: `favorite-${event.payload?.id ?? now}`,
          type: "event",
          payload: event.payload || {},
          weight: 0.8
        });
        break;
      }
      case "drama_clip_viewed": {
        next.emotion = Emotion.applyDelta(next.emotion, "anxious", 0.2, now);
        next.memory = Memory.add(next.memory, {
          id: `drama-${event.payload?.id ?? now}`,
          type: "event",
          payload: event.payload || {},
          weight: 0.6
        });
        break;
      }
      case "user_goal_set": {
        next.intent = Intent.set(
          next.intent,
          event.payload?.goal ?? null,
          event.payload?.direction ?? null,
          event.payload?.strength ?? 0.7
        );
        next.identity = Identity.reinforceTrait(next.identity, "purposeful", 0.05, now);
        break;
      }
      case "user_feedback_positive": {
        next.emotion = Emotion.applyDelta(next.emotion, "joy", 0.2, now);
        next.identity = Identity.reinforceTrait(next.identity, "helpful", 0.05, now);
        break;
      }
      case "user_feedback_negative": {
        next.emotion = Emotion.applyDelta(next.emotion, "sad", 0.2, now);
        next.identity = Identity.reinforceTrait(next.identity, "reflective", 0.05, now);
        break;
      }
    }

    next.cognitive = Cognitive.updateFromEmotion(next.cognitive, next.emotion.intensity, now);
    next.behavior = Behavior.updateFromEmotionAndIntent(
      next.behavior,
      next.emotion.intensity,
      next.intent.strength,
      now
    );

    return next;
  }
};
