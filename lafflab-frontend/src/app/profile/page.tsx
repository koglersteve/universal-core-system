export const dynamic = "force-dynamic";

import { getUser } from "@/lib/server/user";
import { getFollowerCount, getFollowingCount, getPostCount } from "@/lib/server/user";

export default async function Component() {
  const result = await getUser();
  const user = result?.user || null;

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">My Profile</div>
        <div className="text-gray-300">You are not logged in.</div>
      </div>
    );
  }

  const followerCount = await getFollowerCount(user.id);
  const followingCount = await getFollowingCount(user.id);
  const postCount = await getPostCount(user.id);

  return (
    <div className="p-6 text-white space-y-6">
      <div className="text-xl font-semibold">My Profile</div>

      <div className="flex items-center space-x-4">
        <img
          src={user.avatarUrl || "/default-avatar.png"}
          alt=""
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <div className="text-lg font-semibold">{user.username}</div>
          <div className="text-gray-400">{user.email}</div>
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

      <div className="space-y-3">
        <a
          href="/profile/posts"
          className="block px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition"
        >
          My Posts
        </a>

        <a
          href="/settings/profile"
          className="block px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition"
        >
          Profile Settings
        </a>
      </div>
    </div>
  );
}

