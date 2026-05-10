import { execSync } from "child_process";

console.log("Running Prisma migrate deploy…");

try {
  execSync("npx prisma migrate deploy", { stdio: "inherit" });
  console.log("Migrations applied successfully.");
} catch (err) {
  console.error("Migration failed:", err);
  process.exit(1);
}
