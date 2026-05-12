export async function getPosts() {
  return [
    {
      id: 1,
      type: "text",
      text: "Welcome to LAFFlab!",
      creator: { screenName: "system" },
      mediaUrl: null
    }
  ];
}

export async function getPostById(id) {
  const posts = await getPosts();
  return posts.find((p) => String(p.id) === String(id)) || null;
}
