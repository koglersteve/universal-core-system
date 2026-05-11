"use client";

export default function Component({ post, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl"
      >
        ✕
      </button>

      <div className="max-w-3xl w-full px-4">
        {post.type === "video" && (
          <video
            src={post.mediaUrl}
            controls
            autoPlay
            className="w-full rounded-xl border border-white/10"
          />
        )}

        {post.type === "audio" && (
          <audio
            src={post.mediaUrl}
            controls
            autoPlay
            className="w-full rounded-lg border border-white/10"
          />
        )}

        {(post.type === "image" || post.type === "meme") && (
          <img
            src={post.mediaUrl}
            alt=""
            className="w-full rounded-xl border border-white/10"
          />
        )}

        {post.type === "text" && (
          <p className="text-xl text-white leading-relaxed whitespace-pre-line mt-4">
            {post.text}
          </p>
        )}
      </div>
    </div>
  );
}
