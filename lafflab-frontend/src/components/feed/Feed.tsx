import FeedList from "@/components/FeedList";

type Props = {
  posts: any[];
};

export default function Feed({ posts }: Props) {
  return <FeedList posts={posts} />;
}
