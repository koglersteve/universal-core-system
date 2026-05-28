import { Hono } from "hono";
import { serve } from "@hono/node-server";

// ❌ REMOVE dotenv in production
// dotenv.config();

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

// ... all your routes unchanged ...

// ⭐ Correct port handling
const port = Number(process.env.PORT) || 8080;

// ⭐ Correct host binding for Railway
console.log(`Universal backend listening on port ${port}`);

serve({
  fetch: app.fetch,
  port,
  hostname: "0.0.0.0",
});
