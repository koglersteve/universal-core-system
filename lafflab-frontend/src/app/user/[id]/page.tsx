export const dynamic = "force-dynamic";

import { getUser, getUserById, getFollowerCount, getFollowingCount, getPostCount } from "@/lib/server/user";
import { isFollowing } from "@/lib/server/follow";
import FollowButton from "@/components/FollowButton";

export default async function Component({ params }) {
  const profileUser = await getUserById(params.id);

  if (!profileUser) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">User Not Found</div>
        <div className="text-gray-300">This profile does not exist.</div>
      </div>
    );
  }

  const viewerResult = await getUser();
  const viewer = viewerResult?.user || null;

  const followerCount = await getFollowerCount(params.id);
  const followingCount = await getFollowingCount(params.id);
  const postCount = await getPostCount(params.id);

  let initialIsFollowing = false;

  if (viewer && viewer.id !== profileUser.id) {
    initialIsFollowing = await isFollowing(viewer.id, profileUser.id);
  }

  const showFollowButton = viewer && viewer.id !== profileUser.id;

  return (
    <div className="p-6 text-white space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={profileUser.avatarUrl || "/default-avatar.png"}
            alt=""
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <div className="text-lg font-semibold">{profileUser.username}</div>
            <div className="text-gray-400">@{profileUser.id}</div>
          </div>
        </div>

        {showFollowButton && (
          <FollowButton
            targetUserId={profileUser.id}
            initialIsFollowing={initialIsFollowing}
            initialFollowerCount={followerCount}
          />
        )}
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
          href={`/user/${params.id}/posts`}
          className="block px-4 py-3 bg-white/10 rounded-md hover:bg.white/20 transition"
        >
          View Posts
        </a>
      </div>
    </div>
  );
}
