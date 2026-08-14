import React from "react";

export function LearnIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M4 14L16 4l12 10v14a2 2 0 01-2 2H6a2 2 0 01-2-2V14z" fill="#ffc800" />
      <path d="M4 14L16 4l12 10" stroke="#ff4b4b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="18" r="4" fill="#ce82ff" />
      <path d="M16 4l12 10v14a2 2 0 01-2 2H16V4z" fill="#ff9600" opacity="0.3" />
    </svg>
  );
}

export function CharactersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <text x="16" y="24" fill="#1cb0f6" textAnchor="middle" style={{ fontSize: "24px", fontWeight: "bold", fontFamily: "sans-serif" }}>
        あ
      </text>
    </svg>
  );
}

export function LeaderboardsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 2L3 7v9c0 7.5 5.2 14.6 13 16 7.8-1.4 13-8.5 13-16V7l-13-5z" fill="#ffc800" />
      <path d="M16 2v22c7.8-1.4 13-8.5 13-16V7l-13-5z" fill="#ff9600" />
    </svg>
  );
}

export function QuestsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <rect x="4" y="10" width="24" height="18" rx="2" fill="#ffc800" />
      <path d="M4 14h24v4H4v-4z" fill="#a55928" />
      <rect x="12" y="12" width="8" height="8" rx="1" fill="#ffc800" />
      <circle cx="16" cy="16" r="2" fill="#a55928" />
      <path d="M16 10v18M28 10v18" stroke="#ff9600" strokeWidth="2" opacity="0.5" />
      <path d="M4 10c0-3.3 2.7-6 6-6h12c3.3 0 6 2.7 6 6H4z" fill="#ffc800" />
    </svg>
  );
}

export function ShopIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <rect x="4" y="12" width="24" height="16" rx="1" fill="#e5e5e5" />
      <rect x="8" y="16" width="6" height="12" fill="#1cb0f6" opacity="0.4" />
      <rect x="18" y="16" width="6" height="12" fill="#1cb0f6" opacity="0.4" />
      <path d="M2 12L4 4h24l2 8H2z" fill="#ff4b4b" />
      <path d="M2 12c0 2.2 1.8 4 4 4s4-1.8 4-4 1.8-4 4-4 4 1.8 4 4 1.8-4 4-4 4 1.8 4 4-1.8 4-4 4-4-1.8-4-4" stroke="#ff4b4b" strokeWidth="2" />
    </svg>
  );
}

export function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="14" stroke="#afafaf" strokeWidth="3" strokeDasharray="6 6" />
      <text x="16" y="21" fill="#afafaf" textAnchor="middle" style={{ fontSize: "16px", fontWeight: 900, fontFamily: "sans-serif" }}>
        P
      </text>
    </svg>
  );
}

export function MoreIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="14" fill="#ce82ff" />
      <circle cx="10" cy="16" r="2" fill="#fff" />
      <circle cx="16" cy="16" r="2" fill="#fff" />
      <circle cx="22" cy="16" r="2" fill="#fff" />
    </svg>
  );
}
