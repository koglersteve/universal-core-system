"use client";

import { Post } from "@/types/post";

export default function PostViewer({
  post,
  onClose
}: {
  post: Post;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      {/* Fullscreen media */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl"
      >
        ✕
      </button>
    </div>
  );
}
