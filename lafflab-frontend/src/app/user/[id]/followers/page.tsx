import FollowersList from "@components/user/FollowersList";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";
import { getFollowers } from "@/lib/server/user";

interface FollowersPageProps {
  params: { id: string };
}

export default async function FollowersPage({ params }: FollowersPageProps) {
  try {
    const followers = await getFollowers(params.id);

    if (!followers || followers.length === 0) {
      return (
        <EmptyState
          title="No Followers Yet"
          message="This user doesn't have any followers."
        />
      );
    }

    return (
      <div className="p-4">
        <FollowersList users={followers} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load followers." />;
  }
}
