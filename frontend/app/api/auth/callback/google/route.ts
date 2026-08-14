import { type NextRequest, NextResponse } from "next/server";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const STORAGE_KEY = "duo_auth_user";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(`${APP_URL}/login?error=google_cancelled`);
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        redirect_uri: `${APP_URL}/api/auth/callback/google`,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      throw new Error("Failed to exchange Google code for token");
    }

    const tokens = await tokenRes.json() as { access_token: string; id_token?: string };

    // Fetch user info
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!userRes.ok) {
      throw new Error("Failed to fetch Google user info");
    }

    const profile = await userRes.json() as {
      id: string;
      name: string;
      email: string;
      picture?: string;
    };

    const user = {
      id: `google_${profile.id}`,
      name: profile.name,
      email: profile.email,
      avatar: profile.picture,
      provider: "google" as const,
    };

    // Set auth cookie and redirect
    const response = NextResponse.redirect(`${APP_URL}/learn`);
    response.cookies.set(STORAGE_KEY, JSON.stringify(user), {
      httpOnly: false,   // needs to be readable by client JS
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // Also pass user data to client via a temporary cookie so AuthProvider can pick it up
    response.cookies.set("duo_auth_pending", JSON.stringify(user), {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60, // 1 minute — just for hydration
    });

    return response;
  } catch (err) {
    console.error("[Google OAuth callback]", err);
    return NextResponse.redirect(`${APP_URL}/login?error=google_failed`);
  }
}
