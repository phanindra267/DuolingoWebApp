"use client";

import { useRouter, useParams } from "next/navigation";
import { Heart, Mic, Volume2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Btn } from "@/components/duo/Btn";
import { Confetti, Mascot, type MascotState } from "@/components/duo/Mascot";
import { buildExercises, findNode, type Exercise } from "@/lib/duo/data";
import { speak, useDuo } from "@/lib/duo/store";
import { cn } from "@/lib/utils";



const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

function Tile({
  children,
  onClick,
  disabled,
  used,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  used?: boolean;
  tone?: "default" | "selected" | "correct" | "wrong";
  className?: string;
}) {
  const tones = {
    default: "border-border bg-card shadow-[0_3px_0_0_var(--border)]",
    selected: "border-duo-blue bg-accent text-accent-foreground shadow-[0_3px_0_0_var(--duo-blue)]",
    correct: "border-primary bg-success-bg text-success-fg shadow-[0_3px_0_0_var(--primary)]",
    wrong: "border-duo-red bg-error-bg text-error-fg shadow-[0_3px_0_0_var(--duo-red)]",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-xl border-2 px-4 py-2.5 text-base font-extrabold transition-all",
        tones[tone],
        used && "pointer-events-none opacity-25",
        !disabled && "hover:brightness-[0.98] active:translate-y-[3px] active:shadow-none",
        className,
      )}
    >
      {children}
    </button>
  );
}

function SpeakerButton({ text, big }: { text: string; big?: boolean }) {
  const { state } = useDuo();
  return (
    <button
      onClick={() => speak(text, state.sound)}
      aria-label="Play audio"
      className={cn(
        "flex items-center justify-center rounded-2xl bg-duo-blue text-primary-foreground shadow-[0_4px_0_0_var(--duo-blue-dark)] active:translate-y-[3px] active:shadow-none",
        big ? "size-24" : "size-12",
      )}
    >
      <Volume2 className={big ? "size-12" : "size-6"} />
    </button>
  );
}

function SpeechBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border-2 border-border bg-card px-4 py-3 text-lg font-extrabold">
      {children}
      <span className="absolute -left-2 top-6 size-4 rotate-45 border-b-2 border-l-2 border-border bg-card" />
    </div>
  );
}

