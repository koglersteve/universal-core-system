import { getUserById } from "@/lib/server/user";
import { getFollowerCount, getFollowingCount } from "@/lib/server/follow";
import { getUser } from "@/lib/server/user";
import FollowButton from "@/components/FollowButton";
import { isFollowing } from "@/lib/server/follow";

export default async function Page({ params }: { params: { id: string } }) {
  const profile = await getUserById(params.id);
  if (!profile) return <div className="p-6 text-white">User not found.</div>;

  const { user } = await getUser();

  const followerCount = await getFollowerCount(profile.id);
  const followingCount = await getFollowingCount(profile.id);

  const following = user
    ? await isFollowing(user.id, profile.id)
    : false;

  return (
    <div className="p-6 text-white space-y-4">
      <div className="text-2xl font-semibold">{profile.screenName}</div>

      <div className="flex gap-4 text-sm text-white/70">
        <div>{followerCount} Followers</div>
        <div>{followingCount} Following</div>
      </div>

      {user && user.id !== profile.id && (
        <FollowButton userId={profile.id} initialFollowing={following} />
      )}
    </div>
  );
}
