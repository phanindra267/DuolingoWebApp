"use client";



import { AppShell, PageHeader } from "@/components/duo/AppShell";
import { LEADERBOARD } from "@/lib/duo/data";
import { useDuo } from "@/lib/duo/store";
import { cn } from "@/lib/utils";



const LEAGUES = ["🥉 Bronze", "🥈 Silver", "🥇 Gold", "💎 Sapphire", "🔮 Ruby"];

function LeaderboardPage() {
  const { state } = useDuo();
  const rows = [...LEADERBOARD, { name: `${state.name} (you)`, xp: state.xp, avatar: "🦉" }].sort(
    (a, b) => b.xp - a.xp,
  );

  return (
    <AppShell>
      <PageHeader title="Bronze League" emoji="🏆" subtitle="Top 5 advance to the Silver League" />

      <div className="mb-6 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {LEAGUES.map((l, i) => (
          <div
            key={l}
            className={cn(
              "shrink-0 rounded-2xl border-2 px-4 py-2 text-sm font-extrabold",
              i === 0 ? "border-duo-gold bg-duo-gold/15" : "border-border opacity-50",
            )}
          >
            {l}
          </div>
        ))}
      </div>

      <ul className="rounded-3xl border-2 border-border">
        {rows.map((r, i) => {
          const you = r.name.includes("(you)");
          return (
            <li
              key={r.name}
              className={cn(
                "flex items-center gap-4 border-b-2 border-border px-4 py-3 last:border-0",
                you && "rounded-2xl bg-accent text-accent-foreground",
                i < 5 && "font-extrabold",
              )}
            >
              <span className={cn("w-8 text-center text-lg", i < 3 ? "text-duo-gold" : "text-muted-foreground")}>
                {i + 1}
              </span>
              <span className="text-3xl">{r.avatar}</span>
              <span className="flex-1 truncate">{r.name}</span>
              <span className="text-duo-blue">{r.xp} XP</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">
        Promotion zone: top 5 · Demotion zone: bottom 5. Rankings reset every Monday.
      </p>
    </AppShell>
  );
}

export default LeaderboardPage;
