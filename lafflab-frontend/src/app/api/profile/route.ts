import { NextResponse } from "next/server";

// Temporary in-memory profile store
let profileData = {
  name: "New User",
  bio: "This is your bio.",
  avatarUrl: "",
};

// GET /api/profile
export async function GET() {
  return NextResponse.json(profileData);
}

// PUT /api/profile
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    profileData = {
      ...profileData,
      name: body.name ?? profileData.name,
      bio: body.bio ?? profileData.bio,
      avatarUrl: body.avatarUrl ?? profileData.avatarUrl,
    };

    return NextResponse.json({ success: true, profile: profileData });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
