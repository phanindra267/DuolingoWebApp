"use client";

import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

export default function SuperDuolingoSection() {
  return (
    <section className="py-20 px-[clamp(16px,5vw,96px)] bg-[#0f172a] text-white font-sans border-t-2 border-[#1e293b] overflow-hidden">
      <div className="max-w-[1100px] mx-auto flex items-center flex-wrap gap-12">
        {/* Text Area */}
        <div className="flex-1 min-w-[280px]">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] font-black mb-6 leading-[1.1] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
              POWER UP WITH SUPER DUOLINGO
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="text-base sm:text-lg font-bold text-slate-300 leading-[1.8] max-w-[500px] mb-8">
              Supercharge your language learning with zero ads, unlimited hearts, and personalized practice. Learn faster, stay focused, and achieve your goals!
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.3}>
            <Link
              href="/signup"
              className="inline-block py-4 px-8 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_0_#9d174d] hover:brightness-110 active:translate-y-[4px] active:shadow-none transition-all"
            >
              Try 1 week free
            </Link>
          </ScrollReveal>
        </div>

        {/* Character/Visual Area */}
        <ScrollReveal animation="scale" delay={0.15} className="flex-1 flex justify-center min-w-[280px]">
          <div className="relative w-64 h-64 flex items-center justify-center bg-gradient-to-br from-indigo-950 to-slate-900 rounded-[40px] border-4 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.3)] animate-super-pulse">
            <span className="text-[120px] select-none animate-super-float">🦉</span>
            {/* Glowing ring/shield effect */}
            <div className="absolute inset-0 rounded-[36px] border-2 border-pink-500/30 animate-ping [animation-duration:3s]" />
            <span className="absolute top-4 left-6 text-4xl animate-bounce">✨</span>
            <span className="absolute bottom-6 right-6 text-4xl animate-pulse">⚡</span>
          </div>
        </ScrollReveal>
      </div>

      <style jsx global>{`
        @keyframes super-float {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-12px) scale(1.02) rotate(1deg); }
        }
        @keyframes super-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(168,85,247,0.25); }
          50% { box-shadow: 0 0 60px rgba(168,85,247,0.45); }
        }
        .animate-super-float {
          animation: super-float 3.5s ease-in-out infinite;
        }
        .animate-super-pulse {
          animation: super-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
