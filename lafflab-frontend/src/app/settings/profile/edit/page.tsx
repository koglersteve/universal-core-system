export const dynamic = "force-dynamic";

import { getUser } from "@/lib/server/user";

export default async function Component() {
  const result = await getUser();
  const user = result?.user || null;

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Edit Profile</div>
        <div className="text-gray-300">You are not logged in.</div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-6">
      <div className="text-xl font-semibold mb-4">Edit Profile</div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Username</label>
          <input
            defaultValue={user.username}
            className="w-full px-3 py-2 rounded-md bg-black border border-white/20 text-white focus:outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            defaultValue={user.email}
            className="w-full px-3 py-2 rounded-md bg-black border border-white/20 text-white focus:outline-none focus:border-white"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
