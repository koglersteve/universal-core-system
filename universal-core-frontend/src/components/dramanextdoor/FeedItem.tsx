import VideoItem from "./VideoItem";
import AudioItem from "./AudioItem";
import ImageItem from "./ImageItem";
import MemeItem from "./MemeItem";
import ReactionBar from "./ReactionBar";

export default function FeedItem({ item }) {
  return (
    <div
      style={{
        marginBottom: "1.5rem",
        background: "#111",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #222",
      }}
    >
      {item.type === "video" && <VideoItem item={item} />}
      {item.type === "audio" && <AudioItem item={item} />}
      {item.type === "image" && <ImageItem item={item} />}
      {item.type === "meme" && <MemeItem item={item} />}

      <ReactionBar item={item} />
    </div>
  );
}
