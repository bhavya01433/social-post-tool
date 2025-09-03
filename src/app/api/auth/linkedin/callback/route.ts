import { NextRequest, NextResponse } from "next/server";

// Minimal HTML to send data to opener and close popup
function successPage(accessToken: string, memberUrn: string) {
  return `
    <html>
      <body>
        <script>
          window.opener.postMessage({
            type: 'LINKEDIN_AUTH_SUCCESS',
            accessToken: '${accessToken}',
            memberUrn: '${memberUrn}'
          }, '*');
          window.close();
        </script>
        <p>LinkedIn login successful. You may close this window.</p>
      </body>
    </html>
  `;
}

function errorPage(error: string) {
  return `
    <html>
      <body>
        <script>
          window.opener.postMessage({
            type: 'LINKEDIN_AUTH_ERROR',
            error: '${error}'
          }, '*');
          window.close();
        </script>
        <p>LinkedIn login failed: ${error}. You may close this window.</p>
      </body>
    </html>
  `;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");

  const clientId = process.env.LINKEDIN_CLIENT_ID!;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET!;
  const redirectUri = "http://localhost:3000/api/auth/linkedin/callback";

  // Handle OAuth errors from LinkedIn
  if (error) {
    console.error("LinkedIn OAuth error:", error, error_description);
    return new NextResponse(
      errorPage(`LinkedIn error: ${error_description || error}`),
      {
        status: 400,
        headers: { "Content-Type": "text/html" },
      }
    );
  }

  if (!code) {
    console.error("No code found in callback");
    return new NextResponse(errorPage("No code found in LinkedIn callback"), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  try {
    // Exchange code for access token
    console.log("Exchanging code for access token:", {
      code,
      redirectUri,
      clientId,
      clientSecret: !!clientSecret,
    });
    const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const data = await res.json();
    console.log("LinkedIn access token response:", data);

    if (!res.ok || !data.access_token) {
      // Show the LinkedIn error message for easier debugging
      const errMsg =
        data.error_description || data.error || "Failed to get access token";
      return new NextResponse(errorPage(errMsg), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }

    // Fetch LinkedIn user info using OpenID Connect endpoint
    const meRes = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });
    const me = await meRes.json();
    console.log("LinkedIn /userinfo response:", me);

    if (!me.sub) {
      // 'sub' is the user id in OpenID Connect responses
      return new NextResponse(errorPage("Failed to get LinkedIn user info"), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }
    const memberUrn = `urn:li:person:${me.sub}`;

    return new NextResponse(successPage(data.access_token, memberUrn), {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (err: any) {
    console.error("Server error:", err);
    return new NextResponse(errorPage(err.message || "Server error"), {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  }
}
