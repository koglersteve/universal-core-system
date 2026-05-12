"use client";

import PostCard from "./PostCard";

export default function Component({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-gray-400 p-6">
        No posts available.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
