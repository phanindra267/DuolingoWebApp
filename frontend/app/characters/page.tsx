"use client";

import { useState } from "react";

import { AppShell, PageHeader } from "@/components/duo/AppShell";
import { Btn } from "@/components/duo/Btn";
import { Mascot, type MascotState } from "@/components/duo/Mascot";
import { CHARACTERS } from "@/lib/duo/data";
import { cn } from "@/lib/utils";



const RING: Record<string, string> = {
  primary: "border-primary",
  "duo-blue": "border-duo-blue",
  "duo-gold": "border-duo-gold",
  "duo-purple": "border-duo-purple",
  "duo-red": "border-duo-red",
  "duo-teal": "border-duo-teal",
  "duo-orange": "border-duo-orange",
};

const STATES: MascotState[] = ["idle", "thinking", "selected", "correct", "wrong", "celebrate", "sad"];

function CharactersPage() {
  const [preview, setPreview] = useState<MascotState>("idle");

  return (
    <AppShell>
      <PageHeader title="Characters" emoji="✨" subtitle="Your cast of animated study buddies" />

      <section className="mb-8 rounded-3xl border-2 border-border p-6">
        <h2 className="mb-4 text-xl font-extrabold">Reaction playground</h2>
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <Mascot state={preview} size={170} />
          <div className="flex flex-wrap gap-2">
            {STATES.map((s) => (
              <Btn
                key={s}
                tone={preview === s ? "primary" : "ghost"}
                className="text-xs"
                onClick={() => setPreview(s)}
              >
                {s}
              </Btn>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CHARACTERS.map((c) => (
          <article
            key={c.name}
            className={cn(
              "rounded-3xl border-2 p-5 text-center transition-transform hover:-translate-y-1",
              RING[c.color],
            )}
          >
            <div className="anim-bob text-6xl">{c.emoji}</div>
            <h3 className="mt-3 font-display text-2xl font-extrabold">{c.name}</h3>
            <p className="text-sm font-extrabold uppercase text-muted-foreground">{c.role}</p>
            <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}

export default CharactersPage;
