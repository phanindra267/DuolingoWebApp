/**
 * OAuth helpers for Google and Facebook.
 * Call these from the browser to start the OAuth redirect flow.
 */

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// ── Google ────────────────────────────────────────────────────────────────────

export function buildGoogleAuthUrl(state?: string): string {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
  if (!clientId || clientId.startsWith("PASTE_")) {
    throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured in .env.local");
  }
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${APP_URL}/api/auth/callback/google`,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
    ...(state ? { state } : {}),
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

// ── Facebook ──────────────────────────────────────────────────────────────────

export function buildFacebookAuthUrl(state?: string): string {
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? "";
  if (!appId || appId.startsWith("PASTE_")) {
    throw new Error("NEXT_PUBLIC_FACEBOOK_APP_ID is not configured in .env.local");
  }
  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: `${APP_URL}/api/auth/callback/facebook`,
    scope: "email,public_profile",
    response_type: "code",
    ...(state ? { state } : {}),
  });
  return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
}

// ── Credential check ──────────────────────────────────────────────────────────

export function isGoogleConfigured(): boolean {
  const id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
  return id.length > 0 && !id.startsWith("PASTE_");
}

export function isFacebookConfigured(): boolean {
  const id = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? "";
  return id.length > 0 && !id.startsWith("PASTE_");
}
