"use client";



import { AppShell, PageHeader, QuestRow } from "@/components/duo/AppShell";
import { Mascot } from "@/components/duo/Mascot";
import { useDuo } from "@/lib/duo/store";
import { cn } from "@/lib/utils";



function QuestsPage() {
  const { state } = useDuo();
  const q = state.quests;
  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <AppShell>
      <PageHeader title="Quests" emoji="📜" subtitle="Small goals, big streaks" />

      <section className="mb-8 flex items-center gap-4 rounded-3xl border-2 border-duo-orange bg-duo-orange/10 p-5">
        <span className="text-5xl">🔥</span>
        <div className="flex-1">
          <h2 className="font-display text-2xl font-extrabold text-duo-orange">
            {state.streak} day streak
          </h2>
          <p className="text-sm text-muted-foreground">
            Practise today to keep the flame alive.
          </p>
          <div className="mt-3 flex gap-2">
            {days.map((d, i) => (
              <span
                key={d}
                className={cn(
                  "flex size-9 items-center justify-center rounded-full text-xs font-extrabold",
                  i < state.streak
                    ? "bg-duo-orange text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
        <Mascot state="celebrate" size={100} className="hidden sm:block" />
      </section>

      <section className="mb-8 rounded-3xl border-2 border-border p-5">
        <h2 className="mb-2 text-xl font-extrabold">Daily quests</h2>
        <QuestRow emoji="⚡" label="Earn 30 XP" value={q["xp"] ?? 0} goal={30} />
        <QuestRow emoji="📘" label="Complete 3 lessons" value={q["lessons"] ?? 0} goal={3} />
        <QuestRow emoji="💎" label="Collect 30 gems" value={q["gems"] ?? 0} goal={30} />
        <QuestRow emoji="🎯" label="Answer 20 questions" value={state.answers} goal={20} />
      </section>

      <section className="rounded-3xl border-2 border-duo-purple p-5">
        <h2 className="mb-2 text-xl font-extrabold text-duo-purple">Monthly challenge</h2>
        <QuestRow emoji="🏅" label="Earn 1000 XP this month" value={state.xp} goal={1000} />
        <QuestRow emoji="🔥" label="Reach a 14 day streak" value={state.streak} goal={14} />
      </section>
    </AppShell>
  );
}

export default QuestsPage;
