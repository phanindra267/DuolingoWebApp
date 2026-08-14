"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  Award,
  BookOpen,
  Flame,
  Gem,
  Heart,
  MoreHorizontal,
  ScrollText,
  ShoppingBag,
  Shield,
  Sparkles,
  Trophy,
  User,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Btn } from "@/components/duo/Btn";
import { MORE_PAGES } from "@/lib/duo/data";
import { MAX_HEARTS, useDuo } from "@/lib/duo/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Learn", icon: BookOpen },
  { to: "/characters", label: "Characters", icon: Sparkles },
  { to: "/leaderboard", label: "Leaderboards", icon: Trophy },
  { to: "/quests", label: "Quests", icon: ScrollText },
  { to: "/shop", label: "Shop", icon: ShoppingBag },
  { to: "/profile", label: "Profile", icon: User },
] as const;

function NavItem({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof BookOpen;
  active: boolean;
}) {
  return (
    <Link href={to}
      className={cn(
        "flex items-center gap-4 rounded-xl border-2 px-3 py-2.5 text-sm font-extrabold uppercase tracking-wide transition-colors",
        active
          ? "border-duo-blue bg-accent text-accent-foreground"
          : "border-transparent text-muted-foreground hover:bg-muted",
      )}
    >
      <Icon className="size-6 shrink-0" />
      <span className="hidden lg:inline">{label}</span>
    </Link>
  );
}

function MoreMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 rounded-xl border-2 border-transparent px-3 py-2.5 text-sm font-extrabold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-muted"
      >
        <MoreHorizontal className="size-6 shrink-0" />
        <span className="hidden lg:inline">More</span>
      </button>
      {open && (
        <div className="absolute bottom-full left-0 z-30 mb-2 w-56 rounded-2xl border-2 border-border bg-popover p-2 shadow-xl">
          <Link href="/settings"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-bold uppercase text-muted-foreground hover:bg-muted"
          >
            Settings
          </Link>
          {Object.entries(MORE_PAGES).map(([slug, page]) => (
            <Link
              key={slug}
              href={`/more/${slug}`}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-bold uppercase text-muted-foreground hover:bg-muted"
            >
              {page.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function StatsBar({ className }: { className?: string }) {
  const { state } = useDuo();
  return (
    <div className={cn("flex items-center gap-4 text-base font-extrabold sm:gap-6", className)}>
      <span className="flex items-center gap-1.5" title="Course">
        <span className="text-2xl">🇪🇸</span>
      </span>
      <Link href="/quests" className="flex items-center gap-1.5 text-duo-orange" title="Streak">
        <Flame className="size-6 fill-duo-orange" />
        {state.streak}
      </Link>
      <Link href="/shop" className="flex items-center gap-1.5 text-duo-blue" title="Gems">
        <Gem className="size-6 fill-duo-blue" />
        {state.gems}
      </Link>
      <Link href="/shop" className="flex items-center gap-1.5 text-duo-red" title="Hearts">
        <Heart className="size-6 fill-duo-red" />
        {state.hearts}
      </Link>
    </div>
  );
}

export function RightRail() {
  const { state } = useDuo();
  const pct = Math.min(100, Math.round((state.dailyXp / state.dailyGoal) * 100));
  return (
    <aside className="hidden w-[340px] shrink-0 flex-col gap-5 py-6 xl:flex">
      <StatsBar className="justify-end" />

      <section className="rounded-2xl border-2 border-border p-4">
        <h2 className="mb-3 text-lg font-extrabold">Daily goal</h2>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          <div className="flex-1">
            <div className="h-4 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-duo-gold transition-all" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {state.dailyXp} / {state.dailyGoal} XP today
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border-2 border-border p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">Daily quests</h2>
          <Link href="/quests" className="text-sm font-extrabold uppercase text-duo-blue">
            View all
          </Link>
        </div>
        <QuestRow emoji="⚡" label="Earn 30 XP" value={state.quests["xp"] ?? 0} goal={30} />
        <QuestRow emoji="📘" label="Complete 3 lessons" value={state.quests["lessons"] ?? 0} goal={3} />
        <QuestRow emoji="💎" label="Collect 30 gems" value={state.quests["gems"] ?? 0} goal={30} />
      </section>

      <section className="rounded-2xl border-2 border-border p-4">
        <h2 className="mb-2 text-lg font-extrabold">Unlock Leaderboards!</h2>
        <p className="text-sm text-muted-foreground">
          Complete more lessons to climb the Bronze League this week.
        </p>
        <Link href="/leaderboard" className="mt-3 block">
          <Btn tone="blue" className="w-full">
            <Shield className="size-5" /> Bronze League
          </Btn>
        </Link>
      </section>
    </aside>
  );
}

export function QuestRow({
  emoji,
  label,
  value,
  goal,
}: {
  emoji: string;
  label: string;
  value: number;
  goal: number;
}) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  const done = value >= goal;
  return (
    <div className="flex items-center gap-3 border-b-2 border-border py-3 last:border-0">
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1">
        <p className="text-sm font-extrabold">{label}</p>
        <div className="mt-1 h-3 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all", done ? "bg-primary" : "bg-duo-gold")}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <span className="text-xl">{done ? "✅" : "🎁"}</span>
    </div>
  );
}

export function HeartsWarning() {
  const { state } = useDuo();
  if (state.hearts > 0) return null;
  return (
    <div className="mb-4 flex items-center gap-3 rounded-2xl border-2 border-duo-red bg-error-bg p-4 text-error-fg">
      <Heart className="size-6" />
      <p className="text-sm font-extrabold">
        You are out of hearts! Refill them in the shop to start a new lesson.
      </p>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { state } = useDuo();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1400px] gap-6 px-3 sm:px-6">
      {/* Sidebar */}
      <nav className="sticky top-0 hidden h-screen w-[88px] shrink-0 flex-col gap-2 border-r-2 border-border py-6 pr-3 md:flex lg:w-[256px]">
        <Link href="/" className="mb-6 flex items-center gap-2 px-2">
          <span className="text-3xl">🦉</span>
          <span className="hidden font-display text-3xl font-extrabold text-primary lg:inline">
            lingua
          </span>
        </Link>
        {NAV.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
            active={pathname === item.to}
          />
        ))}
        <MoreMenu />
        <div className="mt-auto hidden rounded-xl bg-muted p-3 lg:block">
          <p className="text-xs font-bold uppercase text-muted-foreground">Signed in as</p>
          <p className="text-base font-extrabold">{state.name}</p>
        </div>
      </nav>

      <main className="min-w-0 flex-1 pb-24 md:pb-8">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 -mx-3 mb-4 flex items-center justify-between border-b-2 border-border bg-background px-3 py-3 sm:-mx-6 sm:px-6 xl:hidden">
          <Link href="/" className="flex items-center gap-2 md:hidden">
            <span className="text-2xl">🦉</span>
          </Link>
          <StatsBar className="ml-auto" />
        </div>
        {children}
      </main>

      <RightRail />

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t-2 border-border bg-background py-2 md:hidden">
        {NAV.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            href={to}
            aria-label={label}
            className={cn(
              "rounded-xl p-2.5",
              pathname === to ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <Icon className="size-6" />
          </Link>
        ))}
        <Link href="/settings"
          aria-label="Settings"
          className={cn(
            "rounded-xl p-2.5",
            pathname === "/settings" ? "bg-accent text-accent-foreground" : "text-muted-foreground",
          )}
        >
          <MoreHorizontal className="size-6" />
        </Link>
      </nav>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  emoji,
}: {
  title: string;
  subtitle?: string;
  emoji?: string;
}) {
  return (
    <header className="mb-6 border-b-2 border-border pb-4">
      <h1 className="font-display text-3xl font-extrabold">
        {emoji ? `${emoji} ` : ""}
        {title}
      </h1>
      {subtitle && <p className="mt-1 text-base text-muted-foreground">{subtitle}</p>}
    </header>
  );
}

export function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
      <div className="anim-pop w-full max-w-md rounded-3xl border-2 border-border bg-card p-6 text-center shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl font-extrabold">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="text-muted-foreground">
            <X className="size-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function StatCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border-2 border-border p-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xl font-extrabold leading-none">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export { Award, MAX_HEARTS };
