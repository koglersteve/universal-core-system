import { enqueueNotification } from "./queue";
import { getUserPreferences } from "./preference-store";
import type { NotificationTemplate } from "./dispatcher";

import { trending } from "./templates/trending";
import { system } from "./templates/system";
import { newPost } from "./templates/new-post";
import { creatorUpdate } from "./templates/creator-update";

export async function processNotification(userId: string) {
  const prefs = await getUserPreferences(userId);

  let template: NotificationTemplate;

  if (prefs.trending) {
    template = trending;
  } else if (prefs.system) {
    template = system;
  } else if (prefs.newPost) {
    template = newPost;
  } else {
    template = creatorUpdate;
  }

  await enqueueNotification(userId, template);
}

