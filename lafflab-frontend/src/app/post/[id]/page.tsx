import { LaffLabApi } from "@/lib/api";
import JokeCard from "@/components/JokeCard";
import type { Post } from "@/types/jokes";

interface Props {
  params: { id: string };
}

export default async function PostPage({ params }: Props) {
  const post: Post = await LaffLabApi.getPost(params.id);

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <JokeCard post={post} active={true} />
    </div>
  );
}
