import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

/**
 * Clerk's OAuth redirect lands here after Google / Facebook sign-in.
 * AuthenticateWithRedirectCallback finalises the session then
 * redirects to NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL (/learn).
 */
export default function SSOCallbackPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Nunito, sans-serif",
        fontSize: 18,
        color: "#afafaf",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16, animation: "spin 1s linear infinite" }}>🦉</div>
        <p style={{ fontWeight: 800 }}>Signing you in…</p>
      </div>
      <AuthenticateWithRedirectCallback />
      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
