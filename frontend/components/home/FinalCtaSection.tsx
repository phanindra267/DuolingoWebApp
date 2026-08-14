"use client";

import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

export default function FinalCtaSection() {
  return (
    <section className="relative py-28 px-[clamp(16px,5vw,64px)] bg-white border-t-2 border-[#e5e5e5] text-center font-sans overflow-hidden">
      {/* Decorative Floating Items */}
      <div className="absolute top-12 left-12 text-5xl opacity-40 animate-float-slow select-none">🪙</div>
      <div className="absolute top-20 right-16 text-5xl opacity-45 animate-float-medium select-none">❤️</div>
      <div className="absolute bottom-16 left-20 text-6xl opacity-35 animate-float-fast select-none">🔥</div>
      <div className="absolute bottom-20 right-24 text-5xl opacity-50 animate-float-slow select-none">⭐</div>
      <div className="absolute top-1/2 left-8 text-4xl opacity-30 animate-float-medium select-none">📚</div>
      <div className="absolute top-1/3 right-8 text-5xl opacity-40 animate-float-fast select-none">👑</div>

      <div className="max-w-[700px] mx-auto relative z-10">
        <ScrollReveal animation="fade-up" delay={0.1}>
          <h2 className="font-display text-[clamp(28px,5vw,44px)] font-black text-[#3c3c3c] mb-8 leading-[1.2] uppercase">
            learn a language with duolingo
          </h2>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={0.2} className="inline-block">
          <Link
            href="/signup"
            className="inline-block py-5 px-14 rounded-2xl bg-[var(--duo-green)] text-white font-extrabold text-base uppercase tracking-wider shadow-[0_5px_0_var(--duo-green-dark)] hover:brightness-110 active:translate-y-[5px] active:shadow-none transition-all"
          >
            Get started
          </Link>
        </ScrollReveal>
      </div>

      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-4deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(5deg); }
        }
        .animate-float-slow {
          animation: float-slow 7s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
