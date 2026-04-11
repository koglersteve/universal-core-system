"use client";

type CrossAppLauncherProps = {
  sourceApp?: string;
  payload?: any;
};

export function CrossAppLauncher({ sourceApp, payload }: CrossAppLauncherProps) {
  function handleLaunch() {
    console.log("Cross‑app launch triggered:", { sourceApp, payload });
    // TODO: integrate with your real cross‑app router
  }

  return (
    <div>
      <button
        onClick={handleLaunch}
        style={{
          padding: "10px 16px",
          background: "#333",
          color: "#fff",
          borderRadius: "6px"
        }}
      >
        Launch Cross‑App
      </button>
    </div>
  );
}

export default CrossAppLauncher;
