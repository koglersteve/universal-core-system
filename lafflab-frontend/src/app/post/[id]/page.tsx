interface PostPageProps {
  params: { id: string };
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Post</h1>
        <p className="text-gray-500">Post ID: {params.id}</p>
      </section>
    </main>
  );
}
