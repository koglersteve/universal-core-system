"use client";

export function HOAFeedCard({ image, caption }: { image: string; caption: string }) {
  return (
    <div className="hoameme-card">
      <img src={image} className="hoameme-image" />
      <div className="hoameme-caption">{caption}</div>

      <div className="hoameme-reaction-bar">
        <span className="hoameme-reaction">👍</span>
        <span className="hoameme-reaction">😂</span>
        <span className="hoameme-reaction">🔥</span>
      </div>
    </div>
  );
}
