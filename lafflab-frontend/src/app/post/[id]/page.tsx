import FeedPost from "@/app/feed/components/FeedPost";
import { getPostById } from "@/lib/server/posts";

export default async function Component({ params }) {
  const post = await getPostById(params.id);

  if (!post) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        Post not found.
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <FeedPost post={post} />
      </div>
    </div>
  );
}
