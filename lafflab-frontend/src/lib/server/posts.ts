export async function getPosts() {
  return [];
}

export async function getPostsByUser(userId: string) {
  return [];
}

export async function createPost(data: { title: string; content: string; authorId: string }) {
  return {
    id: Math.random().toString(36).slice(2),
    title: data.title,
    content: data.content,
    authorId: data.authorId,
    createdAt: new Date().toISOString(),
  };
}
