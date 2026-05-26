export const dynamic = "force-dynamic";

export default async function Page() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backend}/core/lafflab/settings`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <pre>{JSON.stringify(data.settings, null, 2)}</pre>
  );
}
