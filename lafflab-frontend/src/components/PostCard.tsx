"use client";

export default function Component({ post }) {
  return (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
      <div className="text-white font-semibold mb-2">
        {post.title || "Untitled Post"}
      </div>

      {post.mediaUrl && (
        <img
          src={post.mediaUrl}
          className="w-full rounded-md mb-3"
          alt=""
        />
      )}

      <div className="text-gray-300 text-sm">
        {post.content || "No content"}
      </div>
    </div>
  );
}
