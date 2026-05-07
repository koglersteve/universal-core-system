import PostView from "@/components/post/PostView";
import { getPostById } from "@/lib/server/posts";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);

  return (
    <div className="p-4">
      <PostView post={post} />
    </div>
  );
}

