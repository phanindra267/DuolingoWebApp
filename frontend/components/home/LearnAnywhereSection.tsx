"use client";

import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

export default function LearnAnywhereSection() {
  return (
    <section className="py-20 px-[clamp(16px,5vw,96px)] bg-[#ddf4ff] font-sans border-t-2 border-[#e5e5e5]">
      <div className="max-w-[1100px] mx-auto flex items-center flex-wrap gap-12 flex-row-reverse">
        {/* Text Area */}
        <div className="flex-1 min-w-[280px]">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] font-black mb-6 leading-[1.1] uppercase tracking-wide text-[#1899d6]">
              learn anytime, anywhere
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="text-base sm:text-lg font-bold text-[#4b4b4b] leading-[1.8] max-w-[500px] mb-8">
              Make your breaks and commutes more productive with our iPhone and Android apps. Download them to keep your streak going wherever you go!
            </p>
          </ScrollReveal>

          {/* App store buttons */}
          <ScrollReveal animation="fade-up" delay={0.3} className="flex gap-4 flex-wrap">
            <a
              href="https://apps.apple.com/app/duolingo/id570060128"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-2.5 bg-black rounded-xl text-white hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_0_#333]"
            >
              <span className="text-2xl leading-none">🍎</span>
              <div className="text-left font-sans">
                <div className="text-[9px] font-semibold opacity-75 uppercase leading-none">Download on the</div>
                <div className="text-sm font-extrabold leading-tight">App Store</div>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.duolingo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-2.5 bg-black rounded-xl text-white hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_0_#333]"
            >
              <span className="text-2xl leading-none">▶</span>
              <div className="text-left font-sans">
                <div className="text-[9px] font-semibold opacity-75 uppercase leading-none">Get it on</div>
                <div className="text-sm font-extrabold leading-tight">Google Play</div>
              </div>
            </a>
          </ScrollReveal>
        </div>

        {/* Illustration Area */}
        <ScrollReveal animation="scale" delay={0.15} className="flex-1 flex justify-center min-w-[280px]">
          <div className="relative w-64 h-64 flex items-center justify-center bg-white rounded-[40px] shadow-[0_12px_24px_rgba(24,153,214,0.15)]">
            <span className="text-[120px] select-none animate-device-float">📱</span>
            {/* Small floating elements */}
            <span className="absolute top-4 right-8 text-4xl animate-bounce">⚡</span>
            <span className="absolute bottom-8 left-8 text-4xl animate-pulse">👑</span>
            <span className="absolute top-1/2 left-4 text-4xl animate-bounce [animation-delay:0.5s]">⭐</span>
          </div>
        </ScrollReveal>
      </div>

      <style jsx global>{`
        @keyframes device-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        .animate-device-float {
          animation: device-float 4.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
