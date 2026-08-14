"use client";

import Link from "next/link";

const COURSES = [
  { flag: "🇺🇸", name: "English" },
  { flag: "♟️", name: "Chess" },
  { flag: "➕", name: "Math" },
  { flag: "🇪🇸", name: "Spanish" },
  { flag: "🇫🇷", name: "French" },
  { flag: "🇩🇪", name: "German" },
  { flag: "🇯🇵", name: "Japanese" },
  { flag: "🇮🇹", name: "Italian" },
];

export default function LanguageStrip() {
  return (
    <section className="border-y-2 border-[#e5e5e5] overflow-x-auto scrollbar-none bg-white font-sans">
      <div className="flex justify-start md:justify-center items-center py-1">
        {COURSES.map((course) => (
          <Link
            href="/signup"
            key={course.name}
            className="flex items-center gap-2 px-6 py-[14px] border-r-2 border-[#e5e5e5] last:border-r-0 text-sm font-extrabold text-[#3c3c3c] hover:bg-[#f7f7f7] whitespace-nowrap transition-colors"
          >
            <span className="text-xl leading-none">{course.flag}</span>
            <span>{course.name.toUpperCase()}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
