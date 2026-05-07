"use client";

export default function PostView({ post }: { post: any }) {
  if (!post) {
    return <p className="text-white/60">Post not found.</p>;
  }

  return (
    <div className="space-y-4 text-white">
      <h1 className="text-2xl font-semibold">{post.title || "Untitled"}</h1>
      <p className="text-white/80">{post.content || "No content."}</p>
    </div>
  );
}
