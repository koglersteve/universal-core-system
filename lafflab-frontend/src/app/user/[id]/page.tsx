import UserProfile from "@components/user/UserProfile";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";
import { getUserById } from "@lib/server/users";

interface UserPageProps {
  params: { id: string };
}

export default async function UserPage({ params }: UserPageProps) {
  try {
    const user = await getUserById(params.id);

    if (!user) {
      return (
        <EmptyState
          title="User Not Found"
          message="This profile may no longer exist."
        />
      );
    }

    return (
      <div className="p-4">
        <UserProfile user={user} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load user profile." />;
  }
}
