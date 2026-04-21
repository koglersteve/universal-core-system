import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  return redirect(`/dramanextdoor/start?token=${token ?? ""}`);
}
