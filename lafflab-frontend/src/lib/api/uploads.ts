import { get } from "./httpclient";

export type UploadUrlResponse = {
  uploadUrl: string;
  fileUrl: string;
};

export async function getUploadUrl() {
  return get<UploadUrlResponse>("/core/post/upload-url");
}

export async function uploadFileToR2(uploadUrl: string, file: File) {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
  });

  if (!res.ok) {
    throw new Error(`R2 upload failed: ${res.status}`);
  }

  return true;
}
