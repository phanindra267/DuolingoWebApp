"use client";



import { AppShell, PageHeader, StatCard } from "@/components/duo/AppShell";
import { Mascot } from "@/components/duo/Mascot";
import { ACHIEVEMENTS, UNITS } from "@/lib/duo/data";
import { useDuo } from "@/lib/duo/store";
import { cn } from "@/lib/utils";



function ProfilePage() {
  const { state, unitProgress } = useDuo();
  const lessons = state.completed.length;
  const chests = state.completed.filter((id) => id.includes("-n")).length;
  const unitsDone = UNITS.filter((u) => {
    const p = unitProgress(u.id);
    return p.total > 0 && p.done === p.total;
  }).length;
  const accuracy = state.answers ? Math.round((state.correctAnswers / state.answers) * 100) : 0;

  const metricValue = (metric: string) =>
    ({
      streak: state.streak,
      xp: state.xp,
      lessons,
      units: unitsDone,
      chests,
      answers: state.answers,
    })[metric] ?? 0;

  return (
    <AppShell>
      <PageHeader title="Profile" emoji="🧑‍🎓" />

      <section className="mb-8 flex flex-col items-center gap-5 rounded-3xl border-2 border-border p-6 sm:flex-row">
        <Mascot state="idle" size={140} />
        <div className="text-center sm:text-left">
          <h2 className="font-display text-3xl font-extrabold">{state.name}</h2>
          <p className="text-muted-foreground">Learning 🇪🇸 Spanish · Joined this semester</p>
          <p className="mt-2 text-sm font-extrabold text-primary">
            {unitsDone} of {UNITS.length} units completed
          </p>
        </div>
      </section>

      <h2 className="mb-3 text-xl font-extrabold">Statistics</h2>
      <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon="🔥" value={state.streak} label="Day streak" />
        <StatCard icon="⚡" value={state.xp} label="Total XP" />
        <StatCard icon="🎯" value={`${accuracy}%`} label="Accuracy" />
        <StatCard icon="📘" value={lessons} label="Lessons done" />
        <StatCard icon="💎" value={state.gems} label="Gems" />
        <StatCard icon="❤️" value={state.hearts} label="Hearts" />
        <StatCard icon="✅" value={state.correctAnswers} label="Correct answers" />
        <StatCard icon="🏅" value={`${state.dailyXp}/${state.dailyGoal}`} label="Daily goal" />
      </div>

      <h2 className="mb-3 text-xl font-extrabold">Achievements</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {ACHIEVEMENTS.map((a) => {
          const value = metricValue(a.metric);
          const pct = Math.min(100, Math.round((value / a.goal) * 100));
          const done = value >= a.goal;
          return (
            <article
              key={a.id}
              className={cn(
                "flex items-center gap-4 rounded-2xl border-2 p-4",
                done ? "border-duo-gold bg-duo-gold/10" : "border-border",
              )}
            >
              <span className="text-4xl">{a.emoji}</span>
              <div className="flex-1">
                <h3 className="font-extrabold">{a.name}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full", done ? "bg-duo-gold" : "bg-primary")}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-extrabold text-muted-foreground">
                {Math.min(value, a.goal)}/{a.goal}
              </span>
            </article>
          );
        })}
      </div>
    </AppShell>
  );
}

export default ProfilePage;
