import { LaffLabApi } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }) {
  const id = params.id;
  const post = await LaffLabApi.getPost(id);

  return (
    <div style={{ padding: 24 }}>
      <h1>Post {id}</h1>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
}
