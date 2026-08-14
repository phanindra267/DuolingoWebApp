"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/clerk-mock";

import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import LanguageStrip from "@/components/home/LanguageStrip";
import FeatureSection from "@/components/home/FeatureSection";
import LearnAnywhereSection from "@/components/home/LearnAnywhereSection";
import SuperDuolingoSection from "@/components/home/SuperDuolingoSection";
import EnglishTestSection from "@/components/home/EnglishTestSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import Footer from "@/components/home/Footer";

export default function LandingPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/learn");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) return null;
  if (isSignedIn) return null;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <LanguageStrip />

      {/* Free. Fun. Effective. */}
      <FeatureSection
        heading="free. fun. effective."
        paragraph="Learning with Duolingo is fun, and research shows that it works! With quick, bite-sized lessons, you'll earn points and unlock new levels while gaining real-world communication skills."
        emoji="🎮"
        emojiBg="#fff9e6"
        side="left"
        color="var(--duo-green)"
        bg="#ffffff"
      />

      {/* Backed by Science */}
      <FeatureSection
        heading="backed by science"
        paragraph="We use a combination of research-backed teaching methods and delightful content to create courses that effectively teach reading, writing, listening, and speaking skills!"
        emoji="🔬"
        emojiBg="#f0fff0"
        side="right"
        color="var(--duo-green)"
        bg="#ffffff"
      />

      {/* Stay Motivated */}
      <FeatureSection
        heading="stay motivated"
        paragraph="We make it easy to form a habit of language learning with game-like features, fun challenges, and reminders from our friendly mascot, Duo the owl."
        emoji="🔥"
        emojiBg="#fff4e6"
        side="left"
        color="var(--duo-green)"
        bg="#ffffff"
        animateEmoji={true}
      />

      {/* Personalized Learning */}
      <FeatureSection
        heading="personalized learning"
        paragraph="Lessons are tailored to your learning style. Our system helps you learn and review vocabulary and concepts at the pace that works best for you."
        emoji="👑"
        emojiBg="#fdf2f8"
        side="right"
        color="var(--duo-green)"
        bg="#ffffff"
      />

      <LearnAnywhereSection />
      <SuperDuolingoSection />
      <EnglishTestSection />
      <FinalCtaSection />
      <Footer />
    </div>
  );
}
