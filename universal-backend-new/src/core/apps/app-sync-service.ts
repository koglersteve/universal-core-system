// src/core/apps/app-sync-service.ts

import { getEnabledApps, getOtherApps } from "./registry.js";
import type {
  AppId,
  CrossAppReactionInput,
  CrossAppImpressionInput,
} from "./app-types.js";
import { createId } from "../utils/id.js";
import { publishEvent } from "../events/publisher.js";
import type { LocalReactionEvent } from "../reactions/reaction-types.js";

const REACTION_FANOUT_EVENT = "reaction.fanout.request" as const;
const IMPRESSION_FANOUT_EVENT = "impression.fanout.request" as const;

export async function fanOutReactionAcrossApps(
  input: CrossAppReactionInput,
): Promise<void> {
  const timestamp = input.timestamp ?? Date.now();
  const targets = getEnabledApps();

  for (const app of targets) {
    const event: LocalReactionEvent = {
      id: createId(),
      userId: input.userId,
      appId: app.id as AppId,
      postId: input.postId,
      emoji: input.emoji,
      timestamp,
    };

    publishEvent(REACTION_FANOUT_EVENT, event);
  }
}

export async function fanOutImpressionAcrossApps(
  input: CrossAppImpressionInput,
): Promise<void> {
  const timestamp = input.timestamp ?? Date.now();
  const targets = getOtherApps(input.sourceAppId);

  for (const app of targets) {
    publishEvent(IMPRESSION_FANOUT_EVENT, {
      id: createId(),
      userId: input.userId,
      appId: app.id as AppId,
      postId: input.postId,
      timestamp,
    });
  }
}
