export async function getProfile(id: string) {
  const res = await fetch(`/api/profile?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export async function updateProfile(id: string, values: any) {
  const res = await fetch(`/api/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...values }),
  });

  if (!res.ok) return null;

  return res.json();
}
