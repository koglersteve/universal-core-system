export const dynamic = "force-dynamic";

import { getUserIdentity } from "@/lib/server/user";

export default async function Component() {
  const user = await getUserIdentity();

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Upload Verification</div>
        <div className="text-gray-300">You must be logged in.</div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="text-xl font-semibold mb-4">Upload Verification</div>

      <form
        action="/verify/upload/verify"
        method="get"
        className="space-y-4"
      >
        <button
          className="px-4 py-3 bg-white/10 rounded-md hover:bg-white/20 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

