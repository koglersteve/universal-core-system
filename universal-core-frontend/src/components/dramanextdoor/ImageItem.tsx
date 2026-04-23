export default function ImageItem({ item }) {
  return (
    <img
      src={item.url}
      alt="Drama"
      style={{
        width: "100%",
        display: "block",
        background: "#000",
      }}
    />
  );
}
