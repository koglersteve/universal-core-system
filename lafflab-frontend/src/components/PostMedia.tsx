"use client";

import type { Post } from "@/types/jokes";

export default function PostMedia({ post, active }: { post: Post; active: boolean }) {
  // If the post has no media, render nothing
  if (!post.mediaUrl) {
    return null;
  }

  // Image
  if (post.mediaType === "image") {
    return (
      <img
        src={post.mediaUrl}
        alt="Post media"
        className="rounded-lg w-full object-cover"
      />
    );
  }

  // Video
  if (post.mediaType === "video") {
    return (
      <video
        src={post.mediaUrl}
        controls
        className="rounded-lg w-full"
      />
    );
  }

  // Audio
  if (post.mediaType === "audio") {
    return (
      <audio
        src={post.mediaUrl}
        controls
        className="w-full"
      />
    );
  }

  return null;
}
