type AllowedStatus = "pending" | "unverified" | "verified";

function normalizeStatus(s: string): AllowedStatus {
  if (s === "pending" || s === "unverified" || s === "verified") return s;
  return "unverified";
}

const context = {
  userId: user.id,
  status: normalizeStatus(user.status),
};
