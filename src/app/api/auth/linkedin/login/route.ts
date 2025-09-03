import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const clientId = process.env.LINKEDIN_CLIENT_ID!;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI!; // e.g. https://yourdomain.com/api/auth/linkedin/callback
  const scope = "openid profile email w_member_social"; // use openid instead of r_liteprofile
  const state = Math.random().toString(36).substring(2); // for CSRF protection, improve in production

  const authUrl =
    `https://www.linkedin.com/oauth/v2/authorization` +
    `?response_type=code` +
    `&client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&state=${encodeURIComponent(state)}`;

  // Optionally store state in session or DB to check later

  return NextResponse.redirect(authUrl);
}
