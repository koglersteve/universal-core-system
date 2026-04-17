import { os } from "@/lib/backend";
import OSDashboard from "@/components/OSDashboard";

export default async function OSPage() {
  let data = { message: "OS offline", modules: [] };

  try {
    const res = await os("");
    data = {
      message: res.message ?? "OS online",
      canonical: res.canonical,
      version: res.version,
      activeUniverse: res.activeUniverse,
      modules: res.modules ?? [],
    };
  } catch (e) {
    console.error("OS fetch failed:", e);
  }

  const modules = (data.modules || []).map((m: any) =>
    typeof m === "string" ? m : m.name ?? "unknown"
  );

  return (
    <div className="p-8">
      <OSDashboard
        message={data.message}
        canonical={data.canonical}
        version={data.version}
        activeUniverse={data.activeUniverse}
        modules={modules}
      />
    </div>
  );
}

