export const dynamic = "force-dynamic";

import { getFollowing } from "@/lib/server/user";

export default async function Component({ params }) {
  const following = await getFollowing(params.id);

  if (!following || following.length === 0) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Following</div>
        <div className="text-gray-300">Not following anyone.</div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-4">
      <div className="text-xl font-semibold mb-4">Following</div>

      {following.map((f) => (
        <div key={f.id} className="flex items-center space-x-3">
          <img
            src={f.avatarUrl || "/default-avatar.png"}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-gray-200">{f.username}</div>
        </div>
      ))}
    </div>
  );
}
