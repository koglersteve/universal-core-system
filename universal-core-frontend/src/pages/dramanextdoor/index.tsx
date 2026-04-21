import { useEffect } from "react";
import { useRouter } from "next/router";

export default function DramaNextDoorIndex() {
  const router = useRouter();

  useEffect(() => {
    const token = router.query.token || "";
    router.replace(`/dramanextdoor/start?token=${token}`);
  }, [router]);

  return null;
}
