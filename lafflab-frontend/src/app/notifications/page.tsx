import NotificationsList from "@/components/notifications/NotificationsList";
import { getNotifications } from "@/lib/server/notifications";

export default async function NotificationsPage() {
  const items = await getNotifications();

  return (
    <div className="p-4">
      <NotificationsList items={items} />
    </div>
  );
}
