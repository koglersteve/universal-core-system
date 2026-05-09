"use client";

type UploadScreenProps = {
  session?: any;
};

export default function UploadScreen({ session }: UploadScreenProps) {
  return (
    <div className="p-4 text-white space-y-3">
      <h1 className="text-2xl font-semibold">Upload</h1>

      {session ? (
        <pre className="text-sm text-white/60 whitespace-pre-wrap">
          {JSON.stringify(session, null, 2)}
        </pre>
      ) : (
        <p className="text-white/60">No upload session initialized.</p>
      )}
    </div>
  );
}
