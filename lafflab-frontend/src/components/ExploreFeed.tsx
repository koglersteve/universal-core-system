import PostCard from "@/components/PostCard";

type Props = {
  posts: any[];
};

export default function ExploreFeed({ posts }: Props) {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-neutral-500">
        No explore content yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
