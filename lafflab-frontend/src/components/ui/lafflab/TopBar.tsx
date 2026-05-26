"use client";

export default function TopBar({ onRefresh, onOpenMenu }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 16 }}>
      <button onClick={onOpenMenu}>☰</button>
      <h2>LAFFlab</h2>
      <button onClick={onRefresh}>⟳</button>
    </div>
  );
}
