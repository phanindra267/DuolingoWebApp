"use client";



import { AppShell, PageHeader } from "@/components/duo/AppShell";
import { Btn } from "@/components/duo/Btn";
import { useDuo } from "@/lib/duo/store";
import { cn } from "@/lib/utils";



function Toggle({
  label,
  desc,
  value,
  onChange,
}: {
  label: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-4 border-b-2 border-border py-4 last:border-0">
      <div className="flex-1">
        <p className="font-extrabold">{label}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <button
        role="switch"
        aria-checked={value}
        aria-label={label}
        onClick={() => onChange(!value)}
        className={cn(
          "h-8 w-14 rounded-full p-1 transition-colors",
          value ? "bg-primary" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "block size-6 rounded-full bg-card transition-transform",
            value && "translate-x-6",
          )}
        />
      </button>
    </div>
  );
}

function SettingsPage() {
  const { state, set, reset } = useDuo();
  const goals = [20, 50, 100, 200];

  return (
    <AppShell>
      <PageHeader title="Settings" emoji="⚙️" subtitle="Everything is stored in your browser" />

      <section className="mb-8 rounded-3xl border-2 border-border p-5">
        <h2 className="mb-2 text-xl font-extrabold">Preferences</h2>
        <Toggle
          label="Sound effects"
          desc="Speak words and sentences out loud"
          value={state.sound}
          onChange={(v) => set({ sound: v })}
        />
        <Toggle
          label="Animations"
          desc="Character reactions and celebrations"
          value={state.motion}
          onChange={(v) => set({ motion: v })}
        />
        <Toggle
          label="Listening exercises"
          desc="Include audio questions in lessons"
          value={state.listening}
          onChange={(v) => set({ listening: v })}
        />
        <Toggle
          label="Dark mode"
          desc="Easier on the eyes at night"
          value={state.dark}
          onChange={(v) => set({ dark: v })}
        />
      </section>

      <section className="mb-8 rounded-3xl border-2 border-border p-5">
        <h2 className="mb-3 text-xl font-extrabold">Daily XP goal</h2>
        <div className="flex flex-wrap gap-3">
          {goals.map((g) => (
            <Btn
              key={g}
              tone={state.dailyGoal === g ? "primary" : "ghost"}
              onClick={() => set({ dailyGoal: g })}
            >
              {g} XP
            </Btn>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border-2 border-duo-red p-5">
        <h2 className="mb-2 text-xl font-extrabold text-duo-red">Danger zone</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Reset every lesson, chest, XP and gem back to the starting state.
        </p>
        <Btn tone="red" onClick={reset}>
          Reset all progress
        </Btn>
      </section>
    </AppShell>
  );
}

export default SettingsPage;
