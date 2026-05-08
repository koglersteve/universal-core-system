import React from "react";

export type VerifyScreenContext = {
  userId: string;
  status: "unverified" | "pending" | "verified";
};

export type VerifyScreenProps = {
  context?: VerifyScreenContext;
};

export default function VerifyScreen({ context }: VerifyScreenProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Verify Your Identity</h1>

      {context && (
        <div className="text-sm text-gray-600">
          <p>User: {context.userId}</p>
          <p>Status: {context.status}</p>
        </div>
      )}
    </div>
  );
}
