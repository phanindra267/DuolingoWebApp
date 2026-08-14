"use client";

import { useState, useEffect, type ReactNode } from "react";
import { SplashScreen } from "@/components/duo/SplashScreen";

const SPLASH_KEY = "duo_splash_shown";

export function SplashWrapper({ children }: { children: ReactNode }) {
  // Show splash only on first visit per session
  const [showSplash, setShowSplash] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SPLASH_KEY);
    if (!alreadyShown) {
      setShowSplash(true);
    }
    setMounted(true);
  }, []);

  const handleDone = () => {
    sessionStorage.setItem(SPLASH_KEY, "1");
    setShowSplash(false);
  };

  if (!mounted) return null;

  return (
    <>
      {showSplash && <SplashScreen onDone={handleDone} />}
      <div style={{ opacity: showSplash ? 0 : 1, transition: "opacity 0.4s ease" }}>
        {children}
      </div>
    </>
  );
}
