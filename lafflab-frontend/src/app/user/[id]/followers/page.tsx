export const dynamic = "force-dynamic";

import { getFollowers } from "@/lib/server/user";

export default async function Component({ params }) {
  const followers = await getFollowers(params.id);

  if (!followers || followers.length === 0) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Followers</div>
        <div className="text-gray-300">No followers yet.</div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-4">
      <div className="text-xl font-semibold mb-4">Followers</div>

      {followers.map((f) => (
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
