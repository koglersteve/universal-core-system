import { NextResponse } from "next/server";

let profileData = {
  name: "New User",
  bio: "This is your bio.",
  avatarUrl: "",
};

export async function GET() {
  return NextResponse.json(profileData);
}

export async function PUT(request: Request) {
  const body = await request.json();

  profileData = {
    ...profileData,
    name: body.name ?? profileData.name,
    bio: body.bio ?? profileData.bio,
    avatarUrl: body.avatarUrl ?? profileData.avatarUrl,
  };

  return NextResponse.json({ success: true, profile: profileData });
}
