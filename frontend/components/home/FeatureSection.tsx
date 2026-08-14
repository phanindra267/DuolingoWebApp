"use client";

import { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

interface FeatureSectionProps {
  heading: string;
  paragraph: string;
  emoji: string;
  emojiBg: string;
  side?: "left" | "right";
  color?: string;
  bg?: string;
  animateEmoji?: boolean;
}

export default function FeatureSection({
  heading,
  paragraph,
  emoji,
  emojiBg,
  side = "left",
  color = "var(--duo-green)",
  bg = "#white",
  animateEmoji = false,
}: FeatureSectionProps) {
  const isLeft = side === "left";

  return (
    <section 
      className="py-20 px-[clamp(16px,5vw,96px)] font-sans border-t-2 border-[#e5e5e5]" 
      style={{ background: bg }}
    >
      <div 
        className={cn(
          "max-w-[1100px] mx-auto flex items-center flex-wrap gap-12",
          isLeft ? "flex-row" : "flex-row-reverse"
        )}
      >
        {/* Text Area */}
        <div className="flex-1 min-w-[280px]">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <h2 
              className="font-display text-[clamp(28px,4vw,40px)] font-black mb-6 leading-[1.1] uppercase tracking-wide"
              style={{ color }}
            >
              {heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="text-base sm:text-lg font-bold text-[#4b4b4b] leading-[1.8] max-w-[500px]">
              {paragraph}
            </p>
          </ScrollReveal>
        </div>

        {/* Illustration Area */}
        <ScrollReveal 
          animation={isLeft ? "fade-left" : "fade-right"} 
          delay={0.15} 
          className="flex justify-center"
        >
          <div 
            className={cn(
              "w-56 h-56 rounded-[28px] flex items-center justify-center text-[110px] select-none shadow-[0_8px_0_rgba(0,0,0,0.06)]",
              animateEmoji && "animate-character-float"
            )}
            style={{ backgroundColor: emojiBg }}
          >
            {emoji}
          </div>
        </ScrollReveal>
      </div>

      {animateEmoji && (
        <style jsx global>{`
          @keyframes character-float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(-1deg); }
          }
          .animate-character-float {
            animation: character-float 5s ease-in-out infinite;
          }
        `}</style>
      )}
    </section>
  );
}
