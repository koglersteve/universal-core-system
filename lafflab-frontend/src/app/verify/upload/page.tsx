import React from "react";
import VerifyScreen, {
  VerifyScreenContext,
} from "@/components/verify/VerifyScreen";
import { getUserIdentity } from "@/lib/server/user";

function normalizeStatus(s: string): VerifyScreenContext["status"] {
  if (s === "pending" || s === "unverified" || s === "verified") return s;
  return "unverified";
}

export default async function VerifyPage() {
  try {
    const user = await getUserIdentity();

    const context: VerifyScreenContext = {
      userId: user.id,
      status: normalizeStatus(user.status),
    };

    return (
      <div className="p-4">
        <VerifyScreen context={context} />
      </div>
    );
  } catch {
    return (
      <div className="p-4">
        <div className="text-red-500 font-semibold">
          Unable to load verification screen.
        </div>
      </div>
    );
  }
}
