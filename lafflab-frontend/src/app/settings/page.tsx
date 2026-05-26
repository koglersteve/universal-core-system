export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/core/lafflab/settings`);
  const data = await res.json();

  return (
    <pre>{JSON.stringify(data.settings, null, 2)}</pre>
  );
}
