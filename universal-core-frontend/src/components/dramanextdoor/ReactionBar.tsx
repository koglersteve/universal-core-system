export default function ReactionBar({ item }) {
  async function react(type) {
    await fetch("/api/dramanextdoor/react", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clipId: item.id, reaction: type }),
    });
  }

  return (
    <div
      style={{
        display: "flex",
        padding: "0.75rem 1rem",
        justifyContent: "space-between",
        background: "#0d0d0d",
        borderTop: "1px solid #222",
      }}
    >
      {[
        ["😂", "laugh"],
        ["🙂", "smile"],
        ["😮", "shock"],
        ["😢", "sad"],
        ["😡", "angry"],
        ["🤯", "mindblown"],
        ["😈", "chaos"],
      ].map(([emoji, type]) => (
        <span
          key={type}
          onClick={() => react(type)}
          style={{
            cursor: "pointer",
            fontSize: "1.4rem",
            transition: "transform 0.1s",
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}
