// src/core/apps/app-sync-service.ts

import { getEnabledApps, getOtherApps } from "./registry";
import type {
  AppId,
  CrossAppReactionInput,
  CrossAppImpressionInput,
} from "./app-types";
import { createId } from "../utils/id";
import { publishEvent } from "../events/publisher";
import type { LocalReactionEvent } from "../reactions/reaction-types";

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
