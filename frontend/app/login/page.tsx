"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", fontFamily: "Nunito, sans-serif" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderBottom: "2px solid #e5e5e5" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
          <span style={{ fontSize: 28 }}>🦉</span>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#58cc02" }}>duolingo</span>
        </Link>
        <Link href="/signup" style={{ padding: "10px 20px", borderRadius: 14, border: "2px solid #e5e5e5", color: "#1cb0f6", fontWeight: 800, fontSize: 14, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Sign up
        </Link>
      </header>

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: "#3c3c3c", margin: "8px 0 4px" }}>
            Log in
          </h1>
        </div>

        <SignIn 
          signUpUrl="/signup" 
          forceRedirectUrl="/learn" 
          appearance={{
            elements: {
              card: "shadow-none border-0 p-0",
              header: "hidden",
              footer: "hidden"
            }
          }} 
        />
      </main>
    </div>
  );
}
