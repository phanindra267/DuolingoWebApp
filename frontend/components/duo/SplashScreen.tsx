"use client";

import { useEffect, useState } from "react";

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    // Pop-in → hold → fade-out
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("out"), 2000);
    const t3 = setTimeout(() => onDone(), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "oklch(0.75 0.22 133)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.5s ease",
        opacity: phase === "out" ? 0 : 1,
        pointerEvents: phase === "out" ? "none" : "auto",
      }}
    >
      {/* Glow ring */}
      <div
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.18)",
          animation: "splash-ring 1.4s ease-in-out infinite",
        }}
      />
      {/* Owl emoji mascot */}
      <div
        style={{
          fontSize: 100,
          lineHeight: 1,
          animation:
            phase === "in"
              ? "splash-pop 0.6s cubic-bezier(0.3,1.4,0.5,1) both"
              : "splash-breathe 3s ease-in-out infinite",
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.18))",
        }}
      >
        🦉
      </div>

      {/* App name */}
      <div
        style={{
          marginTop: 20,
          fontFamily: "Nunito, sans-serif",
          fontSize: 36,
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.5px",
          opacity: phase === "in" ? 0 : 1,
          transform: phase === "in" ? "translateY(10px)" : "translateY(0)",
          transition: "opacity 0.4s 0.2s ease, transform 0.4s 0.2s ease",
        }}
      >
        duolingo
      </div>

      {/* Dots loader */}
      <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.8)",
              animation: `splash-dot 1s ${i * 0.15}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes splash-pop {
          0% { transform: scale(0.4) rotate(-10deg); opacity: 0; }
          70% { transform: scale(1.12) rotate(4deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes splash-breathe {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.04); }
        }
        @keyframes splash-ring {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0.2; }
        }
        @keyframes splash-dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
