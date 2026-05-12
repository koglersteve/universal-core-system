export const dynamic = "force-dynamic";

import { getFollowing } from "@/lib/server/user";
import { getUserById } from "@/lib/server/user";

export default async function Component({ params }) {
  const followingIds = await getFollowing(params.id);

  return (
    <div className="p-6 text-white space-y-6">
      <div className="text-xl font-semibold mb-4">Following</div>

      {followingIds.length === 0 && (
        <div className="text-gray-400">Not following anyone.</div>
      )}

      <div className="space-y-4">
        {followingIds.map((fid) => (
          <FollowingItem key={fid} id={fid} />
        ))}
      </div>
    </div>
  );
}

async function FollowingItem({ id }) {
  const user = await getUserById(id);

  return (
    <div className="flex items-center space-x-3">
      <img
        src={user?.avatarUrl || "/default-avatar.png"}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <div className="text-white font-semibold">{user?.username || "Unknown"}</div>
        <div className="text-gray-400 text-sm">@{id}</div>
      </div>
    </div>
  );
}
