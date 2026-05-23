import { LaffLabApi } from "@/lib/LaffLabApi";
import PostView from "@/components/post/PostView";

type Props = { params: { id: string } };

export default async function PostPage({ params }: Props) {
  const post = await LaffLabApi.getPost(params.id);

  return (
    <div className="max-w-xl mx-auto">
      <PostView post={post} />
    </div>
  );
}

