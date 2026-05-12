export const dynamic = "force-dynamic";

import { getUser } from "@/lib/server/user";

export default async function Component() {
  const result = await getUser();
  const user = result?.user || null;

  if (!user) {
    return (
      <div className="p-6 text-white">
        <div className="text-xl font-semibold mb-4">Create Post</div>
        <div className="text-gray-300">You must be logged in to create a post.</div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-6">
      <div className="text-xl font-semibold mb-4">Create Post</div>

      <form
        action="/api/posts/create"
        method="POST"
        className="space-y-4"
      >
        <div>
          <label className="block text-sm text-gray-400 mb-1">Title</label>
          <input
            name="title"
            className="w-full px-3 py-2 rounded-md bg-black border border-white/20 text-white focus:outline-none focus:border-white"
            placeholder="Post title"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Content</label>
          <textarea
            name="content"
            rows={5}
            className="w-full px-3 py-2 rounded-md bg-black border border-white/20 text-white focus:outline-none focus:border-white"
            placeholder="Write something..."
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition"
        >
          Publish
        </button>
      </form>
    </div>
  );
}

