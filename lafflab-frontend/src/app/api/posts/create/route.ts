import { NextResponse } from "next/server";
import { getUser } from "@/lib/server/user";
import { createPost } from "@/lib/server/posts";

export async function POST(req: Request) {
  const result = await getUser();
  const user = result?.user || null;

  if (!user) {
    return NextResponse.redirect("/login");
  }

  const form = await req.formData();
  const title = form.get("title")?.toString() || "";
  const content = form.get("content")?.toString() || "";

  await createPost({
    title,
    content,
    authorId: user.id,
  });

  return NextResponse.redirect("/feed");
}
