"use client";

type Post = {
  id: string;
  type: "meme" | "text";
  text: string | null;
  mediaUrl: string | null;
  score: number;
  createdAt: string;
};

export function PostCard({ post }: { post: Post }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fffbf0, #ffe4ff)",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        border: "2px solid rgba(0,0,0,0.05)",
      }}
    >
      {post.type === "meme" && post.mediaUrl && (
        <img
          src={post.mediaUrl}
          alt="LAFFLab meme"
          style={{
            width: "100%",
            borderRadius: 12,
            marginBottom: 12,
            border: "3px solid #ff66c4",
          }}
        />
      )}

      {post.type === "text" && post.text && (
        <p
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 8,
            color: "#2b1347",
          }}
        >
          {post.text}
        </p>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          color: "#5b3b7a",
          marginTop: 4,
        }}
      >
        <span>🔥 Score: {post.score}</span>
        <span>{new Date(post.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
}
