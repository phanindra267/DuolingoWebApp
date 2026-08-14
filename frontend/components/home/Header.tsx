"use client";

import Link from "next/link";
import { useState } from "react";

const LANGUAGES = [
  { flag: "🇺🇸", name: "English" },
  { flag: "🇪🇸", name: "Spanish" },
  { flag: "🇫🇷", name: "French" },
  { flag: "🇩🇪", name: "German" },
  { flag: "🇯🇵", name: "Japanese" },
  { flag: "🇰🇷", name: "Korean" },
  { flag: "🇮🇹", name: "Italian" },
  { flag: "🇧🇷", name: "Portuguese" },
  { flag: "🇨🇳", name: "Chinese" },
  { flag: "🇷🇺", name: "Russian" },
  { flag: "🇸🇦", name: "Arabic" },
  { flag: "🇮🇳", name: "Hindi" },
];

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b-2 border-[#e5e5e5] bg-white px-[clamp(16px,5vw,48px)] font-sans">
      <div className="flex items-center gap-2">
        <span className="text-3xl">🦉</span>
        <span className="font-display text-2xl font-black tracking-tighter text-[var(--duo-green)]">duolingo</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="group relative mr-2">
          <button className="flex items-center gap-1 bg-none border-none cursor-pointer text-[13px] font-extrabold uppercase tracking-wider text-[#afafaf] hover:text-[#4b4b4b] transition-colors">
            SITE LANGUAGE: ENGLISH <span className="text-[10px]">▼</span>
          </button>
          <div className="absolute right-0 top-full hidden pt-4 group-hover:block z-50">
            <div className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-4 w-[320px] shadow-[0_4px_0_#e5e5e5] grid grid-cols-2 gap-2">
              {LANGUAGES.slice(0, 10).map((lang) => (
                <button
                  key={lang.name}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border-none bg-transparent cursor-pointer text-sm font-bold text-[#4b4b4b] text-left hover:bg-[#f7f7f7] transition-colors"
                >
                  <span>{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Link
          href="/login"
          className="hidden sm:inline-block px-[18px] py-[10px] rounded-xl border-2 border-[#e5e5e5] text-[#1cb0f6] font-extrabold text-sm uppercase tracking-wider hover:bg-[#f7f7f7] transition-all hover:border-[#1cb0f6]"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="px-[18px] py-[10px] rounded-xl bg-[var(--duo-green)] text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_0_var(--duo-green-dark)] hover:brightness-110 active:translate-y-[4px] active:shadow-none transition-all"
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}
