export const dynamic = "force-dynamic";

import { getUserById } from "@/lib/server/user";
import { getFollowerCount, getFollowingCount, getPostCount } from "@/lib/server/user";
import ProfileTabs from "@/components/ProfileTabs";

export default async function Component({ params }) {
  const user = await getUserById(params.id);

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">User Not Found</div>
        <div className="text-gray-300">This profile does not exist.</div>
      </div>
    );
  }

  const followerCount = await getFollowerCount(params.id);
  const followingCount = await getFollowingCount(params.id);
  const postCount = await getPostCount(params.id);

  return (
    <div className="p-6 text-white space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatarUrl || "/default-avatar.png"}
          alt=""
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <div className="text-lg font-semibold">{user.username}</div>
          <div className="text-gray-400">@{user.id}</div>
        </div>
      </div>

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

      <ProfileTabs id={params.id} />

      <div className="text-gray-300">This user's profile overview.</div>
    </div>
  );
}
