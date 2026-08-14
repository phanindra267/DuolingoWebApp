"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", fontFamily: "Nunito, sans-serif" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderBottom: "2px solid #e5e5e5" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
          <span style={{ fontSize: 28 }}>🦉</span>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#58cc02" }}>duolingo</span>
        </Link>
        <Link href="/login" style={{ padding: "10px 20px", borderRadius: 14, border: "2px solid #e5e5e5", color: "#1cb0f6", fontWeight: 800, fontSize: 14, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Log in
        </Link>
      </header>

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 64, animation: "signup-wave 2s ease-in-out infinite" }}>🦉</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: "#3c3c3c", margin: "8px 0 4px" }}>
            Create your profile
          </h1>
          <p style={{ fontSize: 15, color: "#afafaf", fontWeight: 700 }}>Join 500 million learners worldwide</p>
        </div>

        <SignUp
          signInUrl="/login"
          forceRedirectUrl="/learn"
          routing="hash"
          appearance={{
            elements: {
              card: "shadow-none border-0 p-0",
              header: "hidden",
              footer: "hidden"
            }
          }}
        />
      </main>

      <style>{`
        @keyframes signup-wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
      `}</style>
    </div>
  );
}
