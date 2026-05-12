export const dynamic = "force-dynamic";

import { getUser } from "@/lib/server/user";

export default async function Component() {
  const result = await getUser();
  const user = result?.user || null;

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Profile Settings</div>
        <div className="text-gray-300">You are not logged in.</div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-4">
      <div className="text-xl font-semibold mb-4">Profile Settings</div>

      <div className="space-y-2">
        <div className="text-gray-400 text-sm">Username</div>
        <div className="text-white">{user.username}</div>
      </div>

      <div className="space-y-2">
        <div className="text-gray-400 text-sm">Email</div>
        <div className="text-white">{user.email}</div>
      </div>

      <a
        href="/settings/profile/edit"
        className="inline-block mt-4 px-4 py-2 bg-white/10 rounded-md hover:bg-white/20 transition"
      >
        Edit Profile
      </a>
    </div>
  );
}
