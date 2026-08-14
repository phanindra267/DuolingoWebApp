import { useState } from "react";
import { cn } from "@/lib/utils";

export type MascotState =
  | "idle"
  | "thinking"
  | "selected"
  | "correct"
  | "wrong"
  | "celebrate"
  | "sad";

const BODY_ANIM: Record<MascotState, string> = {
  idle: "anim-breathe",
  thinking: "anim-lean",
  selected: "anim-bob",
  correct: "anim-jump",
  wrong: "anim-shake",
  celebrate: "anim-dance",
  sad: "anim-bob",
};

export function Mascot({
  state = "idle",
  size = 150,
  className,
}: {
  state?: MascotState;
  size?: number;
  className?: string;
}) {
  const [interacted, setInteracted] = useState(false);

  const happy = state === "correct" || state === "celebrate";
  const upset = state === "wrong" || state === "sad";
  const eyeScale = happy ? 1.12 : upset ? 0.78 : 1;

  return (
    <div 
      className={cn("select-none transition-transform duration-500 ease-in-out cursor-pointer", interacted && "rotate-[360deg] scale-110", className)} 
      style={{ width: size }} 
      aria-hidden="true"
      onMouseEnter={() => setInteracted(true)}
      onMouseLeave={() => setInteracted(false)}
      onClick={() => {
        setInteracted(false);
        setTimeout(() => setInteracted(true), 50);
      }}
    >
      <svg viewBox="0 0 200 210" className={cn("h-auto w-full", BODY_ANIM[state])}>
        {/* feet */}
        <g fill="var(--duo-gold)">
          <path d="M74 186h20l-4 14H78z" />
          <path d="M106 186h20l-4 14h-12z" />
          <ellipse cx="82" cy="201" rx="16" ry="6" />
          <ellipse cx="118" cy="201" rx="16" ry="6" />
        </g>

        {/* tail */}
        <path d="M100 170 L84 196 L116 196 Z" fill="var(--primary-dark)" />

        {/* body */}
        <ellipse cx="100" cy="112" rx="72" ry="76" fill="var(--primary)" />
        <ellipse cx="100" cy="128" rx="48" ry="52" fill="var(--primary-foreground)" opacity="0.92" />

        {/* wings */}
        <g
          className={
            state === "celebrate" ? "anim-wave" : state === "correct" ? "anim-clap" : undefined
          }
          style={{ transformOrigin: "34px 110px" }}
        >
          <ellipse cx="32" cy="118" rx="16" ry="34" fill="var(--primary-dark)" />
        </g>
        <g
          className={
            state === "celebrate" ? "anim-wave" : state === "correct" ? "anim-clap" : undefined
          }
          style={{ transformOrigin: "166px 110px" }}
        >
          <ellipse cx="168" cy="118" rx="16" ry="34" fill="var(--primary-dark)" />
        </g>

        {/* head crest */}
        <path d="M62 52 q18 -32 38 -14 q20 -18 38 14 z" fill="var(--primary-dark)" />

        {/* eye area */}
        <g className={state === "thinking" ? "anim-look" : undefined}>
          <circle cx="74" cy="78" r="30" fill="var(--primary-foreground)" />
          <circle cx="126" cy="78" r="30" fill="var(--primary-foreground)" />
          <g className="anim-blink" style={{ transformOrigin: "100px 78px" }}>
            <circle cx="74" cy="78" r={13 * eyeScale} fill="var(--foreground)" />
            <circle cx="126" cy="78" r={13 * eyeScale} fill="var(--foreground)" />
            <circle cx={78} cy={73} r={4} fill="var(--primary-foreground)" />
            <circle cx={130} cy={73} r={4} fill="var(--primary-foreground)" />
          </g>
          {/* brows */}
          {upset ? (
            <>
              <path d="M56 54 L92 62" stroke="var(--primary-dark)" strokeWidth="7" strokeLinecap="round" />
              <path d="M144 54 L108 62" stroke="var(--primary-dark)" strokeWidth="7" strokeLinecap="round" />
            </>
          ) : happy ? (
            <>
              <path d="M56 52 q18 -12 36 -2" stroke="var(--primary-dark)" strokeWidth="7" strokeLinecap="round" fill="none" />
              <path d="M144 52 q-18 -12 -36 -2" stroke="var(--primary-dark)" strokeWidth="7" strokeLinecap="round" fill="none" />
            </>
          ) : null}
        </g>

        {/* beak */}
        {happy ? (
          <path d="M84 104 q16 22 32 0 q-16 10 -32 0z" fill="var(--duo-gold-dark)" />
        ) : upset ? (
          <path d="M86 100 q14 -12 28 0 q-14 16 -28 0z" fill="var(--duo-gold)" />
        ) : (
          <path d="M86 100 q14 20 28 0 q-14 -6 -28 0z" fill="var(--duo-gold)" />
        )}

        {/* blush */}
        {happy && (
          <>
            <ellipse cx="56" cy="102" rx="10" ry="6" fill="var(--duo-red)" opacity="0.35" />
            <ellipse cx="144" cy="102" rx="10" ry="6" fill="var(--duo-red)" opacity="0.35" />
          </>
        )}

        {/* sweat drop when wrong */}
        {upset && <ellipse cx="150" cy="52" rx="6" ry="9" fill="var(--duo-blue)" opacity="0.8" />}
      </svg>
    </div>
  );
}

export function Confetti({ count = 40 }: { count?: number }) {
  const colors = [
    "var(--primary)",
    "var(--duo-gold)",
    "var(--duo-blue)",
    "var(--duo-purple)",
    "var(--duo-red)",
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute top-0 block h-3 w-2 rounded-[2px]"
          style={{
            left: `${(i * 97) % 100}%`,
            background: colors[i % colors.length],
            animation: `duo-confetti-fall ${1.4 + ((i * 13) % 10) / 10}s ease-in ${(i % 12) * 0.1}s forwards`,
          }}
        />
      ))}
    </div>
  );
}
