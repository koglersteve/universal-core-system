import { Hono } from "hono";
import { serve } from "@hono/node-server";
import dotenv from "dotenv";

dotenv.config();

type Post = {
  id: string;
  text: string;
  tags: string[];
  isFavorite?: boolean;
  score?: number;
};

const posts: Post[] = [
  {
    id: "1",
    text: "Why did the developer go broke? Because they used up all their cache.",
    tags: ["dev", "jokes", "cache"],
    isFavorite: true,
    score: 10,
  },
  {
    id: "2",
    text: "I told my computer I needed a break, and it said: 'You seem stressed, want to enter safe mode?'",
    tags: ["computer", "jokes"],
    isFavorite: false,
    score: 7,
  },
  {
    id: "3",
    text: "Debugging: Being the detective in a crime movie where you are also the murderer.",
    tags: ["debugging", "dev"],
    isFavorite: true,
    score: 15,
  },
];

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Universal Backend online",
    updatedAt: Date.now(),
  });
});

app.get("/core/health", (c) => {
  return c.json({
    status: "ok",
    message: "Core health online",
    updatedAt: Date.now(),
  });
});

app.get("/core/feed", (c) => {
  return c.json({
    posts,
    message: "Feed API online",
    updatedAt: Date.now(),
  });
});

app.get("/core/posts", (c) => {
  return c.json({
    posts,
    count: posts.length,
  });
});

app.get("/core/posts/:id", (c) => {
  const id = c.req.param("id");
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  return c.json({ post });
});

app.get("/core/favorites", (c) => {
  const favorites = posts.filter((p) => p.isFavorite);
  return c.json({
    favorites,
    count: favorites.length,
  });
});

app.get("/core/explore", (c) => {
  const sorted = [...posts].sort((a, b) => (b.score || 0) - (a.score || 0));
  return c.json({
    posts: sorted,
    count: sorted.length,
  });
});

app.get("/core/trending", (c) => {
  const sorted = [...posts]
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 5);

  return c.json({
    posts: sorted,
    count: sorted.length,
  });
});

app.get("/core/search", (c) => {
  const q = (c.req.query("q") || "").toLowerCase().trim();

  if (!q) {
    return c.json({
      results: [],
      count: 0,
      message: "Empty query",
    });
  }

  const results = posts.filter((p) => {
    const inText = p.text.toLowerCase().includes(q);
    const inTags = p.tags.some((t) => t.toLowerCase().includes(q));
    return inText || inTags;
  });

  return c.json({
    results,
    count: results.length,
    query: q,
  });
});

app.get("/core/profile", (c) => {
  return c.json({
    message: "Profile API online",
    updatedAt: Date.now(),
    profile: {
      id: "user-1",
      name: "LAFFlab User",
      favoritesCount: posts.filter((p) => p.isFavorite).length,
      postsCount: posts.length,
    },
  });
});

// NEW: Profile by username
app.get("/core/profile/:username", (c) => {
  const username = c.req.param("username");

  return c.json({
    id: `user-${username}`,
    username,
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    bio: `This is the profile for ${username}.`,
    createdAt: Date.now(),
  });
});

// NEW: Profile posts by username
app.get("/core/profile/:username/posts", (c) => {
  const username = c.req.param("username");

  const userPosts = posts.filter((p) =>
    p.tags.some((t) => t.toLowerCase().includes(username.toLowerCase()))
  );

  return c.json({
    posts: userPosts,
    count: userPosts.length,
  });
});

const port = Number(process.env.PORT) || 3000;

console.log(`Universal backend listening on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
