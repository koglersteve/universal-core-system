import PostCard from "@/components/PostCard";

type Props = {
  results: any[];
};

export default function SearchResults({ results }: Props) {
  if (!results || results.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-neutral-500">
        No results found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
