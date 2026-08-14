"use client";
import { useEffect, useRef, useState } from "react";
import { UNITS, type Unit, type PathNode } from "@/lib/duo/data";
import { useDuo, type NodeStatus } from "@/lib/duo/store";
import { CourseHeader } from "@/components/learningPath/CourseHeader";
import { cn } from "@/lib/utils";
import { ArrowRight, Lock } from "lucide-react";

// Simple node button component
function NodeButton({ unit, node, status, onSelect }: {
  unit: Unit;
  node: PathNode;
  status: NodeStatus;
  onSelect: () => void;
}) {
  const base =
    status === "locked"
      ? "bg-locked text-muted-foreground shadow-[0_7px_0_0_var(--locked-dark)]"
      : status === "completed"
      ? "bg-duo-gold text-foreground shadow-[0_7px_0_0_var(--duo-gold-dark)]"
      : `bg-${unit.color} text-primary-foreground shadow-[0_7px_0_0_var(--primary-dark)]`;

  return (
    <button
      onClick={onSelect}
      disabled={status === "locked"}
      className={cn(
        "flex size-16 items-center justify-center rounded-full transition-transform",
        base,
        status === "locked" ? "cursor-not-allowed" : "hover:scale-110 active:scale-95",
      )}
    >
      {status === "completed" ? "✔" : node.kind === "chest" ? "💰" : "★"}
    </button>
  );
}

function JumpHere({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
        JUMP HERE?
      </span>
      <button
        onClick={onClick}
        className="flex size-12 items-center justify-center rounded-full bg-primary/20 hover:bg-primary/30"
      >
        <ArrowRight className="size-5 text-primary" />
      </button>
    </div>
  );
}

export default function LearningPathPage() {
  const { statusOf, completeNode } = useDuo();
  const [activeUnit, setActiveUnit] = useState<Unit>(UNITS[0]);

  // Refs for IntersectionObserver
  const unitRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-unit-id");
            const unit = UNITS.find((u) => u.id === id);
            if (unit) setActiveUnit(unit);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    UNITS.forEach((unit) => {
      const el = unitRefs.current[unit.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const openNode = (unit: Unit, node: PathNode) => {
    const status = statusOf(node.id);
    if (status === "locked") return;
    if (node.kind === "chest" || node.kind === "trophy") {
      completeNode(node.id, node.xp, node.gems ?? 0);
      return;
    }
    // navigate to lesson – for simplicity use router push
    // but keep placeholder here
    console.log("Start lesson", node.id);
  };

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <CourseHeader
        unitNumber={activeUnit.number}
        unitTitle={activeUnit.title}
        unitDescription={activeUnit.description}
        colorClass={`bg-${activeUnit.color}`}
        onGuidebook={() => console.log("Guidebook")}
      />
      <div className="mx-auto max-w-2xl py-8">
        {UNITS.map((unit) => (
          <div
            key={unit.id}
            data-unit-id={unit.id}
            ref={(el) => (unitRefs.current[unit.id] = el)}
            className="mb-12"
          >
            <h3 className="mb-4 text-center text-2xl font-bold">
              {unit.title}
            </h3>
            <div className="flex flex-col items-center gap-6">
              {unit.nodes.map((node) => (
                <NodeButton
                  key={node.id}
                  unit={unit}
                  node={node}
                  status={statusOf(node.id)}
                  onSelect={() => openNode(unit, node)}
                />
              ))}
              {/* Example JumpHere after each unit */}
              <JumpHere onClick={() => console.log("Jump to next unit")} />
            </div>
          </div>
        ))}
        {/* Locked Section Card */}
        <div className="relative rounded-xl border border-gray-700 bg-black/60 p-6 text-center">
          <h4 className="mb-2 text-xl font-semibold text-gray-400">🔒 Section 2</h4>
          <p className="mb-4 text-gray-300">
            Learn words, phrases, and grammar concepts for basic interactions
          </p>
          <JumpHere onClick={() => console.log("Attempt jump to locked section")} />
        </div>
      </div>
      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 rounded-full bg-primary/20 p-3 text-primary hover:bg-primary/30"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
}
