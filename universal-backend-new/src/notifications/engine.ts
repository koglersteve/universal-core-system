import { enqueueNotification } from "./queue";
import { getUserPreferences } from "./preference-store";
import { TrendingTemplate } from "./templates/trending";
import { NewPostTemplate } from "./templates/new-post";
import { CreatorUpdateTemplate } from "./templates/creator-update";
import { SystemTemplate } from "./templates/system";

export type NotificationContext = {
  userId: string;
};

export type NotificationEvent =
  | { type: "post_trending"; postId: string }
  | { type: "new_post_from_favorite"; postId: string; creatorId: string }
  | { type: "creator_update"; creatorId: string }
  | { type: "system_message"; message: string };

export async function handleNotificationEvent(
  ctx: NotificationContext,
  event: NotificationEvent
) {
  const prefs = await getUserPreferences(ctx.userId);

  switch (event.type) {
    case "post_trending":
      if (!prefs.trending) return;
      await enqueueNotification(ctx.userId, TrendingTemplate, event);
      break;

    case "new_post_from_favorite":
      if (!prefs.newPosts) return;
      await enqueueNotification(ctx.userId, NewPostTemplate, event);
      break;

    case "creator_update":
      if (!prefs.creatorUpdates) return;
      await enqueueNotification(ctx.userId, CreatorUpdateTemplate, event);
      break;

    case "system_message":
      await enqueueNotification(ctx.userId, SystemTemplate, event);
      break;
  }
}
