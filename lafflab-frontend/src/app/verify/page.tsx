import React from "react";
import { getUserIdentity } from "@/lib/server/user";
import VerifyScreen, {
  VerifyScreenContext,
} from "@/components/verify/VerifyScreen";

type AllowedStatus = "pending" | "unverified" | "verified";

function normalizeStatus(s: string): AllowedStatus {
  if (s === "pending" || s === "unverified" || s === "verified") return s;
  return "unverified";
}

export default async function HomePage() {
  const user = await getUserIdentity();

  const context: VerifyScreenContext = {
    userId: user.id,
    status: normalizeStatus(user.status),
  };

  return (
    <main className="p-4">
      <VerifyScreen context={context} />
    </main>
  );
}
