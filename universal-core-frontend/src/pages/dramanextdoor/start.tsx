import { useRouter } from "next/router";

export default function DramaNextDoorStart() {
  const router = useRouter();
  const token = router.query.token;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>DramaNextDoor</h1>
      <p>Token: {token}</p>

      {/* Replace this with your real UI */}
      <p>DramaNextDoor is now running in Pages Router mode.</p>
    </div>
  );
}
