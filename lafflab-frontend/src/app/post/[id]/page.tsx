import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          screenName: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white/70">Post not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto p-4 space-y-4">
        <Link href="/" className="text-sm text-white/60 hover:text-white">
          ← Back
        </Link>

        <div className="border border-white/10 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={post.user.avatarUrl || "/default-avatar.png"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-medium">{post.user.screenName}</div>
              <div className="text-xs text-white/60">@{post.user.username}</div>
            </div>
          </div>

          <div className="text-sm mt-2 whitespace-pre-wrap">
            {post.content}
          </div>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              className="mt-2 max-h-96 rounded-md border border-white/10 object-cover"
            />
          )}

          <div className="text-xs text-white/40 mt-2">
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
