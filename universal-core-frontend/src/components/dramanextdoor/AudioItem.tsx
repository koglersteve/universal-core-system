export default function AudioItem({ item }) {
  return (
    <div style={{ padding: "1rem", background: "#0a0a0a" }}>
      <audio controls src={item.url} style={{ width: "100%" }} />
    </div>
  );
}
