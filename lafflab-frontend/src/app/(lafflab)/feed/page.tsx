import { useFeedStore } from "@/store/useFeedStore";

export default function FeedPage() {
  const { items, loadFeed } = useFeedStore();

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div>
      {items.map((post) => (
        <PostView key={post.id} post={post} />
      ))}
    </div>
  );
}
