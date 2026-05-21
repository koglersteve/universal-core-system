// src/core/events/event-types.ts

export const EVENT_TYPES = {
  REACTION_FANOUT_REQUEST: "reaction.fanout.request",
  IMPRESSION_FANOUT_REQUEST: "impression.fanout.request",

  REACTION_STORED: "reaction.stored",
  IMPRESSION_STORED: "impression.stored",

  STREAM_BROADCAST: "stream.broadcast",
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
