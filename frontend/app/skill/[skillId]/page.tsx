"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { UNITS, findNode } from "@/lib/duo/data";
import { AppShell, PageHeader } from "@/components/duo/AppShell";
import { Btn } from "@/components/duo/Btn";
import { useDuo } from "@/lib/duo/store";
import { cn } from "@/lib/utils";
import { Lock, Check, Star, Gift, Crown } from "lucide-react";

export default function SkillPage({ params }: { params: Promise<{ skillId: string }> }) {
  const { skillId } = use(params);
  const router = useRouter();
  const { statusOf } = useDuo();

  const unit = UNITS.find((u) => u.id === skillId) ?? UNITS.find((u) => String(u.number) === String(skillId));

  useEffect(() => {
    if (!unit) {
      const node = findNode(skillId as string);
      if (node) {
        router.replace(`/lesson/${skillId}`);
      }
    }
  }, [unit, skillId, router]);

  if (!unit) {
    return (
      <AppShell>
        <PageHeader title="Unit not found" emoji="❓" />
        <Btn onClick={() => void router.push("/")}>Back to path</Btn>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        title={`Unit ${unit.number}: ${unit.title}`}
        emoji={unit.icon}
        subtitle={unit.description}
      />

      <section className="mb-8 rounded-3xl border-2 border-border p-6">
        <h2 className="mb-2 text-xl font-extrabold">Guidebook</h2>
        <p className="text-muted-foreground">{unit.guidebook}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {unit.vocab.map((v) => (
            <div
              key={v.es}
              className="flex items-center justify-between rounded-2xl border-2 border-border bg-card px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{v.emoji}</span>
                <span className="font-extrabold">{v.es}</span>
              </div>
              <span className="text-muted-foreground">{v.en}</span>
            </div>
          ))}
        </div>
      </section>

      <h2 className="mb-4 text-xl font-extrabold">Path</h2>
      <div className="flex flex-col items-center gap-5 pb-24">
        {unit.nodes.map((node) => {
          const status = statusOf(node.id);
          const isChest = node.kind === "chest";
          const isTrophy = node.kind === "trophy";

          const base =
            status === "locked"
              ? "bg-locked text-muted-foreground shadow-[0_7px_0_0_var(--locked-dark)]"
              : isChest
                ? "bg-duo-gold text-foreground shadow-[0_7px_0_0_var(--duo-gold-dark)]"
                : isTrophy
                  ? "bg-duo-purple text-primary-foreground shadow-[0_7px_0_0_var(--duo-purple-dark)]"
                  : status === "completed"
                    ? "bg-duo-gold text-foreground shadow-[0_7px_0_0_var(--duo-gold-dark)]"
                    : "bg-primary text-primary-foreground shadow-[0_7px_0_0_var(--primary-dark)]";

          const offset = [0, 50, 85, 50, 0, -50, -85, -50];
          return (
            <div
              key={node.id}
              className="relative flex flex-col items-center"
              style={{ transform: `translateX(${offset[node.index % offset.length]}px)` }}
            >
              {status === "active" && (
                <div className="anim-bob mb-1 rounded-xl border-2 border-border bg-card px-3 py-1 text-xs font-extrabold uppercase text-primary">
                  Start
                </div>
              )}
              <button
                onClick={() => {
                  if (status === "locked") return;
                  if (isChest || isTrophy) return;
                  void router.push(`/lesson/${node.id}`);
                }}
                disabled={status === "locked" || isChest || isTrophy}
                className={cn(
                  "group flex size-[72px] items-center justify-center rounded-full transition-transform",
                  base,
                  status === "locked"
                    ? "cursor-not-allowed"
                    : "hover:scale-110 active:translate-y-[4px] active:shadow-none",
                  status === "active" && "ring-4 ring-primary/30",
                  isChest && status === "active" && "anim-chest-shake",
                )}
              >
                {status === "locked" && node.kind !== "chest" ? (
                  <Lock className="size-8" />
                ) : node.kind === "chest" ? (
                  <Gift className="size-9" />
                ) : node.kind === "trophy" ? (
                  <Crown className="size-9" />
                ) : status === "completed" ? (
                  <Check className="size-9" />
                ) : (
                  <Star className="size-9" />
                )}
              </button>
              <div className="mt-1 flex flex-col items-center">
                <span className="max-w-[120px] truncate text-center text-xs font-extrabold text-muted-foreground">
                  {node.title}
                </span>
                <span className="text-[10px] uppercase text-muted-foreground">+{node.xp} XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
