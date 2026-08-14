"use client";

import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

export default function HeroSection() {
  return (
    <section className="flex flex-wrap items-center justify-center gap-10 px-[clamp(16px,5vw,96px)] py-16 min-h-[calc(100vh-64px)] bg-white overflow-hidden font-sans">
      <ScrollReveal animation="scale" delay={0.1} className="flex-[0_1_520px] flex justify-center">
        <div className="text-[200px] sm:text-[220px] leading-none animate-hero-float filter drop-shadow-[0_20px_40px_rgba(88,204,2,0.15)] select-none">
          🦉
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={0.2} className="flex-[0_1_450px] flex flex-col gap-6 text-center sm:text-left">
        <h1 className="font-display text-[clamp(28px,4.5vw,44px)] font-black text-[#3c3c3c] leading-[1.2]">
          The most fun way to learn languages, chess, and more!
        </h1>
        <div className="flex flex-col gap-3 mt-4 max-w-[360px] mx-auto sm:mx-0">
          <Link
            href="/signup"
            className="block w-full py-4 px-8 rounded-xl bg-[var(--duo-green)] text-white font-extrabold text-sm uppercase tracking-wider text-center shadow-[0_4px_0_var(--duo-green-dark)] hover:brightness-110 active:translate-y-[4px] active:shadow-none transition-all"
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="block w-full py-4 px-8 rounded-xl bg-white border-2 border-[#e5e5e5] text-[#1cb0f6] font-extrabold text-sm uppercase tracking-wider text-center shadow-[0_4px_0_#e5e5e5] hover:border-[#1cb0f6] active:translate-y-[4px] active:shadow-none transition-all"
          >
            I already have an account
          </Link>
        </div>
      </ScrollReveal>

      <style jsx global>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-14px) rotate(-1.5deg); }
          66% { transform: translateY(-6px) rotate(1.5deg); }
        }
        .animate-hero-float {
          animation: hero-float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
