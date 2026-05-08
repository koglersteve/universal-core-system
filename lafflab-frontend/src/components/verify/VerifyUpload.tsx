import React from "react";

export type VerifyUploadContext = {
  userId: string;
  allowedTypes: string[];
  maxSizeMB: number;
};

export type VerifyUploadProps = {
  context?: VerifyUploadContext;
};

export default function VerifyUpload({ context }: VerifyUploadProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Upload Verification Documents</h1>

      {context && (
        <div className="text-sm text-gray-600">
          <p>User: {context.userId}</p>
          <p>Allowed Types: {context.allowedTypes.join(", ")}</p>
          <p>Max Size: {context.maxSizeMB} MB</p>
        </div>
      )}
    </div>
  );
}
