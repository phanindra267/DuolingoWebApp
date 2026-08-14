"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGet, Unit, Skill } from "@/lib/api";
import SkillNode from "./SkillNode";

interface UnitWithSkills extends Unit {
  skills: Skill[];
}

export default function SkillTree() {
  const [units, setUnits] = useState<UnitWithSkills[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const unitsData = await apiGet<Unit[]>("/course/language/1/units");
        const unitsWithSkills = await Promise.all(
          unitsData.map(async (u) => {
            const skills = await apiGet<Skill[]>(`/course/unit/${u.id}/skills`);
            return { ...u, skills };
          })
        );
        setUnits(unitsWithSkills);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="text-center p-12 text-xl font-bold animate-pulse">Loading course...</div>;
  }

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto w-full pb-24">
      {units.map((unit) => (
        <div key={unit.id} className="w-full mb-12">
          <div className="bg-[var(--duo-green)] text-white p-4 rounded-2xl mb-8 flex items-center justify-between font-bold text-xl shadow-[0_4px_0_var(--duo-green-dark)]">
            <h2>{unit.title}</h2>
          </div>
          <div className="flex flex-col items-center gap-8">
            {unit.skills.map((skill, index) => {
              const offsetIndex = index % 4;
              let xOffset = "0px";
              if (offsetIndex === 1) xOffset = "-40px";
              if (offsetIndex === 3) xOffset = "40px";

              return (
                <div key={skill.id} style={{ transform: `translateX(${xOffset})` }}>
                  <SkillNode skill={skill} onClick={() => router.push(`/skill/${skill.id}`)} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
