"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet, User } from "@/lib/api";

export default function TopBar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    apiGet<User>("/user/me").then(setUser).catch(console.error);
  }, []);

  return (
    <div className="glass sticky top-0 z-50 flex items-center justify-between p-4 mb-8">
      <Link href="/" className="text-[var(--duo-green)] text-2xl font-black tracking-tight">
        duolingo
      </Link>
      
      {user && (
        <div className="flex gap-6 font-bold text-lg">
          <Link href="/leaderboard" className="flex items-center gap-2 hover:scale-110 transition-transform">
             {user.username}
          </Link>
          <div className="flex items-center gap-2 text-red-500 hover:scale-110 transition-transform">
            ❤️ {user.hearts}
          </div>
          <div className="flex items-center gap-2 text-yellow-400 hover:scale-110 transition-transform">
            ⭐ {user.xp}
          </div>
          <div className="flex items-center gap-2 text-orange-500 hover:scale-110 transition-transform">
            🔥 {user.streak}
          </div>
        </div>
      )}
    </div>
  );
}
