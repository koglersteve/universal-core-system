import trending from "@/notifications/templates/trending";
import system from "@/notifications/templates/system";
import newPost from "@/notifications/templates/new-post";
import creatorUpdate from "@/notifications/templates/creator-update";

const templates = {
  trending,
  system,
  "new-post": newPost,
  "creator-update": creatorUpdate
};

export default function NotificationTemplateRenderer({
  type,
  payload
}: {
  type: string;
  payload: any;
}) {
  const template = templates[type];

  if (!template) {
    return (
      <div className="text-white/60 text-sm">
        Unknown notification type: {type}
      </div>
    );
  }

  const content = template(payload);

  return (
    <div className="text-white text-sm leading-relaxed">
      {content}
    </div>
  );
}