function LessonPage() {
  const { nodeId } = useParams();
  const router = useRouter();
  const entry = findNode(nodeId as string);
  const { state, loseHeart, completeNode, registerAnswer } = useDuo();

  const exercises = useMemo<Exercise[]>(
    () => (entry ? buildExercises(entry.unit, entry.node.index) : []),
    [entry],
  );

  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState<null | "correct" | "wrong">(null);
  const [mascot, setMascot] = useState<MascotState>("idle");
  const [finished, setFinished] = useState(false);
  const [outOfHearts, setOutOfHearts] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  // per-exercise answer state
  const [picked, setPicked] = useState<string | null>(null);
  const [bankPicks, setBankPicks] = useState<number[]>([]);
  const [typed, setTyped] = useState("");
  const [matchLeft, setMatchLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [matchWrong, setMatchWrong] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ex = exercises[step];

  useEffect(() => {
    if (checked) return;
    setMascot("idle");
    idleTimer.current = setTimeout(() => setMascot("thinking"), 3500);
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [step, checked]);

  useEffect(() => {
    if (ex && (ex.kind === "listen" || (ex.kind === "select" && ex.speak))) {
      const text = ex.kind === "listen" ? ex.speak : ex.speak;
      if (text) speak(text, state.sound);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  if (!entry || !ex) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Btn onClick={() => void router.push("/")}>Back to the path</Btn>
      </div>
    );
  }

  const progress = (step / exercises.length) * 100;

  const resetAnswer = () => {
    setPicked(null);
    setBankPicks([]);
    setTyped("");
    setMatchLeft(null);
    setMatched([]);
    setMatchWrong(null);
    setRecording(false);
  };

  const canCheck = (() => {
    switch (ex.kind) {
      case "select":
      case "blank":
        return picked !== null;
      case "wordbank":
      case "listen":
        return bankPicks.length > 0;
      case "type":
        return typed.trim().length > 0;
      case "match":
        return matched.length === ex.pairs.length * 2;
      case "speak":
        return true;
    }
  })();

  const correctText = (() => {
    switch (ex.kind) {
      case "select":
      case "blank":
        return ex.answer;
      case "wordbank":
      case "listen":
        return ex.answer.join(" ");
      case "type":
        return ex.answer;
      default:
        return "";
    }
  })();

  const evaluate = (): boolean => {
    switch (ex.kind) {
      case "select":
      case "blank":
        return picked === ex.answer;
      case "wordbank":
      case "listen":
        return norm(bankPicks.map((i) => ex.bank[i] ?? "").join(" ")) === norm(ex.answer.join(" "));
      case "type":
        return norm(typed) === norm(ex.answer);
      case "match":
        return true;
      case "speak":
        return true;
    }
  };

  const onCheck = () => {
    const ok = evaluate();
    registerAnswer(ok);
    setChecked(ok ? "correct" : "wrong");
    setMascot(ok ? "correct" : "wrong");
    if (ok) {
      setEarnedXp((x) => x + 3);
      if (state.sound) speak(correctText || (ex.kind === "speak" ? ex.phrase : ""), state.sound);
    } else {
      setMistakes((m) => m + 1);
      loseHeart();
      if (state.hearts - 1 <= 0) {
        setTimeout(() => setOutOfHearts(true), 700);
      }
      setTimeout(() => setMascot("sad"), 700);
    }
  };

  const onContinue = () => {
    setChecked(null);
    resetAnswer();
    if (step + 1 >= exercises.length) {
      const total = entry.node.xp + earnedXp;
      completeNode(entry.node.id, total);
      setMascot("celebrate");
      setFinished(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const heartRow = (
    <div className="flex items-center gap-1 font-extrabold text-duo-red">
      <Heart className="size-6 fill-duo-red" />
      {state.hearts}
    </div>
  );

  if (finished) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <Confetti count={60} />
        <Mascot state="celebrate" size={200} />
        <h1 className="font-display text-4xl font-extrabold text-duo-gold">Lesson complete!</h1>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="rounded-2xl border-2 border-duo-gold px-6 py-3">
            <p className="text-xs font-extrabold uppercase text-duo-gold">Total XP</p>
            <p className="text-2xl font-extrabold">{entry.node.xp + earnedXp}</p>
          </div>
          <div className="rounded-2xl border-2 border-primary px-6 py-3">
            <p className="text-xs font-extrabold uppercase text-primary">Accuracy</p>
            <p className="text-2xl font-extrabold">
              {Math.round(((exercises.length - mistakes) / exercises.length) * 100)}%
            </p>
          </div>
          <div className="rounded-2xl border-2 border-duo-orange px-6 py-3">
            <p className="text-xs font-extrabold uppercase text-duo-orange">Streak</p>
            <p className="text-2xl font-extrabold">🔥 {state.streak}</p>
          </div>
        </div>
        <Btn className="mt-4 w-64" onClick={() => void router.push("/")}>
          Continue
        </Btn>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* header */}
      <header className="flex items-center gap-4 px-4 py-4 sm:px-8">
        <button
          onClick={() => void router.push("/")}
          aria-label="Quit lesson"
          className="text-muted-foreground"
        >
          <X className="size-7" />
        </button>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        {heartRow}
      </header>

      {/* body */}
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-40 sm:px-6">
        <h1 className="mb-6 font-display text-2xl font-extrabold sm:text-3xl">{ex.instruction}</h1>

        {/* character + prompt */}
        {ex.kind !== "match" && (
          <div className="mb-6 flex items-end gap-3">
            <Mascot state={mascot} size={120} className="shrink-0" />
            <div className="flex-1">
              {ex.kind === "select" && (
                <SpeechBubble>
                  <span className="text-2xl">{ex.prompt}</span>
                </SpeechBubble>
              )}
              {(ex.kind === "wordbank" || ex.kind === "type") && (
                <SpeechBubble>
                  <div className="flex items-center gap-3">
                    {ex.speak && <SpeakerButton text={ex.speak} />}
                    <span>{ex.source}</span>
                  </div>
                </SpeechBubble>
              )}
              {ex.kind === "listen" && (
                <SpeechBubble>
                  <div className="flex items-center gap-3">
                    <SpeakerButton text={ex.speak} />
                    <span className="text-muted-foreground">Tap to hear it again</span>
                  </div>
                </SpeechBubble>
              )}
              {ex.kind === "blank" && (
                <SpeechBubble>
                  <span>
                    {ex.before} <span className="px-2 underline decoration-dashed">____</span>
                    {ex.after}
                  </span>
                  <p className="mt-1 text-sm font-bold text-muted-foreground">{ex.hint}</p>
                </SpeechBubble>
              )}
              {ex.kind === "speak" && (
                <SpeechBubble>
                  <span>{ex.phrase}</span>
                  <p className="mt-1 text-sm font-bold text-muted-foreground">{ex.translation}</p>
                </SpeechBubble>
              )}
            </div>
          </div>
        )}

        {/* answer areas */}
        {ex.kind === "select" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ex.options.map((opt) => (
              <button
                key={opt.text}
                disabled={!!checked}
                onClick={() => {
                  setPicked(opt.text);
                  setMascot("selected");
                  speak(opt.text, state.sound);
                }}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 font-extrabold transition-all",
                  picked === opt.text
                    ? "border-duo-blue bg-accent text-accent-foreground shadow-[0_4px_0_0_var(--duo-blue)]"
                    : "border-border shadow-[0_4px_0_0_var(--border)] hover:bg-muted",
                )}
              >
                <span className="text-4xl">{opt.emoji}</span>
                <span>{opt.text}</span>
              </button>
            ))}
          </div>
        )}

        {(ex.kind === "wordbank" || ex.kind === "listen") && (
          <>
            <div className="mb-6 min-h-[64px] border-y-2 border-border py-3">
              <div className="flex flex-wrap gap-2">
                {bankPicks.map((i, pos) => (
                  <Tile
                    key={`${i}-${pos}`}
                    tone="selected"
                    disabled={!!checked}
                    onClick={() => setBankPicks((b) => b.filter((_, p) => p !== pos))}
                  >
                    {ex.bank[i]}
                  </Tile>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {ex.bank.map((word, i) => (
                <Tile
                  key={`${word}-${i}`}
                  used={bankPicks.includes(i)}
                  disabled={!!checked}
                  onClick={() => {
                    setBankPicks((b) => [...b, i]);
                    setMascot("selected");
                  }}
                >
                  {word}
                </Tile>
              ))}
            </div>
          </>
        )}

        {ex.kind === "type" && (
          <textarea
            value={typed}
            disabled={!!checked}
            onChange={(e) => {
              setTyped(e.target.value);
              setMascot("selected");
            }}
            placeholder="Type in Spanish…"
            rows={3}
            className="w-full rounded-2xl border-2 border-border bg-card p-4 text-lg font-bold outline-none focus:border-duo-blue"
          />
        )}

        {ex.kind === "blank" && (
          <div className="flex flex-wrap gap-3">
            {ex.options.map((opt) => (
              <Tile
                key={opt}
                disabled={!!checked}
                tone={picked === opt ? "selected" : "default"}
                onClick={() => {
                  setPicked(opt);
                  setMascot("selected");
                }}
              >
                {opt}
              </Tile>
            ))}
          </div>
        )}

        {ex.kind === "match" && (
          <div className="flex items-start gap-6">
            <Mascot state={mascot} size={100} className="hidden shrink-0 sm:block" />
            <div className="grid flex-1 grid-cols-2 gap-3">
              <div className="flex flex-col gap-3">
                {ex.pairs.map((p) => (
                  <Tile
                    key={p.a}
                    used={matched.includes(p.a)}
                    tone={matchWrong === p.a ? "wrong" : matchLeft === p.a ? "selected" : "default"}
                    onClick={() => {
                      setMatchLeft(p.a);
                      speak(p.a, state.sound);
                    }}
                  >
                    {p.a}
                  </Tile>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {[...ex.pairs].reverse().map((p) => (
                  <Tile
                    key={p.b}
                    used={matched.includes(p.b)}
                    tone={matchWrong === p.b ? "wrong" : "default"}
                    onClick={() => {
                      if (!matchLeft) return;
                      const pair = ex.pairs.find((q) => q.a === matchLeft);
                      if (pair && pair.b === p.b) {
                        setMatched((m) => [...m, pair.a, pair.b]);
                        setMatchLeft(null);
                        setMascot("correct");
                        setTimeout(() => setMascot("idle"), 700);
                      } else {
                        setMatchWrong(p.b);
                        setMascot("wrong");
                        setTimeout(() => {
                          setMatchWrong(null);
                          setMatchLeft(null);
                          setMascot("idle");
                        }, 600);
                      }
                    }}
                  >
                    {p.b}
                  </Tile>
                ))}
              </div>
            </div>
          </div>
        )}

        {ex.kind === "speak" && (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => {
                setRecording(true);
                setMascot("thinking");
                setTimeout(() => {
                  setRecording(false);
                  setMascot("selected");
                }, 1600);
              }}
              className={cn(
                "flex size-28 items-center justify-center rounded-full bg-duo-blue text-primary-foreground shadow-[0_5px_0_0_var(--duo-blue-dark)]",
                recording && "anim-bob",
              )}
              aria-label="Record"
            >
              <Mic className="size-12" />
            </button>
            <p className="text-muted-foreground">
              {recording ? "Listening…" : "Tap the microphone and say the sentence"}
            </p>
          </div>
        )}
      </main>

      {/* footer feedback */}
      <footer
        className={cn(
          "fixed inset-x-0 bottom-0 border-t-2 border-border py-4 transition-colors",
          checked === "correct" && "border-primary bg-success-bg",
          checked === "wrong" && "border-duo-red bg-error-bg",
          !checked && "bg-background",
        )}
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          {checked ? (
            <div className={cn("anim-slide-up", checked === "correct" ? "text-success-fg" : "text-error-fg")}>
              <p className="font-display text-xl font-extrabold">
                {checked === "correct" ? "Nicely done! 🎉" : "Not quite…"}
              </p>
              {checked === "wrong" && correctText && (
                <p className="text-sm font-bold">Correct answer: {correctText}</p>
              )}
            </div>
          ) : (
            <span className="hidden text-sm font-bold text-muted-foreground sm:block">
              Question {step + 1} of {exercises.length}
            </span>
          )}
          {checked ? (
            <Btn
              tone={checked === "correct" ? "primary" : "red"}
              className="w-full sm:w-48"
              onClick={onContinue}
            >
              Continue
            </Btn>
          ) : (
            <Btn className="w-full sm:w-48" disabled={!canCheck} onClick={onCheck}>
              Check
            </Btn>
          )}
        </div>
      </footer>

      {/* out of hearts */}
      {outOfHearts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="anim-pop w-full max-w-md rounded-3xl border-2 border-duo-red bg-card p-6 text-center">
            <Mascot state="sad" size={130} className="mx-auto" />
            <h2 className="font-display text-2xl font-extrabold text-duo-red">You ran out of hearts!</h2>
            <p className="mt-2 text-muted-foreground">
              Refill hearts in the shop or practise an earlier lesson to keep learning.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Btn tone="red" onClick={() => void router.push("/shop")}>
                Go to shop
              </Btn>
              <Btn tone="ghost" onClick={() => void router.push("/")}>
                Back to path
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonPage;
