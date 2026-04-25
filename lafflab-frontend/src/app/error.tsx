"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  );
}
