import PostView from "@components/post/PostView";
import ErrorState from "@components/ui/ErrorState";
import EmptyState from "@components/ui/EmptyState";
import { getPostById } from "@lib/server/posts";

interface PostPageProps {
  params: { id: string };
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const post = await getPostById(params.id);

    if (!post) {
      return (
        <EmptyState
          title="Post Not Found"
          message="This post may have been removed."
        />
      );
    }

    return (
      <div className="p-4">
        <PostView post={post} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load post." />;
  }
}

