export async function GET() {
  return Response.json([
    {
      id: "p1",
      type: "text",
      text: "LAFFlab is alive again — rebuilding the emotional OS one post at a time.",
      mediaUrl: null,
      score: 42,
      creator: {
        id: "u1",
        screenName: "Steve",
        avatarUrl: "https://i.pravatar.cc/150?img=3"
      }
    },
    {
      id: "p2",
      type: "image",
      text: "Mood of the day.",
      mediaUrl: "https://picsum.photos/600/800?random=1",
      score: 12,
      creator: {
        id: "u2",
        screenName: "Aurelia",
        avatarUrl: "https://i.pravatar.cc/150?img=5"
      }
    },
    {
      id: "p3",
      type: "text",
      text: "If you’re reading this, the feed is officially working again.",
      mediaUrl: null,
      score: 7,
      creator: {
        id: "u3",
        screenName: "LAFFbot",
        avatarUrl: "https://i.pravatar.cc/150?img=8"
      }
    },
    {
      id: "p4",
      type: "image",
      text: "Prototype meme test.",
      mediaUrl: "https://picsum.photos/700/700?random=2",
      score: 99,
      creator: {
        id: "u4",
        screenName: "MemeCore",
        avatarUrl: "https://i.pravatar.cc/150?img=12"
      }
    },
    {
      id: "p5",
      type: "text",
      text: "Scaling animation test — scroll slowly and watch the spotlight effect.",
      mediaUrl: null,
      score: 3,
      creator: {
        id: "u5",
        screenName: "DevMode",
        avatarUrl: "https://i.pravatar.cc/150?img=15"
      }
    }
  ]);
}
