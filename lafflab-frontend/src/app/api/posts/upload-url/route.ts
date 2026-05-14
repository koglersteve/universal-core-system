export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const bucket = process.env.R2_BUCKET!;
  const endpoint = process.env.R2_ENDPOINT!;
  const accessKey = process.env.R2_ACCESS_KEY_ID!;
  const secretKey = process.env.R2_SECRET_ACCESS_KEY!;
  const publicUrl = process.env.R2_PUBLIC_URL!;

  const fileName = crypto.randomUUID() + ".jpg";

  const expires = Math.floor(Date.now() / 1000) + 60;
  const stringToSign = `put\n\n\n${expires}\n/${bucket}/${fileName}`;

  const signature = crypto
    .createHmac("sha1", secretKey)
    .update(stringToSign)
    .digest("base64");

  const uploadUrl = `${endpoint}/${bucket}/${fileName}?AWSAccessKeyId=${accessKey}&Expires=${expires}&Signature=${encodeURIComponent(
    signature
  )}`;

  return NextResponse.json({
    uploadUrl,
    fileUrl: `${publicUrl}/${fileName}`,
  });
}
