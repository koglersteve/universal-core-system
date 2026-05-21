"use client";

export default function PostCard({ post }: { post: any }) {
  return (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
      <div className="text-white font-semibold mb-2">
        {post.title || "Untitled Post"}
      </div>

      {post.media && (
        <img
          src={post.media}
          alt=""
          className="w-full rounded-md mb-3"
        />
      )}

      <div className="text-gray-300 text-sm">
        {post.content || "No content"}
      </div>
    </div>
  );
}

