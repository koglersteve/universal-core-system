"use client";

export type VerifyScreenContext = {
  userId: string;
  status: "unverified" | "pending" | "verified";
};

export type VerifyScreenProps = {
  context?: VerifyScreenContext;
};

export default function VerifyScreen({ context }: VerifyScreenProps) {
  return (
    <div className="space-y-4 text-white">
      <h1 className="text-2xl font-bold">Verify Your Identity</h1>

      {context && (
        <div className="text-sm text-white/60 space-y-1">
          <p><span className="font-semibold">User:</span> {context.userId}</p>
          <p><span className="font-semibold">Status:</span> {context.status}</p>
        </div>
      )}
    </div>
  );
}
