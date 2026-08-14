import { type NextRequest, NextResponse } from "next/server";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const STORAGE_KEY = "duo_auth_user";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(`${APP_URL}/login?error=facebook_cancelled`);
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?` +
        new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? "",
          client_secret: process.env.FACEBOOK_APP_SECRET ?? "",
          redirect_uri: `${APP_URL}/api/auth/callback/facebook`,
          code,
        }),
    );

    if (!tokenRes.ok) {
      throw new Error("Failed to exchange Facebook code for token");
    }

    const tokens = await tokenRes.json() as { access_token: string };

    // Fetch user profile
    const userRes = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${tokens.access_token}`,
    );

    if (!userRes.ok) {
      throw new Error("Failed to fetch Facebook user info");
    }

    const profile = await userRes.json() as {
      id: string;
      name: string;
      email?: string;
      picture?: { data?: { url?: string } };
    };

    const user = {
      id: `facebook_${profile.id}`,
      name: profile.name,
      email: profile.email ?? `fb_${profile.id}@facebook.com`,
      avatar: profile.picture?.data?.url,
      provider: "facebook" as const,
    };

    const response = NextResponse.redirect(`${APP_URL}/learn`);
    response.cookies.set(STORAGE_KEY, JSON.stringify(user), {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    response.cookies.set("duo_auth_pending", JSON.stringify(user), {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60,
    });

    return response;
  } catch (err) {
    console.error("[Facebook OAuth callback]", err);
    return NextResponse.redirect(`${APP_URL}/login?error=facebook_failed`);
  }
}
