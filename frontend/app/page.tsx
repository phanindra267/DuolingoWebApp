"use client";

import { useRouter } from "next/navigation";
import { Check, Crown, Gift, Lock, Star, Zap } from "lucide-react";
import { useState } from "react";

import { AppShell, HeartsWarning, Modal } from "@/components/duo/AppShell";
import { Btn } from "@/components/duo/Btn";
import { Confetti, Mascot } from "@/components/duo/Mascot";
import { UNITS, type PathNode, type Unit } from "@/lib/duo/data";
import { useDuo, type NodeStatus } from "@/lib/duo/store";
import { cn } from "@/lib/utils";



const UNIT_BG: Record<Unit["color"], string> = {
  primary: "bg-primary",
  "duo-blue": "bg-duo-blue",
  "duo-gold": "bg-duo-gold",
  "duo-purple": "bg-duo-purple",
  "duo-red": "bg-duo-red",
  "duo-orange": "bg-duo-orange",
  "duo-teal": "bg-duo-teal",
};

const NODE_OFFSETS = [0, 50, 85, 50, 0, -50, -85, -50];

function NodeIcon({ node, status }: { node: PathNode; status: NodeStatus }) {
  if (status === "locked" && node.kind !== "chest") return <Lock className="size-8" />;
  switch (node.kind) {
    case "chest":
      return <Gift className="size-9" />;
    case "trophy":
      return <Crown className="size-9" />;
    case "story":
      return <Zap className="size-8" />;
    case "practice":
      return <span className="text-3xl">💪</span>;
    default:
      return status === "completed" ? <Check className="size-9" /> : <Star className="size-9" />;
  }
}

function PathNodeButton({
  unit,
  node,
  status,
  onSelect,
}: {
  unit: Unit;
  node: PathNode;
  status: NodeStatus;
  onSelect: () => void;
}) {
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
            : `${UNIT_BG[unit.color]} text-primary-foreground shadow-[0_7px_0_0_var(--primary-dark)]`;

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ transform: `translateX(${NODE_OFFSETS[node.index % NODE_OFFSETS.length]}px)` }}
    >
      {status === "active" && (
        <div className="anim-bob mb-1 rounded-xl border-2 border-border bg-card px-3 py-1 text-xs font-extrabold uppercase text-primary">
          Start
        </div>
      )}
      <button
        onClick={onSelect}
        disabled={status === "locked"}
        title={`${node.title}${status === "locked" ? " — complete the previous step first" : ""}`}
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
        <NodeIcon node={node} status={status} />
      </button>
      <span className="mt-1 max-w-[120px] truncate text-center text-xs text-muted-foreground">
        {node.title}
      </span>
    </div>
  );
}

function UnitHeader({ unit }: { unit: Unit }) {
  const { unitProgress } = useDuo();
  const { done, total } = unitProgress(unit.id);
  return (
    <div
      className={cn(
        "sticky top-16 z-10 mb-8 flex items-center justify-between gap-4 rounded-2xl px-5 py-4 text-primary-foreground shadow-[0_4px_0_0_rgba(0,0,0,0.15)] xl:top-2",
        UNIT_BG[unit.color],
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-extrabold uppercase opacity-90">Unit {unit.number}</p>
        <h2 className="truncate font-display text-2xl font-extrabold">
          {unit.icon} {unit.title}
        </h2>
        <p className="truncate text-sm opacity-90">{unit.description}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-extrabold">
          {done}/{total}
        </p>
        <div className="mt-1 h-3 w-24 overflow-hidden rounded-full bg-background/30">
          <div
            className="h-full rounded-full bg-background"
            style={{ width: `${total ? (done / total) * 100 : 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function LearnPage() {
  const router = useRouter();
  const { statusOf, completeNode, state, set } = useDuo();
  const [selected, setSelected] = useState<{ unit: Unit; node: PathNode } | null>(null);
  const [reward, setReward] = useState<{ gems: number; xp: number } | null>(null);

  const openNode = (unit: Unit, node: PathNode) => {
    const status = statusOf(node.id);
    if (status === "locked") return;
    if (node.kind === "chest") {
      if (status === "completed") return;
      completeNode(node.id, node.xp, node.gems ?? 0);
      setReward({ gems: node.gems ?? 0, xp: node.xp });
      return;
    }
    if (node.kind === "trophy") {
      if (status === "completed") return;
      completeNode(node.id, node.xp);
      setReward({ gems: 0, xp: node.xp });
      return;
    }
    setSelected({ unit, node });
  };

  const startLesson = () => {
    if (!selected) return;
    if (state.hearts === 0) {
      setSelected(null);
      return;
    }
    const id = selected.node.id;
    setSelected(null);
    void router.push(`/lesson/${id}`);
  };

  return (
    <AppShell>
      <HeartsWarning />
      <div className="mx-auto max-w-2xl">
        {UNITS.map((unit) => (
          <section key={unit.id} className="mb-10">
            <UnitHeader unit={unit} />
            <div className="relative flex flex-col items-center gap-5">
              {unit.nodes.map((node) => (
                <PathNodeButton
                  key={node.id}
                  unit={unit}
                  node={node}
                  status={statusOf(node.id)}
                  onSelect={() => openNode(unit, node)}
                />
              ))}
              <div className="pointer-events-none absolute right-0 top-24 hidden lg:block">
                <Mascot state="idle" size={110} />
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Lesson start popover */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? selected.node.title : ""}
      >
        {selected && (
          <>
            <p className="text-muted-foreground">
              Unit {selected.unit.number} · {selected.unit.title} · +{selected.node.xp} XP
            </p>
            <div className="my-4 flex justify-center">
              <Mascot state="idle" size={120} />
            </div>
            {state.hearts === 0 ? (
              <>
                <p className="mb-4 font-extrabold text-duo-red">
                  You need at least one heart to start a lesson.
                </p>
                <Btn tone="red" className="w-full" onClick={() => setSelected(null)}>
                  Get hearts in the shop
                </Btn>
              </>
            ) : (
              <Btn tone="primary" className="w-full" onClick={startLesson}>
                Start · +{selected.node.xp} XP
              </Btn>
            )}
          </>
        )}
      </Modal>

      {/* Chest / trophy reward */}
      <Modal open={!!reward} onClose={() => setReward(null)} title="You found a reward!">
        {reward && (
          <div className="relative">
            <Confetti />
            <div className="my-2 flex justify-center">
              <Mascot state="celebrate" size={130} />
            </div>
            <p className="font-display text-3xl font-extrabold text-duo-gold">
              {reward.gems > 0 ? `+${reward.gems} gems` : `+${reward.xp} XP`}
            </p>
            {reward.gems > 0 && reward.xp > 0 && (
              <p className="text-lg font-extrabold text-primary">+{reward.xp} XP</p>
            )}
            <Btn
              tone="primary"
              className="mt-5 w-full"
              onClick={() => {
                setReward(null);
                if (state.hearts < 5) set({ hearts: state.hearts + 1 });
              }}
            >
              Claim
            </Btn>
          </div>
        )}
      </Modal>
    </AppShell>
  );
}

export default LearnPage;
