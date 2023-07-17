/**
 * This endpoint handles the callback from Google's OAuth consent screen and exchanges the code for an access token.
 *
 * Once the access token is retrieved, it is stored in the user's Flow instance using the API endpoint provided in the state parameter,
 * and the user is redirected to the Flow instance (the origin part of the API endpoint)
 */
export const config = {
  runtime: "edge",
};

export default async (request: Request) => {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const apiEndpoint = requestUrl.searchParams.get("state"); // the state contains the API endpoint to store the tokenData in the user's Flow instance. See api/auth/index.ts for more details.

  if (!code) {
    return new Response("Missing code in search params", { status: 400 });
  } else if (!apiEndpoint) {
    return new Response(
      "Missing state (i.e the API endpoint to store the tokens) in search params",
      { status: 400 }
    );
  }

  const body = new URLSearchParams({
    code,
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
    redirect_uri: `${requestUrl.origin}/api/auth/callback`,
    grant_type: "authorization_code",
  });

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(`Err: ${tokenData.error} - ${tokenData.error_description}`, {
      status: 400,
    });
  }

  // get user's email address
  const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  }).then((res) => res.json());

  const storeTokenResponse = await fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify({
      email: userInfo.email,
      ...tokenData,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!storeTokenResponse.ok) {
    return new Response("Failed to store token data", { status: 500 });
  }

  const flowInstanceOrigin = new URL(apiEndpoint).origin;

  return Response.redirect(`${flowInstanceOrigin}/settings`);
};
