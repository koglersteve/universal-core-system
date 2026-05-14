import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: Request) {
  const fileName = crypto.randomUUID() + ".jpg";

  const url = new URL(`${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET}/${fileName}`);

  const expires = Math.floor(Date.now() / 1000) + 60; // 1 minute
  const stringToSign = `put\n\n\n${expires}\n/${process.env.R2_BUCKET}/${fileName}`;

  const signature = crypto
    .createHmac("sha1", process.env.R2_SECRET_ACCESS_KEY!)
    .update(stringToSign)
    .digest("base64");

  const signedUrl = `${url}?AWSAccessKeyId=${process.env.R2_ACCESS_KEY_ID}&Expires=${expires}&Signature=${encodeURIComponent(signature)}`;

  return NextResponse.json({
    uploadUrl: signedUrl,
    fileUrl: `${process.env.R2_PUBLIC_URL}/${fileName}`,
  });
}
