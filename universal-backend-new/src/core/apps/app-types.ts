// src/core/apps/app-types.ts

export type AppId = "lafflab" | string;

export type AppDefinition = {
  id: AppId;
  name: string;
  slug: string;
  enabled: boolean;
  isPrimary?: boolean;
};

export type CrossAppContext = {
  sourceAppId: AppId;
  targetAppId: AppId;
};

export type CrossAppReactionInput = {
  userId: string;
  postId: string;
  emoji: string;
  sourceAppId: AppId;
  timestamp?: number;
};

export type CrossAppImpressionInput = {
  userId: string;
  postId: string;
  sourceAppId: AppId;
  timestamp?: number;
};
