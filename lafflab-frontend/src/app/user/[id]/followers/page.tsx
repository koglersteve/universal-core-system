export const dynamic = "force-dynamic";

import { getFollowers } from "@/lib/server/user";
import { getUserById } from "@/lib/server/user";

export default async function Component({ params }) {
  const followerIds = await getFollowers(params.id);

  return (
    <div className="p-6 text-white space-y-6">
      <div className="text-xl font-semibold mb-4">Followers</div>

      {followerIds.length === 0 && (
        <div className="text-gray-400">No followers yet.</div>
      )}

      <div className="space-y-4">
        {followerIds.map((fid) => (
          <FollowerItem key={fid} id={fid} />
        ))}
      </div>
    </div>
  );
}

async function FollowerItem({ id }) {
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
