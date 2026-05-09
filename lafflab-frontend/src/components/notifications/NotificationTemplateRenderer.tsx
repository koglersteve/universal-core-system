"use client";

import { trending } from "@/notifications/templates/trending";
import { system } from "@/notifications/templates/system";
import { newPost } from "@/notifications/templates/new-post";
import { creatorUpdate } from "@/notifications/templates/creator-update";

const templates: Record<string, any> = {
  trending,
  system,
  newPost,
  creatorUpdate,
};

export default function NotificationTemplateRenderer({
  type,
}: {
  type: string;
}) {
  const template = templates[type];

  if (!template) {
    return (
      <div className="text-white/60">
        Unknown notification template.
      </div>
    );
  }

  return (
    <div className="p-4 rounded bg-white/10 border border-white/20 text-white">
      <h2 className="font-bold">{template.title}</h2>
      <p>{template.body}</p>
    </div>
  );
}
