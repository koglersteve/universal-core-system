"use client";

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
    <div className="space-y-4 text-white">
      <h1 className="text-2xl font-bold">Upload Verification Documents</h1>

      {context && (
        <div className="text-sm text-white/60 space-y-1">
          <p><span className="font-semibold">User:</span> {context.userId}</p>
          <p>
            <span className="font-semibold">Allowed Types:</span>{" "}
            {context.allowedTypes.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Max Size:</span>{" "}
            {context.maxSizeMB} MB
          </p>
        </div>
      )}
    </div>
  );
}
