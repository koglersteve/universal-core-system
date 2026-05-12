export const dynamic = "force-dynamic";

import { getUserIdentity } from "@/lib/server/user";

export default async function Component() {
  const user = await getUserIdentity();

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Retry Review</div>
        <div className="text-gray-300">You must be logged in.</div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="text-xl font-semibold mb-4">Retry Review</div>

      <div className="text-gray-300">
        User ID: {user.id}
      </div>

      <div className="mt-4 text-gray-400">
        Review step placeholder.
      </div>
    </div>
  );
}
