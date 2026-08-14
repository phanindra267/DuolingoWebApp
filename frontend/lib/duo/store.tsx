"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ALL_NODES, UNITS } from "./data";
import { API_BASE } from "@/lib/api";

export interface DuoState {
  xp: number;
  gems: number;
  hearts: number;
  streak: number;
  dailyXp: number;
  dailyGoal: number;
  completed: string[];
  answers: number;
  correctAnswers: number;
  quests: Record<string, number>;
  dark: boolean;
  sound: boolean;
  motion: boolean;
  listening: boolean;
  name: string;
}

export const MAX_HEARTS = 5;

const DEFAULT_STATE: DuoState = {
  xp: 240,
  gems: 505,
  hearts: MAX_HEARTS,
  streak: 4,
  dailyXp: 20,
  dailyGoal: 50,
  completed: [],
  answers: 0,
  correctAnswers: 0,
  quests: { xp: 20, lessons: 1, perfect: 0, gems: 0 },
  dark: false,
  sound: true,
  motion: true,
  listening: true,
  name: "Alex",
};

export type NodeStatus = "completed" | "active" | "locked";

interface DuoContextValue {
  state: DuoState;
  set: (patch: Partial<DuoState>) => void;
  statusOf: (nodeId: string) => NodeStatus;
  activeNodeId: string | null;
  unitProgress: (unitId: string) => { done: number; total: number };
  completeNode: (nodeId: string, xp: number, gems?: number) => void;
  registerAnswer: (correct: boolean) => void;
  loseHeart: () => void;
  refillHearts: () => boolean;
  spendGems: (amount: number) => boolean;
  reset: () => void;
}

const DuoContext = createContext<DuoContextValue | null>(null);

const API_URL = `${API_BASE}/api`;

export function DuoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DuoState>(DEFAULT_STATE);
  const hydrated = useRef(false);
  const STORAGE_KEY = "duo-state-v1";

  useEffect(() => {
    let cancelled = false;
    const fromStorage = (() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Partial<DuoState>) : null;
      } catch {
        return null;
      }
    })();

    const shouldFetch = API_BASE && API_BASE.trim() !== "";
    if (shouldFetch) {
      fetch(`${API_BASE}/api/user/state`)
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad status"))))
        .then((data) => {
          if (cancelled) return;
          if (data) setState({ ...DEFAULT_STATE, ...data });
          hydrated.current = true;
        })
        .catch((err) => {
          if (cancelled) return;
          console.error("Failed to load state from backend, using localStorage/defaults", err);
          if (fromStorage) setState({ ...DEFAULT_STATE, ...fromStorage });
          hydrated.current = true;
        });
    } else {
      // No API base configured; use localStorage or defaults
      if (fromStorage) setState({ ...DEFAULT_STATE, ...fromStorage });
      hydrated.current = true;
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
    if (API_BASE && API_BASE.trim() !== "") {
      fetch(`${API_BASE}/api/user/state`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      }).catch(() => {
        /* ignore — localStorage is the source of truth fallback */
      });
    }
  }, [state]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.dark);
  }, [state.dark]);

  const value = useMemo<DuoContextValue>(() => {
    const set = (patch: Partial<DuoState>) => setState((s) => ({ ...s, ...patch }));

    const order = ALL_NODES.map((n) => n.node.id);
    const completedSet = new Set(state.completed);
    const activeIndex = order.findIndex((id) => !completedSet.has(id));
    const activeNodeId = activeIndex === -1 ? null : (order[activeIndex] ?? null);

    const statusOf = (nodeId: string): NodeStatus => {
      if (completedSet.has(nodeId)) return "completed";
      if (nodeId === activeNodeId) return "active";
      return "locked";
    };

    return {
      state,
      set,
      statusOf,
      activeNodeId,
      unitProgress: (unitId: string) => {
        const unit = UNITS.find((u) => u.id === unitId);
        if (!unit) return { done: 0, total: 0 };
        return {
          done: unit.nodes.filter((n) => completedSet.has(n.id)).length,
          total: unit.nodes.length,
        };
      },
      completeNode: (nodeId, xp, gems = 0) =>
        setState((s) => {
          const already = s.completed.includes(nodeId);
          return {
            ...s,
            completed: already ? s.completed : [...s.completed, nodeId],
            xp: s.xp + xp,
            dailyXp: s.dailyXp + xp,
            gems: s.gems + gems,
            quests: {
              ...s.quests,
              xp: (s.quests["xp"] ?? 0) + xp,
              lessons: (s.quests["lessons"] ?? 0) + (xp > 0 ? 1 : 0),
              gems: (s.quests["gems"] ?? 0) + gems,
            },
          };
        }),
      registerAnswer: (correct) =>
        setState((s) => ({
          ...s,
          answers: s.answers + 1,
          correctAnswers: s.correctAnswers + (correct ? 1 : 0),
        })),
      loseHeart: () => setState((s) => ({ ...s, hearts: Math.max(0, s.hearts - 1) })),
      refillHearts: () => {
        let ok = false;
        setState((s) => {
          if (s.hearts >= MAX_HEARTS) return s;
          if (s.gems < 350) return s;
          ok = true;
          return { ...s, gems: s.gems - 350, hearts: MAX_HEARTS };
        });
        return ok;
      },
      spendGems: (amount) => {
        let ok = false;
        setState((s) => {
          if (s.gems < amount) return s;
          ok = true;
          return { ...s, gems: s.gems - amount };
        });
        return ok;
      },
      reset: () => {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
        setState({ ...DEFAULT_STATE });
      },
    };
  }, [state]);

  return <DuoContext.Provider value={value}>{children}</DuoContext.Provider>;
}

export function useDuo() {
  const ctx = useContext(DuoContext);
  if (!ctx) throw new Error("useDuo must be used inside DuoProvider");
  return ctx;
}

export function speak(text: string, enabled: boolean, lang = "es-ES") {
  if (!enabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  } catch {
    /* ignore */
  }
}
