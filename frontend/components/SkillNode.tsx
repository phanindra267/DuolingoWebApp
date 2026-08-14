"use client";
import { Skill } from "@/lib/api";
import ProgressBar from "./ProgressBar";

export default function SkillNode({ skill, onClick }: { skill: Skill; onClick: () => void }) {
  const isLocked = skill.lock_status === "locked";
  const isCompleted = skill.progress >= 100;
  const isUnlocked = !isLocked;
  
  let bgClass = "bg-gray-700 shadow-[0_6px_0_#4a5568]";
  let textClass = "text-gray-400";
  let icon = "🔒";
  
  if (isCompleted) {
    bgClass = "bg-[var(--duo-yellow)] shadow-[0_6px_0_#d4b200]";
    textClass = "text-white";
    icon = "👑";
  } else if (isUnlocked) {
    bgClass = "bg-[var(--duo-green)] shadow-[0_6px_0_var(--duo-green-dark)]";
    textClass = "text-white";
    icon = "⭐";
  }

  return (
    <div className="flex flex-col items-center gap-2 w-24">
      <button 
        onClick={isLocked ? undefined : onClick}
        disabled={isLocked}
        className={`relative w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-transform active:translate-y-[6px] active:shadow-none ${bgClass} ${isUnlocked ? 'wiggle cursor-pointer' : 'cursor-not-allowed'}`}
      >
        {icon}
      </button>
      <div className={`font-bold text-center text-sm ${textClass}`}>
        {skill.title}
      </div>
      {isUnlocked && !isCompleted && (
        <div className="w-full mt-1">
          <ProgressBar value={skill.progress} color="bg-[var(--duo-yellow)]" />
        </div>
      )}
    </div>
  );
}
