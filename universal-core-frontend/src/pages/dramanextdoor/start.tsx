"use client";

import { useRouter } from "next/router";
import { useMood } from "@/hooks/useMood";
import { useEmotionalIdentity } from "@/hooks/useEmotionalIdentity";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";
import { useEmotionalMultiverse } from "@/hooks/useEmotionalMultiverse";
import { useCrossApp } from "@/hooks/useCrossApp";

export default function DramaNextDoorStart() {
  const router = useRouter();
  const token = router.query.token;

  // Core Emotional OS hooks
  const mood = useMood();
  const identity = useEmotionalIdentity();
  const physics = useEmotionalPhysics();
  const multiverse = useEmotionalMultiverse();
  const crossApp = useCrossApp();

  // Derived “maximum mode” signals
  const moodValue = mood?.value ?? 50;
  const identityState = identity?.state ?? "stable";
  const tension = physics?.tension ?? 0;
  const worldName = multiverse?.currentWorld?.name ?? "default";

  function routeToLafflab(reason: string) {
    crossApp.route("lafflab", {
      from: "dramanextdoor",
      reason,
      mood: moodValue,
      identityState,
      tension,
      worldName,
    });
  }

  function routeToMoodCheck(reason: string) {
    crossApp.route("moodcheck", {
      from: "dramanextdoor",
      reason,
      mood: moodValue,
      identityState,
      tension,
      worldName,
    });
  }

  function routeToHoaMeme(reason: string) {
    crossApp.route("hoa-meme", {
      from: "dramanextdoor",
      reason,
      mood: moodValue,
      identityState,
      tension,
      worldName,
    });
  }

  function routeToIdlyily(reason: string) {
    crossApp.route("idlyily", {
      from: "dramanextdoor",
      reason,
      mood: moodValue,
      identityState,
      tension,
      worldName,
    });
  }

  // Example “maximum OS” emotional routing helpers
  function handleChaosSpike() {
    if (tension > 0.7) {
      routeToHoaMeme("high_tension_in_neighborhood");
    } else {
      routeToLafflab("light_defuse_before_full_chaos");
    }
  }

  function handleIdentityBreak() {
    routeToMoodCheck("identity_break_detected");
  }

  function handleRomanticSpillover() {
    routeToIdlyily("romantic_thread_detected_in_drama");
  }

  return (
    <div style={{ padding: "2rem", color: "#fff", background: "#050509", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>DramaNextDoor</h1>
      <p style={{ opacity: 0.8, marginBottom: "1rem" }}>
        Token: <span style={{ fontFamily: "monospace" }}>{String(token ?? "")}</span>
      </p>

      <p style={{ marginBottom: "1.5rem" }}>
        DramaNextDoor is now running in <strong>Pages Router</strong> mode and fully wired into the
        Emotional OS.
      </p>

      <section style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Emotional Engine Status</h3>
        <pre
          style={{
            background: "#111",
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "0.85rem",
            overflowX: "auto",
          }}
        >
{JSON.stringify(
  {
    mood: moodValue,
    identityState,
    tension,
    worldName,
  },
  null,
  2
)}
        </pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Emotional Routes Out of DramaNextDoor</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <button
            onClick={() => routeToLafflab("manual_escape_to_comedy")}
            style={buttonStyle}
          >
            Send to LAFFlab (Comedy Relief)
          </button>

          <button
            onClick={() => routeToMoodCheck("manual_check_in")}
            style={buttonStyle}
          >
            Send to MoodCheck (Emotional Scan)
          </button>

          <button
            onClick={() => routeToHoaMeme("manual_neighborhood_escalation")}
            style={buttonStyle}
          >
            Send to HOA Meme (Neighborhood Chaos)
          </button>

          <button
            onClick={() => routeToIdlyily("manual_romantic_branch")}
            style={buttonStyle}
          >
            Send to IDLYILY (Romantic Thread)
          </button>
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: "0.5rem" }}>Maximum OS Triggers</h3>
        <p style={{ fontSize: "0.9rem", opacity: 0.85, marginBottom: "0.75rem" }}>
          These simulate DramaNextDoor reacting to emotional physics, identity, and world state.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <button onClick={handleChaosSpike} style={buttonStyle}>
            Chaos Spike (tension-based routing)
          </button>
          <button onClick={handleIdentityBreak} style={buttonStyle}>
            Identity Break (route to MoodCheck)
          </button>
          <button onClick={handleRomanticSpillover} style={buttonStyle}>
            Romantic Spillover (route to IDLYILY)
          </button>
        </div>
      </section>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "0.6rem 0.9rem",
  background: "#1b1b22",
  borderRadius: "999px",
  border: "1px solid #333",
  color: "#fff",
  fontSize: "0.85rem",
  cursor: "pointer",
  whiteSpace: "nowrap",
};
