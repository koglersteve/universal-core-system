export default async function Page() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/core/lafflab/favorites?userId=USER_ID_HERE`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <pre>{JSON.stringify(data.favorites, null, 2)}</pre>
  );
}
