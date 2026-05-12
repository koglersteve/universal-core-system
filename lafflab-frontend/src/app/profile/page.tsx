export const dynamic = "force-dynamic";

import { getUser } from "@/lib/server/user";
import { getFollowerCount, getFollowingCount, getPostCount } from "@/lib/server/user";
import ProfileHeader from "@/components/ProfileHeader";

export default async function Component() {
  const { user } = await getUser();

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Profile</div>
        <div className="text-gray-300">You are not logged in.</div>
      </div>
    );
  }

  const followerCount = await getFollowerCount(user.id);
  const followingCount = await getFollowingCount(user.id);
  const postCount = await getPostCount(user.id);

  return (
    <div className="p-6 text-white space-y-6">
      <ProfileHeader user={user} editable={true} />

      <div className="flex space-x-8 text-center">
        <div>
          <div className="text-xl font-bold">{postCount}</div>
          <div className="text-gray-400 text-sm">Posts</div>
        </div>
        <div>
          <div className="text-xl font-bold">{followerCount}</div>
          <div className="text-gray-400 text-sm">Followers</div>
        </div>
        <div>
          <div className="text-xl font-bold">{followingCount}</div>
          <div className="text-gray-400 text-sm">Following</div>
        </div>
      </div>
    </div>
  );
}

