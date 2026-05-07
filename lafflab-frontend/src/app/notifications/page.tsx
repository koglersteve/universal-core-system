import NotificationsList from "@components/notifications/NotificationsList";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";
import { getUserNotifications } from "@lib/server/notifications";

export default async function NotificationsPage() {
  try {
    const notifications = await getUserNotifications();

    if (!notifications || notifications.length === 0) {
      return (
        <EmptyState
          title="No Notifications"
          message="You're all caught up."
        />
      );
    }

    return (
      <div className="p-4">
        <NotificationsList items={notifications} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load notifications." />;
  }
}
