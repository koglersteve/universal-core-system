export function DramaFeed({ posts }: { posts: any[] }) {
  return (
    <div>
      <h2>DramaNextDoor Feed</h2>
      <ul>
        {posts.map(p => (
          <li key={p.id}>
            <h3>{p.title}</h3>
            {p.type === 'video' ? (
              <video src={p.mediaUrl} width="300" controls />
            ) : (
              <audio src={p.mediaUrl} controls />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
