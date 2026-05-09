import TopBar from "@/components/TopBar";
import FeedList from "./components/FeedList";
import AdBanner from "./components/AdBanner";

export default function FeedPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black">
      <TopBar />
      <AdBanner position="top" />
      <FeedList />
    </div>
  );
}
