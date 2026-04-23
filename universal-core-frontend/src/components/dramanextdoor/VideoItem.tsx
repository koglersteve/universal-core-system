export default function VideoItem({ item }) {
  return (
    <video
      src={item.url}
      autoPlay
      muted
      loop
      playsInline
      style={{
        width: "100%",
        maxHeight: "70vh",
        objectFit: "cover",
        background: "#000",
      }}
    />
  );
}
