"use client";

export default function MenuDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 250,
        height: "100vh",
        background: "#111",
        color: "#fff",
        padding: 24,
      }}
    >
      <button onClick={onClose}>Close</button>
      <div style={{ marginTop: 24 }}>
        <p>Feed</p>
        <p>Favorites</p>
        <p>History</p>
        <p>Settings</p>
      </div>
    </div>
  );
}
