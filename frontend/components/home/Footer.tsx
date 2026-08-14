"use client";

import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

const FOOTER_COLUMNS = [
  {
    heading: "ABOUT US",
    links: [
      { label: "About us", href: "/signup" },
      { label: "Investors", href: "/signup" },
      { label: "Careers", href: "/signup" },
      { label: "Press", href: "/signup" },
      { label: "Research", href: "/signup" },
      { label: "Brand guidelines", href: "/signup" },
      { label: "Our approach to AI", href: "/signup" },
      { label: "Duolingo blog", href: "/signup" },
    ],
  },
  {
    heading: "PRODUCTS",
    links: [
      { label: "Duolingo", href: "/signup" },
      { label: "Duolingo for Schools", href: "/signup" },
      { label: "Duolingo English Test", href: "/signup" },
      { label: "Podcast", href: "/signup" },
      { label: "Duolingo for Business", href: "/signup" },
      { label: "Super Duolingo", href: "/signup" },
      { label: "Gift Super Duolingo", href: "/signup" },
      { label: "Duolingo Max", href: "/signup" },
    ],
  },
  {
    heading: "APPS",
    links: [
      { label: "Duolingo for Android", href: "https://play.google.com/store/apps/details?id=com.duolingo" },
      { label: "Duolingo for iOS", href: "https://apps.apple.com/app/duolingo/id570060128" },
    ],
  },
  {
    heading: "HELP AND SUPPORT",
    links: [
      { label: "Duolingo FAQs", href: "/signup" },
      { label: "Schools FAQs", href: "/signup" },
      { label: "Duolingo English Test FAQs", href: "/signup" },
      { label: "Status", href: "/signup" },
    ],
  },
  {
    heading: "PRIVACY AND TERMS",
    links: [
      { label: "Community guidelines", href: "/signup" },
      { label: "Terms", href: "/signup" },
      { label: "Privacy", href: "/signup" },
      { label: "Do Not Sell or Share My Info", href: "/signup" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--duo-green)] text-white/90 font-sans border-t-2 border-[var(--duo-green-dark)]">
      {/* Main Grid */}
      <div className="max-w-[1200px] mx-auto px-[clamp(16px,5vw,64px)] py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        {FOOTER_COLUMNS.map((col, idx) => (
          <ScrollReveal key={col.heading} animation="fade-up" delay={idx * 0.05} className="flex flex-col gap-4">
            <h3 className="text-xs font-black tracking-widest text-[var(--duo-green-dark)] uppercase">
              {col.heading}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-extrabold text-white/80 hover:text-white hover:underline transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        ))}
      </div>

      {/* Social and Copyright Bottom */}
      <div className="max-w-[1200px] mx-auto border-t-2 border-[var(--duo-green-dark)] py-8 px-[clamp(16px,5vw,64px)] flex flex-wrap items-center justify-between gap-6 text-sm font-extrabold text-white/80">
        <p>© 2026 Duolingo Clone — High Fidelity</p>
        <div className="flex gap-6">
          <a href="https://instagram.com/duolingo" className="hover:text-white transition-colors">Instagram</a>
          <a href="https://tiktok.com/@duolingo" className="hover:text-white transition-colors">TikTok</a>
          <a href="https://x.com/duolingo" className="hover:text-white transition-colors">X (Twitter)</a>
          <a href="https://youtube.com/duolingo" className="hover:text-white transition-colors">YouTube</a>
        </div>
      </div>
    </footer>
  );
}
