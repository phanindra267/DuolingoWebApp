import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Tone = "primary" | "blue" | "gold" | "purple" | "red" | "ghost" | "locked";

const TONES: Record<Tone, string> = {
  primary: "bg-primary text-primary-foreground shadow-[0_4px_0_0_var(--primary-dark)]",
  blue: "bg-duo-blue text-primary-foreground shadow-[0_4px_0_0_var(--duo-blue-dark)]",
  gold: "bg-duo-gold text-foreground shadow-[0_4px_0_0_var(--duo-gold-dark)]",
  purple: "bg-duo-purple text-primary-foreground shadow-[0_4px_0_0_var(--duo-purple-dark)]",
  red: "bg-duo-red text-primary-foreground shadow-[0_4px_0_0_var(--duo-red-dark)]",
  ghost: "bg-card text-muted-foreground border-2 border-border shadow-[0_4px_0_0_var(--border)]",
  locked: "bg-locked text-muted-foreground shadow-[0_4px_0_0_var(--locked-dark)]",
};

export function Btn({
  tone = "primary",
  className,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone }) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "btn-3d",
        disabled ? TONES.locked : TONES[tone],
        disabled
          ? "cursor-not-allowed opacity-80"
          : "hover:brightness-105 active:translate-y-[3px] active:shadow-none",
        className,
      )}
    />
  );
}
