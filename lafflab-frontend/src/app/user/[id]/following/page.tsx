import FollowingList from "@components/user/FollowingList";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";
import { getFollowing } from "@lib/server/users";

interface FollowingPageProps {
  params: { id: string };
}

export default async function FollowingPage({ params }: FollowingPageProps) {
  try {
    const following = await getFollowing(params.id);

    if (!following || following.length === 0) {
      return (
        <EmptyState
          title="Not Following Anyone"
          message="This user hasn't followed anyone yet."
        />
      );
    }

    return (
      <div className="p-4">
        <FollowingList users={following} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load following list." />;
  }
}
