"use client";

import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

export default function EnglishTestSection() {
  return (
    <section className="py-20 px-[clamp(16px,5vw,96px)] bg-white font-sans border-t-2 border-[#e5e5e5]">
      <div className="max-w-[1100px] mx-auto flex items-center flex-wrap gap-12 flex-row-reverse">
        {/* Visual Area */}
        <ScrollReveal animation="scale" delay={0.15} className="flex-1 flex justify-center min-w-[280px]">
          <div className="relative w-64 h-64 flex items-center justify-center bg-[#f7f7f7] rounded-[40px] border-2 border-[#e5e5e5] shadow-[0_8px_0_rgba(0,0,0,0.04)] animate-test-float">
            <span className="text-[120px] select-none">🎓</span>
            <span className="absolute bottom-6 left-6 text-5xl">📜</span>
          </div>
        </ScrollReveal>

        {/* Text Area */}
        <div className="flex-1 min-w-[280px]">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] font-black mb-6 leading-[1.1] uppercase tracking-wide text-[#58cc02]">
              duolingo english test
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="text-base sm:text-lg font-bold text-[#4b4b4b] leading-[1.8] max-w-[500px] mb-8">
              Certify your English proficiency with a convenient, fast, and affordable online test. Accepted by thousands of universities worldwide, you can take it anytime, anywhere.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.3}>
            <Link
              href="/signup"
              className="inline-block py-4 px-8 rounded-xl bg-white border-2 border-[#e5e5e5] text-[#58cc02] font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_0_#e5e5e5] hover:border-[#58cc02] active:translate-y-[4px] active:shadow-none transition-all"
            >
              Certify your English
            </Link>
          </ScrollReveal>
        </div>
      </div>

      <style jsx global>{`
        @keyframes test-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-1deg); }
        }
        .animate-test-float {
          animation: test-float 4.2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
