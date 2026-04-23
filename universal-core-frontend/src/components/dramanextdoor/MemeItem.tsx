export default function MemeItem({ item }) {
  return (
    <img
      src={item.url}
      alt="Meme"
      style={{
        width: "100%",
        display: "block",
        background: "#111",
        borderBottom: "1px solid #222",
      }}
    />
  );
}
